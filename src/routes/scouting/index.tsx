import { useLiveQuery } from "@tanstack/react-db";
import { createFileRoute } from "@tanstack/react-router";
import { FileJson, Trash2 } from "lucide-react";
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
import { downloadMatches, matchCollection } from "@/data/db";
import { phaseDetails, phaseOrder } from "@/data/match";
import { cn, shortDayName } from "@/util";

export const Route = createFileRoute("/scouting/")({
  component: Page,
});

function Page(): ReactNode {
  const navigate = Route.useNavigate();
  const { data: matches = [] } = useLiveQuery(() => matchCollection);
  const canFinish = !!matches.filter((m) => m.finished !== undefined).length;

  const [newModalOpened, setNewModalOpened] = useState(false);
  const openNewModal = useCallback(() => setNewModalOpened(true), []);
  const closeNewModal = useCallback(() => setNewModalOpened(false), []);

  const { confirmDialogProps, openConfirmDialog } = useConfirmDialog();

  const handleEdit = useCallback(
    (matchId: string) => {
      const match = matchCollection.get(matchId);

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
        onConfirm: () => matchCollection.delete(matchId),
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
      New Match
    </Button>
  );

  return (
    <div className="flex flex-col flex-1 py-2 md:py-6">
      <NewMatchModal opened={newModalOpened} onClose={closeNewModal} />
      <ConfirmDialog {...confirmDialogProps} />

      {matches.length > 0 ? (
        <div className="flex sm:flex-row flex-col mb-2">
          <div className="text-4xl grow hidden sm:block ml-1">Match List</div>
          <div className="grid grid-cols-2 gap-2 w-full md:ml-auto md:w-fit">
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
        </div>
      ) : null}

      <div className="flex-1 flex flex-col">
        {matches.length > 0 ? (
          <div className="border rounded-lg shadow-lg my-2">
            <Table>
              <TableHeader className="text-base">
                <TableRow>
                  {["Match", "Team", "Scouter", "Started", "Finished"].map(
                    (head) => (
                      <TableHead
                        key={head}
                        className={cn(
                          (head === "Started" || head === "Finished") &&
                            "hidden xs:table-cell",
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
                        onClick={() => handleEdit(id)}
                        className="cursor-pointer text-base"
                      >
                        <TableCell className="pl-3">{matchNumber}</TableCell>
                        <TableCell>{teamNumber}</TableCell>
                        <TableCell className="text-ellipsis max-w-10 overflow-clip whitespace-nowrap">
                          {/* TODO: Need to add tooltips */}
                          {scouter}
                        </TableCell>
                        <TableCell className="hidden xs:table-cell">
                          {`${shortDayName(startedDate)} ${startedDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`}
                        </TableCell>
                        <TableCell className="hidden xs:table-cell">
                          {finishedDate
                            ? `${shortDayName(finishedDate)} ${finishedDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`
                            : "In Progress"}
                        </TableCell>
                        <TableCell className="w-fit">
                          <ActionGroup
                            onClickReview={() => handleOpen(id)}
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
  onClickReview,
  onClickDelete,
}: {
  onClickReview: () => void;
  onClickDelete: () => void;
}): ReactNode {
  const handleReview = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClickReview();
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClickDelete();
  };

  return (
    <div className="w-fit flex gap-x-1">
      <button
        type="button"
        onClick={handleReview}
        className="p-2 hover:opacity-50 rounded-md transition-colors cursor-pointer"
      >
        <FileJson className="h-5 w-5" />
      </button>
      <button
        type="button"
        onClick={handleDelete}
        className="p-2 rounded-md hover:opacity-50 transition-colors text-red-500 cursor-pointer"
      >
        <Trash2 className="h-5 w-5" />
      </button>
    </div>
  );
}
