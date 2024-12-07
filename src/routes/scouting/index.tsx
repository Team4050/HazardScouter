import { DeleteModal, NewMatchModal } from "@/components/modals";
import { matchCollection, useReactivity } from "@/data/db";
import { ActionIcon, Button, Table } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconPencil, IconTrash } from "@tabler/icons-react";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/scouting/")({
  component: Page,
});

const tableHead = ["Match", "Team", "Scouter", "Started", "Finished"];

function Page(): JSX.Element {
  const navigate = Route.useNavigate();
  const matches = useReactivity(() => matchCollection.find().fetch(), []);
  const [matchId, setMatchId] = useState<string | null>(null);

  const [newModalOpened, { open: openNewModal, close: closeNewModal }] =
    useDisclosure();
  const [
    deleteModalOpened,
    { open: openDeleteModal, close: closeDeleteModal },
  ] = useDisclosure();

  const handleEdit = (id: string) => {
    navigate({
      to: "/scouting/$matchId/collect/pre-match",
      params: { matchId: id },
    });
  };

  const handleDelete = (id: string) => {
    setMatchId(id);
    openDeleteModal();
  };

  const handleOpen = (id: string) => {
    navigate({ to: "/scouting/$matchId/review", params: { matchId: id } });
  };

  return (
    <>
      <NewMatchModal opened={newModalOpened} onClose={closeNewModal} />
      <DeleteModal
        opened={deleteModalOpened}
        onClose={closeDeleteModal}
        onDelete={() => {
          matchCollection.removeOne({ id: matchId! });
        }}
      />

      <div className="flex my-10 gap-x-2">
        <div className="text-4xl flex-grow">Match List</div>
        <Button className="text-2xl" onClick={openNewModal}>
          Scout New Match
        </Button>
        <Button className="text-2xl" disabled={!matches} variant="subtle">
          Finish Scouting
        </Button>
      </div>

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
          {matches.map(
            ({ id, matchNumber, teamNumber, scouter, started, finished }) => {
              return (
                <Table.Tr
                  key={id}
                  onClick={() => handleOpen(id)}
                  className="cursor-pointer"
                >
                  <Table.Td>{matchNumber}</Table.Td>
                  <Table.Td>{teamNumber}</Table.Td>
                  <Table.Td>{scouter}</Table.Td>
                  <Table.Td>
                    {new Date(started).toLocaleTimeString("en-US")}
                  </Table.Td>
                  <Table.Td>
                    {finished
                      ? new Date(finished).toLocaleTimeString()
                      : "In Progress"}
                  </Table.Td>
                  <Table.Td className="w-fit">
                    <ActionGroup
                      onClickEdit={() => handleEdit(id)}
                      onClickDelete={() => handleDelete(id)}
                    />
                  </Table.Td>
                </Table.Tr>
              );
            },
          )}
        </Table.Tbody>
      </Table>
    </>
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
