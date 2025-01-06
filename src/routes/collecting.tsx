import { parseMatchesFile } from "@/data/db";
import { ActionIcon, Button, Group, Paper, Table, rem } from "@mantine/core";
import { Dropzone, type FileRejection } from "@mantine/dropzone";
import { useForceUpdate } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import {
  IconDownload,
  IconJson,
  IconTrash,
  IconTrashX,
  IconUpload,
  IconX,
} from "@tabler/icons-react";
import { createFileRoute } from "@tanstack/react-router";
import download from "downloadjs";
import { type ReactNode, useEffect, useState } from "react";

export const Route = createFileRoute("/collecting")({
  component: Page,
});

function Page(): ReactNode {
  const [files, setFiles] = useState<File[]>([]);
  const [rowData, setRowData] = useState<
    { name: string; totalMatches: number; totalTeams: Map<number, number> }[]
  >([]);
  const forceUpdate = useForceUpdate();

  const onDrop = (droppedFiles: File[]) => {
    console.log("drop");
    const newFiles = [
      ...droppedFiles.filter(
        (file) => !files.find(({ name }) => name === file.name),
      ),
      ...files,
    ];
    setFiles(newFiles);
  };

  const onReject = (fileRejections: FileRejection[]) => {
    forceUpdate();

    notifications.show({
      title:
        fileRejections.length > 1
          ? "Invalid files"
          : `Invalid file: ${fileRejections[0].file.name}`,
      message: "Only upload match data files",
      color: "red",
      radius: "xs",
      autoClose: 4000,
    });
  };

  const validateFiles = (
    file: File | DataTransferItem,
  ): null | { message: string; code: string } => {
    if (file instanceof DataTransferItem) {
      return null;
    }

    if (!file.name.match(/^matches_[a-z]{3}-[a-z]{3}_\d+\.json$/)) {
      return {
        message: "Invalid file name format",
        code: "invalid-file-name",
      };
    }

    if (!file.type.match(/^application\/json$/)) {
      return {
        message: "Invalid file type",
        code: "invalid-file-type",
      };
    }

    return null;
  };

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
      <Dropzone
        onDrop={onDrop}
        onReject={onReject}
        accept={["application/json"]}
        validator={validateFiles}
      >
        <Group
          justify="center"
          gap="xl"
          mih={220}
          style={{ pointerEvents: "none" }}
        >
          <Dropzone.Accept>
            <IconUpload
              style={{
                width: rem(52),
                height: rem(52),
                color: "var(--mantine-color-primary)",
              }}
              stroke={1.5}
            />
          </Dropzone.Accept>
          <Dropzone.Reject>
            <IconX
              style={{
                width: rem(52),
                height: rem(52),
                color: "var(--mantine-color-red-6)",
              }}
              stroke={1.5}
            />
          </Dropzone.Reject>
          <Dropzone.Idle>
            <IconJson
              style={{
                width: rem(52),
                height: rem(52),
                color: "var(--mantine-color-dimmed)",
              }}
              stroke={1.5}
            />
          </Dropzone.Idle>

          <div>Drag all tablet files here or click to select files</div>
        </Group>
      </Dropzone>

      <Paper withBorder shadow="xl" className="py-2">
        {rowData.length ? (
          <Table highlightOnHover>
            <Table.Thead>
              <Table.Tr>
                {["Name", "Total Matches", "Total Teams"].map((head) => (
                  <Table.Th key={head}>{head}</Table.Th>
                ))}
                <Table.Th className="w-0" />
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {rowData.map((row) => (
                <Table.Tr key={row.name} className="normal-case">
                  <Table.Td>{row.name}</Table.Td>
                  <Table.Td>{row.totalMatches}</Table.Td>
                  <Table.Td>{row.totalTeams.size}</Table.Td>
                  <Table.Td className="w-fit flex space-x-2">
                    <ActionIcon
                      onClick={() => handleDelete(row.name)}
                      variant="subtle"
                      color="red"
                    >
                      <IconTrash />
                    </ActionIcon>
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        ) : (
          <div className="text-center">No files uploaded</div>
        )}
      </Paper>

      <div className="mx-auto flex gap-x-4">
        <Button leftSection={<IconDownload />} onClick={onDownload}>
          Compile and Download
        </Button>
        <Button leftSection={<IconTrashX />} onClick={onClear}>
          Clear files
        </Button>
      </div>
    </div>
  );
}
