import { IconPencil, IconTrash } from "@tabler/icons-react";
import { createFileRoute } from "@tanstack/react-router";
import { type ReactNode, useCallback, useState } from "react";
import {
  ConfirmDialog,
  NewMatchModal,
  useConfirmDialog,
} from "@/components/modals";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { downloadMatches, matchCollection, useReactivity } from "@/data/db";
import { phaseDetails, phaseOrder } from "@/data/match";
import { useIsMobile } from "@/hooks/useIsMobile";
import { cn, shortDayName } from "@/util";

export const Route = createFileRoute("/scouting/")({
  component: Page,
});

function Page(): ReactNode {
  const navigate = Route.useNavigate();
  const matches = useReactivity(() => matchCollection.find().fetch(), []);
  const canFinish = !!matches.filter((m) => m.finished !== undefined).length;
  const isMobile = useIsMobile();

  const [newModalOpened, setNewModalOpened] = useState(false);
  const openNewModal = useCallback(() => setNewModalOpened(true), []);
  const closeNewModal = useCallback(() => setNewModalOpened(false), []);

  const { confirmDialogProps, openConfirmDialog } = useConfirmDialog();

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

  const handleDelete = useCallback(
    (matchId: string) => {
      openConfirmDialog({
        title: "Delete Match",
        description: "Are you sure you want to delete this match?",
        confirmLabel: "Delete Match",
        cancelLabel: "Cancel",
        confirmVariant: "destructive",
        onConfirm: () => matchCollection.removeOne({ id: matchId }),
      });
    },
    [openConfirmDialog],
  );

  const handleExport = useCallback(() => {
    openConfirmDialog({
      title: "Download Matches",
      description:
        "Are you sure you are ready to download? This will reset your data and clear all finished matches.",
      confirmLabel: "Download",
      cancelLabel: "Cancel",
      onConfirm: () => downloadMatches(true),
    });
  }, [openConfirmDialog]);

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
    <div className="flex flex-col flex-1 py-2 md:py-6">
      <NewMatchModal opened={newModalOpened} onClose={closeNewModal} />
      <ConfirmDialog {...confirmDialogProps} />

      <div className="flex md:flex-row flex-col gap-2 flex-none">
        {matches.length > 0 ? (
          <>
            <div className="text-4xl grow hidden md:block">Match List</div>
            <div>
              <NewMatchButton />
              <Button
                className="text-3xl"
                disabled={!matches || !canFinish}
                variant="ghost"
                onClick={handleExport}
              >
                Finish Scouting
              </Button>
            </div>
          </>
        ) : null}
      </div>

      <div className="flex-1 flex flex-col">
        {matches.length > 0 ? (
          <div className="border rounded-lg shadow-lg my-2">
            <Table>
              <TableHeader>
                <TableRow>
                  {["Match", "Team", "Scouter", "Started", "Finished"].map(
                    (head) => (
                      <TableHead
                        key={head}
                        className={cn(
                          (head === "Started" || head === "Finished") &&
                            isMobile
                            ? "hidden"
                            : null,
                        )}
                      >
                        {head}
                      </TableHead>
                    ),
                  )}
                  <TableHead className="w-0" />
                </TableRow>
              </TableHeader>
              <TableBody>
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
                      <TableRow
                        key={id}
                        onClick={() => handleOpen(id)}
                        className="cursor-pointer"
                      >
                        <TableCell>{matchNumber}</TableCell>
                        <TableCell>{teamNumber}</TableCell>
                        <TableCell>{scouter}</TableCell>
                        <TableCell
                          className="data-[mobile=true]:hidden"
                          data-mobile={isMobile}
                        >
                          {`${shortDayName(startedDate)} ${startedDate.toLocaleTimeString()}`}
                        </TableCell>
                        <TableCell
                          className="data-[mobile=true]:hidden"
                          data-mobile={isMobile}
                        >
                          {finishedDate
                            ? `${shortDayName(finishedDate)} ${finishedDate.toLocaleTimeString()}`
                            : "In Progress"}
                        </TableCell>
                        <TableCell className="w-fit">
                          <ActionGroup
                            onClickEdit={() => handleEdit(id)}
                            onClickDelete={() => handleDelete(id)}
                          />
                        </TableCell>
                      </TableRow>
                    );
                  },
                )}
              </TableBody>
            </Table>
          </div>
        ) : (
          <div className="flex-1 flex flex-col justify-center items-center gap-y-4">
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
}: {
  onClickEdit: () => void;
  onClickDelete: () => void;
}): ReactNode {
  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClickEdit();
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClickDelete();
  };

  return (
    <div className="w-fit flex space-x-1">
      <button
        type="button"
        onClick={handleEdit}
        className="p-2 hover:bg-accent rounded-md transition-colors"
      >
        <IconPencil className="h-5 w-5" />
      </button>
      <button
        type="button"
        onClick={handleDelete}
        className="p-2 hover:bg-red-500/20 rounded-md transition-colors text-red-500"
      >
        <IconTrash className="h-5 w-5" />
      </button>
    </div>
  );
}
