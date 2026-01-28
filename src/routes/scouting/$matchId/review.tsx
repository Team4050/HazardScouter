import { createFileRoute, useRouter } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { ConfirmDialog, useConfirmDialog } from "@/components/modals";
import { Button } from "@/components/ui/button";
import { Timeline, TimelineItem } from "@/components/ui/timeline";
import { matchCollection, useMatch } from "@/data/db";
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

  if (!match) return null;

  const { phases, ...metadata } = match;

  const handleDelete = () => {
    openConfirmDialog({
      title: "Delete Match",
      description: "Are you sure you want to delete this match?",
      confirmLabel: "Delete Match",
      cancelLabel: "Cancel",
      confirmVariant: "destructive",
      onConfirm: () => {
        matchCollection.removeOne({ id: matchId });
        navigate({ to: "/scouting" });
      },
    });
  };

  return (
    <div className="max-w-2xl mx-auto gap-y-6 flex md:flex-col flex-col-reverse">
      <ConfirmDialog {...confirmDialogProps} />

      <Timeline>
        <TimelineItem
          title="Metadata"
          isComplete={true}
          nextComplete={phases[phaseOrder[0]] !== undefined}
        >
          <RenderObject obj={metadata} />
        </TimelineItem>

        {phaseOrder.map((phase, index) => {
          const { title, icon: Icon } = phaseDetails[phase];
          const data = phases[phase];
          const isComplete = data !== undefined;
          const isLast = index === phaseOrder.length - 1;

          return (
            <TimelineItem
              key={phase}
              title={title}
              icon={<Icon className="h-4 w-4" />}
              isComplete={isComplete}
              isLast={isLast}
              nextComplete={
                isLast ? false : phases[phaseOrder[index + 1]] !== undefined
              }
            >
              <RenderObject obj={data} />
            </TimelineItem>
          );
        })}
      </Timeline>

      <div className="flex md:h-auto h-14">
        <Button
          onClick={() => history.go(-1)}
          className="w-40 h-full font-normal"
        >
          {"< Back"}
        </Button>
        <Button
          variant="ghost"
          className="w-40 h-full font-normal ml-auto text-red-500 hover:text-red-500 hover:bg-red-500/10"
          onClick={handleDelete}
        >
          Delete
        </Button>
      </div>
    </div>
  );
}

function RenderObject({ obj }: { obj?: unknown }): ReactNode {
  const code = obj ? JSON.stringify(obj, null, 2) : "// No data";

  return (
    <pre className="bg-zinc-900 text-zinc-100 rounded-md p-4 overflow-x-auto text-sm font-mono">
      <code>{code}</code>
    </pre>
  );
}
