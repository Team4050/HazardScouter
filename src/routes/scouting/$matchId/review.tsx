import { createFileRoute, useRouter } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { JsonView } from "@/components/JsonView";
import { ConfirmDialog, useConfirmDialog } from "@/components/modals";
import { Button } from "@/components/ui/button";
import { Timeline, TimelineItem } from "@/components/ui/timeline";
import { softDeleteMatch, useMatch } from "@/data/db";
import { phaseDetails, phaseOrder } from "@/data/match";

export const Route = createFileRoute("/scouting/$matchId/review")({
  component: Page,
});

function Page(): ReactNode {
  const { matchId } = Route.useParams();
  const match = useMatch(matchId);
  const { history } = useRouter();
  const navigate = Route.useNavigate();
  const { confirmDialogProps, openConfirmDialog } = useConfirmDialog();

  if (!match) {
    return null;
  }

  const { phases, ...metadata } = match;

  const handleDelete = () => {
    openConfirmDialog({
      title: "Delete Match",
      description: "Are you sure you want to delete this match?",
      confirmLabel: "Delete Match",
      cancelLabel: "Cancel",
      confirmVariant: "destructive",
      onConfirm: () => {
        softDeleteMatch(matchId);
        navigate({ to: "/scouting" });
      },
    });
  };

  return (
    <div className="max-w-2xl mx-auto w-full gap-y-6 flex md:flex-col flex-col-reverse mt-4">
      <ConfirmDialog {...confirmDialogProps} />

      <Timeline>
        <TimelineItem
          title="Metadata"
          isComplete={true}
          nextComplete={phaseOrder.some((p) => phases[p] !== undefined)}
        >
          <RenderObject obj={metadata} />
        </TimelineItem>

        {phaseOrder.map((phase, index) => {
          const { title, icon: Icon } = phaseDetails[phase];
          const data = phases[phase];
          const isLast = index === phaseOrder.length - 1;
          // A phase is complete if it has data, or any later phase has data
          // (meaning the user passed through this phase)
          const isComplete =
            data !== undefined ||
            phaseOrder.slice(index + 1).some((p) => phases[p] !== undefined);
          const nextComplete =
            !isLast &&
            (phases[phaseOrder[index + 1]] !== undefined ||
              phaseOrder.slice(index + 2).some((p) => phases[p] !== undefined));

          return (
            <TimelineItem
              key={phase}
              title={title}
              icon={<Icon className="size-8" />}
              isComplete={isComplete}
              isLast={isLast}
              nextComplete={nextComplete}
            >
              <RenderObject obj={data} />
            </TimelineItem>
          );
        })}
      </Timeline>

      <div className="flex md:h-auto h-14">
        <Button onClick={() => history.go(-1)} className="w-40 h-full">
          {"< Back"}
        </Button>
        <Button
          variant="destructive"
          className="w-40 h-full ml-auto"
          onClick={handleDelete}
        >
          Delete
        </Button>
      </div>
    </div>
  );
}

function RenderObject({ obj }: { obj?: unknown }): ReactNode {
  return (
    <div className="bg-zinc-900 text-zinc-100 rounded-md p-4">
      {obj ? (
        <JsonView value={obj} />
      ) : (
        <span className="text-gray-500 text-[14px] font-mono">No data</span>
      )}
    </div>
  );
}
