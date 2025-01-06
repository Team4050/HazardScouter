import {
  NewMatchModal,
  openDeleteModal,
  openExportModal,
} from "@/components/modals";
import { downloadMatches, matchCollection, useReactivity } from "@/data/db";
import { phaseOrder } from "@/data/match";
import { shortDayName } from "@/util";
import { ActionIcon, Button, Paper, Table } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconPencil, IconTrash } from "@tabler/icons-react";
import { createFileRoute } from "@tanstack/react-router";
import { type ReactNode, useCallback } from "react";

export const Route = createFileRoute("/scouting/")({
  component: Page,
});

function Page(): ReactNode {
  const navigate = Route.useNavigate();
  const matches = useReactivity(() => matchCollection.find().fetch(), []);

  const [newModalOpened, { open: openNewModal, close: closeNewModal }] =
    useDisclosure();

  const handleEdit = useCallback(
    (matchId: string) => {
      const match = matchCollection.findOne({ id: matchId });

      if (match) {
        // Redirect to the first phase that hasn't been completed
        for (const phase of phaseOrder) {
          if (!match.phases[phase]) {
            navigate({
              to: `/scouting/$matchId/collect/${phase}`,
              params: { matchId },
            });
            return;
          }
        }

        // Otherwise, if everything has been completed, redirect to the edit page
        navigate({
          to: "/scouting/$matchId/edit",
          params: { matchId },
        });
      }
    },
    [navigate],
  );

  const handleDelete = useCallback((matchId: string) => {
    openDeleteModal({
      onConfirm: () => matchCollection.removeOne({ id: matchId }),
    });
  }, []);

  const handleOpen = useCallback(
    (matchId: string) => {
      navigate({ to: "/scouting/$matchId/review", params: { matchId } });
    },
    [navigate],
  );

  return (
    <>
      <NewMatchModal opened={newModalOpened} onClose={closeNewModal} />

      <div className="flex mb-6 gap-x-2">
        <div className="text-4xl flex-grow">Match List</div>
        <Button className="text-3xl" onClick={openNewModal}>
          Scout New Match
        </Button>
        <Button
          className="text-3xl"
          disabled={!matches}
          variant="subtle"
          onClick={() =>
            openExportModal({
              onConfirm: () => {
                downloadMatches(true);
              },
            })
          }
        >
          Finish Scouting
        </Button>
      </div>

      <Paper withBorder shadow="xl" className="py-2">
        <Table highlightOnHover>
          <Table.Thead>
            <Table.Tr>
              {["Match", "Team", "Scouter", "Started", "Finished"].map(
                (head) => (
                  <Table.Th key={head}>{head}</Table.Th>
                ),
              )}
              <Table.Th className="w-0" />
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {matches.map(
              ({ id, matchNumber, teamNumber, scouter, started, finished }) => {
                const startedDate = new Date(started);
                const finishedDate = finished ? new Date(finished) : null;
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
                      {`${shortDayName(startedDate)} ${startedDate.toLocaleTimeString()}`}
                    </Table.Td>
                    <Table.Td>
                      {finishedDate
                        ? `${shortDayName(finishedDate)} ${finishedDate.toLocaleTimeString()}`
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
      </Paper>
    </>
  );
}

function ActionGroup({
  onClickEdit,
  onClickDelete,
}: { onClickEdit: () => void; onClickDelete: () => void }): ReactNode {
  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClickEdit();
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClickDelete();
  };

  return (
    <div className="w-fit flex space-x-2">
      <ActionIcon.Group>
        <ActionIcon onClick={handleEdit} variant="subtle">
          <IconPencil />
        </ActionIcon>
        <ActionIcon onClick={handleDelete} variant="subtle" color="red">
          <IconTrash />
        </ActionIcon>
      </ActionIcon.Group>
    </div>
  );
}
