import { createLazyFileRoute } from "@tanstack/react-router";
import {
  ClipboardCopy,
  Download,
  FileJson,
  Trash2,
  Upload,
  X,
} from "lucide-react";
import { type ReactNode, useCallback, useEffect, useState } from "react";
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
import { parseMatchesFile } from "@/data/db";
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

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const validFiles = acceptedFiles.filter(validateFile);
    const invalidFiles = acceptedFiles.filter((f) => !validateFile(f));

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
    Promise.all(
      files.map(async (file) => {
        const matches = await parseMatchesFile(file);
        return {
          name: file.name,
          totalMatches: matches.length,
          totalTeams: new Set(matches.map((m) => m.teamNumber)).size,
        };
      }),
    ).then(setRowData);
  }, [files]);

  const onDownload = async () => {
    const allMatches = await Promise.all(files.map(parseMatchesFile));
    const combinedMatches = allMatches.flat();
    if (combinedMatches.length === 0) {
      return;
    }

    const filenameBase = `combined_matches_${Date.now()}`;
    if (format === "csv") {
      downloadCsv(combinedMatches, filenameBase);
    } else {
      downloadJson(combinedMatches, filenameBase);
    }
  };

  const onCopyForSheets = async () => {
    const allMatches = await Promise.all(files.map(parseMatchesFile));
    const combinedMatches = allMatches.flat();
    if (combinedMatches.length === 0) {
      return;
    }
    await copyTsvToClipboard(combinedMatches);
    toast.success("Copied to clipboard", {
      description: "Paste into Google Sheets with Ctrl+V",
    });
  };

  const onClear = () => {
    setFiles([]);
  };

  const handleDelete = (fileName: string) => {
    setFiles(files.filter((file) => file.name !== fileName));
  };

  return (
    <div className="gap-y-5 flex flex-col mt-4">
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
              <TableRow>
                {["Name", "Total Matches", "Total Teams"].map((head) => (
                  <TableHead key={head}>{head}</TableHead>
                ))}
                <TableHead className="w-0" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {rowData.map((row) => (
                <TableRow key={row.name} className="normal-case">
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.totalMatches}</TableCell>
                  <TableCell>{row.totalTeams}</TableCell>
                  <TableCell className="w-fit">
                    <button
                      type="button"
                      onClick={() => handleDelete(row.name)}
                      className="p-2 hover:bg-red-500/20 rounded-md transition-colors text-red-500"
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
