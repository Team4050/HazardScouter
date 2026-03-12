import { createLazyFileRoute } from "@tanstack/react-router";
import {
  ClipboardCopy,
  Download,
  FileJson,
  Trash2,
  Upload,
  X,
} from "lucide-react";
import {
  type ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "sonner";
import { Select } from "@/components/inputs";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { type Match, parseMatchesFile } from "@/data/db";
import {
  copyTsvToClipboard,
  downloadCsv,
  downloadJson,
  type ExportFormat,
} from "@/data/export";
import { cn } from "@/util";

export const Route = createLazyFileRoute("/admin")({
  component: Page,
});

function validateFile(file: File): boolean {
  return (
    /^matches_[a-z]{3}-[a-z]{3}_\d+\.json$/.test(file.name) &&
    file.type === "application/json"
  );
}

type RowData = {
  name: string;
  totalMatches: number;
  totalTeams: number;
};

function Page(): ReactNode {
  const [files, setFiles] = useState<File[]>([]);
  const [rowData, setRowData] = useState<RowData[]>([]);
  const [format, setFormat] = useState<ExportFormat>("json");
  const parsedMatchesRef = useRef<Match[]>([]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const validFiles: File[] = [];
    const invalidFiles: File[] = [];
    for (const f of acceptedFiles) {
      (validateFile(f) ? validFiles : invalidFiles).push(f);
    }

    if (invalidFiles.length > 0) {
      toast.error(
        invalidFiles.length > 1
          ? "Invalid files"
          : `Invalid file: ${invalidFiles[0].name}`,
        {
          description: "Only upload match data files",
        },
      );
    }

    if (validFiles.length > 0) {
      setFiles((prev) => [
        ...validFiles.filter(
          (file) => !prev.find(({ name }) => name === file.name),
        ),
        ...prev,
      ]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive, isDragReject } =
    useDropzone({
      onDrop,
      accept: {
        "application/json": [".json"],
      },
    });

  useEffect(() => {
    let stale = false;
    Promise.all(files.map(parseMatchesFile))
      .then((results) => {
        if (stale) {
          return;
        }
        const allMatches = results.flat();
        parsedMatchesRef.current = allMatches;
        setRowData(
          results.map((matches, i) => ({
            name: files[i].name,
            totalMatches: matches.length,
            totalTeams: new Set(matches.map((m) => m.teamNumber)).size,
          })),
        );
      })
      .catch((error) => {
        if (!stale) {
          toast.error("Failed to parse file", {
            description: String(error),
          });
        }
      });
    return () => {
      stale = true;
    };
  }, [files]);

  const onDownload = () => {
    const matches = parsedMatchesRef.current;
    if (matches.length === 0) {
      return;
    }
    const filenameBase = `combined_matches_${Date.now()}`;
    if (format === "csv") {
      downloadCsv(matches, filenameBase);
    } else {
      downloadJson(matches, filenameBase);
    }
  };

  const onCopyForSheets = async () => {
    const matches = parsedMatchesRef.current;
    if (matches.length === 0) {
      return;
    }
    await copyTsvToClipboard(matches);
    toast.success("Copied to clipboard", {
      description: "Paste into Google Sheets with Ctrl+V",
    });
  };

  const onClear = () => {
    setFiles([]);
    parsedMatchesRef.current = [];
  };

  const handleDelete = (fileName: string) => {
    setFiles(files.filter((file) => file.name !== fileName));
  };

  return (
    <div className="gap-y-5 flex flex-col my-5">
      {/* Dropzone */}
      <div
        {...getRootProps()}
        className={cn(
          "border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors shadow-lg",
          isDragActive && !isDragReject && "border-primary bg-primary/5",
          isDragReject && "border-red-500 bg-red-500/5",
          !isDragActive && "border-border hover:border-primary/50",
        )}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center justify-center gap-4 min-h-45">
          {isDragReject ? (
            <X className="h-12 w-12 text-red-500" strokeWidth={1.5} />
          ) : isDragActive ? (
            <Upload className="h-12 w-12 text-primary" strokeWidth={1.5} />
          ) : (
            <FileJson
              className="h-16 w-16 text-muted-foreground"
              strokeWidth={1.5}
            />
          )}
          <div className="text-2xl">
            Drag all tablet files here or click to select files
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="border rounded-lg shadow-lg py-2 text-2xl">
        {rowData.length ? (
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-inherit">
                {["Name", "Total Matches", "Total Teams"].map((head) => (
                  <TableHead key={head}>{head}</TableHead>
                ))}
                <TableHead className="w-0" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {rowData.map((row) => (
                <TableRow
                  key={row.name}
                  className="normal-case hover:bg-inherit"
                >
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.totalMatches}</TableCell>
                  <TableCell>{row.totalTeams}</TableCell>
                  <TableCell className="w-fit">
                    <button
                      type="button"
                      onClick={() => handleDelete(row.name)}
                      className="p-2 hover:bg-red-500/20 rounded-md transition-colors text-red-500 cursor-pointer"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="text-center py-4">No files uploaded</div>
        )}
      </div>

      {/* Actions */}
      <div className="mx-auto flex gap-x-4 items-center">
        <Select
          data={[
            { value: "json", label: "JSON" },
            { value: "csv", label: "CSV" },
          ]}
          value={format}
          onChange={(val) => {
            if (val) {
              setFormat(val as ExportFormat);
            }
          }}
          classNames={{ wrapper: "w-28" }}
        />
        <Button onClick={onDownload} disabled={files.length === 0}>
          <Download className="h-4 w-4 mr-2" />
          Compile and Download
        </Button>
        <Button
          onClick={onCopyForSheets}
          disabled={files.length === 0}
          variant="secondary"
        >
          <ClipboardCopy className="h-4 w-4 mr-2" />
          Copy for Sheets
        </Button>
        <Button
          onClick={onClear}
          disabled={files.length === 0}
          variant="destructive"
        >
          <Trash2 className="h-4 w-4 mr-2" />
          Clear files
        </Button>
      </div>
    </div>
  );
}
