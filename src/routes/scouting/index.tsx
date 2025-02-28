import {
  NewMatchModal,
  openDeleteModal,
  openExportModal,
} from "@/components/modals";
import { downloadMatches, matchCollection, useReactivity } from "@/data/db";
import { phaseDetails, phaseOrder } from "@/data/match";
import { useIsMobile } from "@/hooks/useIsMobile";
import { cn, shortDayName } from "@/util";
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
  const canFinish = !!matches.filter((m) => m.finished !== undefined).length;
  const isMobile = useIsMobile();

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
              to: `/scouting/$matchId/collect/${phaseDetails[phase].slug}`,
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

  const NewMatchButton = (): ReactNode => (
    <Button className="text-3xl" onClick={openNewModal}>
      Scout New Match
    </Button>
  );

  return (
    <div className="flex flex-col h-full">
      <NewMatchModal opened={newModalOpened} onClose={closeNewModal} />

      <div className="flex md:flex-row flex-col mb-2 md:mb-6 gap-2 flex-none">
        <div
          className="text-4xl flex-grow data-[mobile=true]:hidden"
          data-mobile={isMobile}
        >
          Match List
        </div>

        {matches.length > 0 ? (
          <>
            <NewMatchButton />
            <Button
              className="text-3xl"
              disabled={!matches || !canFinish}
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
          </>
        ) : null}
      </div>

      <div className="flex-1">
        {matches.length > 0 ? (
          <Paper withBorder shadow="xl" className="py-2">
            <Table highlightOnHover>
              <Table.Thead>
                <Table.Tr>
                  {["Match", "Team", "Scouter", "Started", "Finished"].map(
                    (head) => (
                      <Table.Th
                        key={head}
                        // The below code is not how this is supposed to be done
                        className={cn(
                          (head === "Started" || head === "Finished") &&
                            isMobile
                            ? "hidden"
                            : null,
                        )}
                      >
                        {head}
                      </Table.Th>
                    ),
                  )}
                  <Table.Th className="w-0" />
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {matches.map(
                  ({
                    id,
                    matchNumber,
                    teamNumber,
                    scouter,
                    started,
                    finished,
                  }) => {
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
                        <Table.Td
                          className="data-[mobile=true]:hidden"
                          data-mobile={isMobile}
                        >
                          {`${shortDayName(startedDate)} ${startedDate.toLocaleTimeString()}`}
                        </Table.Td>
                        <Table.Td
                          className="data-[mobile=true]:hidden"
                          data-mobile={isMobile}
                        >
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
        ) : (
          <div className="flex flex-col justify-center items-center gap-y-4 h-full">
            <div className="text-4xl">No matches found</div>
            <NewMatchButton />
          </div>
        )}
      </div>
    </div>
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
