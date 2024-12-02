import { matchCollection, newId, useReactivity } from "@/data/db";
import {
  ActionIcon,
  Button,
  Table,
  getThemeColor,
  useMantineTheme,
} from "@mantine/core";
import { IconPencil, IconTrash } from "@tabler/icons-react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute("/scouting/")({
  component: Page,
});

const tableHead = ["Match", "Type", "Team", "Alliance", "Scouter"];

function Page(): JSX.Element {
  const theme = useMantineTheme();
  const navigate = useNavigate();
  const matches = useReactivity(
    () => matchCollection.find({ finished: { $exists: true } }),
    [],
  );

  const handleNew = () => {
    const id = newId();
    console.log("New", id, id.length);

    matchCollection.insert({
      id,
      started: new Date(),
      phases: {},
    });

    navigate({ to: "/scouting/$matchId/pre-match", params: { matchId: id } });
  };

  const handleEdit = (id: string) => {
    console.log("Edit", id);
  };

  const handleDelete = (id: string) => {
    console.log("Delete", id);
  };

  const handleOpen = (id: string) => {
    console.log("Open", id);
  };

  return (
    <div className="">
      <div className="flex mb-10">
        <div className="text-4xl flex-grow">Match List</div>
        <Button onClick={handleNew}>Scout New Match</Button>
      </div>

      {/* TODO: It's probably overkill, but this nearly justifies a data grid */}
      <Table highlightOnHover>
        <Table.Thead>
          <Table.Tr>
            {tableHead.map((head) => (
              <Table.Th key={head}>{head}</Table.Th>
            ))}
            <Table.Th className="w-0" />
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {matches.map(({ id, phases: { preMatch } }) => {
            return (
              <Table.Tr
                key={id}
                onClick={() => handleOpen(id)}
                className="cursor-pointer"
              >
                <Table.Td>{preMatch?.matchNumber}</Table.Td>
                <Table.Td>{preMatch?.matchType}</Table.Td>
                <Table.Td>{preMatch?.teamNumber}</Table.Td>
                <Table.Td
                  style={{ color: getThemeColor(preMatch?.alliance, theme) }}
                >
                  {preMatch?.alliance}
                </Table.Td>
                <Table.Td>{preMatch?.scouter}</Table.Td>
                <Table.Td className="w-fit">
                  <ActionGroup
                    onClickEdit={() => handleEdit(id)}
                    onClickDelete={() => handleDelete(id)}
                  />
                </Table.Td>
              </Table.Tr>
            );
          })}
        </Table.Tbody>
      </Table>
    </div>
  );
}

function ActionGroup({
  onClickEdit,
  onClickDelete,
}: { onClickEdit: () => void; onClickDelete: () => void }): JSX.Element {
  return (
    <div className="w-fit flex space-x-2">
      <ActionIcon
        onClick={(e) => {
          e.stopPropagation();
          onClickEdit();
        }}
        variant="subtle"
      >
        <IconPencil />
      </ActionIcon>
      <ActionIcon
        onClick={(e) => {
          e.stopPropagation();
          onClickDelete();
        }}
        variant="subtle"
        color="red"
      >
        <IconTrash />
      </ActionIcon>
    </div>
  );
}
