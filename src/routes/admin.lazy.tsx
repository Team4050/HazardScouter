import {
  IconDownload,
  IconJson,
  IconTrash,
  IconTrashX,
  IconUpload,
  IconX,
} from "@tabler/icons-react";
import { createLazyFileRoute } from "@tanstack/react-router";
import download from "downloadjs";
import {
  type ReactNode,
  useCallback,
  useEffect,
  useReducer,
  useState,
} from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "sonner";
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
import { cn } from "@/util";

export const Route = createLazyFileRoute("/admin")({
  component: Page,
});

function Page(): ReactNode {
  const [files, setFiles] = useState<File[]>([]);
  const [rowData, setRowData] = useState<
    { name: string; totalMatches: number; totalTeams: Map<number, number> }[]
  >([]);
  const forceUpdate = useReducer((x) => x + 1, 0)[1];

  const validateFile = useCallback((file: File): boolean => {
    if (!file.name.match(/^matches_[a-z]{3}-[a-z]{3}_\d+\.json$/)) {
      return false;
    }
    if (!file.type.match(/^application\/json$/)) {
      return false;
    }
    return true;
  }, []);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const validFiles = acceptedFiles.filter(validateFile);
      const invalidFiles = acceptedFiles.filter((f) => !validateFile(f));

      if (invalidFiles.length > 0) {
        forceUpdate();
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
        const newFiles = [
          ...validFiles.filter(
            (file) => !files.find(({ name }) => name === file.name),
          ),
          ...files,
        ];
        setFiles(newFiles);
      }
    },
    [files, validateFile],
  );

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
          totalTeams: matches.reduce(
            (acc, match) =>
              acc.set(match.teamNumber, 1 + (acc.get(match.teamNumber) || 0)),
            new Map<number, number>(),
          ),
        };
      }),
    ).then(setRowData);
  }, [files]);

  const onClear = () => {
    setFiles([]);
  };

  const onDownload = async () => {
    const matchesPromises = files.map(async (file) => {
      const matches = await parseMatchesFile(file);
      return matches;
    });

    const allMatches = await Promise.all(matchesPromises);
    const combinedMatches = allMatches.flat();

    download(
      JSON.stringify(combinedMatches, null, 2),
      `combined_matches_${Date.now()}.json`.toLowerCase(),
      "application/json",
    );
  };

  const handleDelete = (fileName: string) => {
    setFiles(files.filter((file) => file.name !== fileName));
  };

  return (
    <div className="gap-y-5 flex flex-col">
      {/* Dropzone */}
      <div
        {...getRootProps()}
        className={cn(
          "border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors",
          isDragActive && !isDragReject && "border-primary bg-primary/5",
          isDragReject && "border-red-500 bg-red-500/5",
          !isDragActive && "border-border hover:border-primary/50",
        )}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center justify-center gap-4 min-h-45">
          {isDragReject ? (
            <IconX className="h-12 w-12 text-red-500" stroke={1.5} />
          ) : isDragActive ? (
            <IconUpload className="h-12 w-12 text-primary" stroke={1.5} />
          ) : (
            <IconJson
              className="h-16 w-16 text-muted-foreground"
              stroke={1.5}
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
                  <TableCell>{row.totalTeams.size}</TableCell>
                  <TableCell className="w-fit">
                    <button
                      type="button"
                      onClick={() => handleDelete(row.name)}
                      className="p-2 hover:bg-red-500/20 rounded-md transition-colors text-red-500"
                    >
                      <IconTrash className="h-5 w-5" />
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
      <div className="mx-auto flex gap-x-4">
        <Button onClick={onDownload}>
          <IconDownload className="h-4 w-4 mr-2" />
          Compile and Download
        </Button>
        <Button onClick={onClear} variant="destructive">
          <IconTrashX className="h-4 w-4 mr-2" />
          Clear files
        </Button>
      </div>
    </div>
  );
}
