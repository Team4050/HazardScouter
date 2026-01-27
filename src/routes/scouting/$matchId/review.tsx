import { createFileRoute, useRouter } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { ConfirmDialog, useConfirmDialog } from "@/components/modals";
import { Button } from "@/components/ui/button";
import { matchCollection, useMatch } from "@/data/db";
import { phaseDetails, phaseOrder } from "@/data/match";
import { cn } from "@/util";

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

      {/* Timeline */}
      <div className="relative pl-8">
        {/* Timeline line */}
        <div className="absolute left-3 top-0 bottom-0 w-0.5 bg-border" />

        {/* Metadata item */}
        <TimelineItem title="Metadata" isComplete={true} isFirst={true}>
          <RenderObject obj={metadata} />
        </TimelineItem>

        {/* Phase items */}
        {phaseOrder.map((phase, index) => {
          const { title, icon: Icon } = phaseDetails[phase];
          const data = phases[phase];
          const isComplete = data !== undefined;

          return (
            <TimelineItem
              key={phase}
              title={title}
              icon={<Icon className="h-4 w-4" />}
              isComplete={isComplete}
              isLast={index === phaseOrder.length - 1}
            >
              <RenderObject obj={data} />
            </TimelineItem>
          );
        })}
      </div>

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

type TimelineItemProps = {
  title: string;
  children: ReactNode;
  icon?: ReactNode;
  isComplete?: boolean;
  isFirst?: boolean;
  isLast?: boolean;
};

function TimelineItem({
  title,
  children,
  icon,
  isComplete = false,
  isLast = false,
}: TimelineItemProps): ReactNode {
  return (
    <div className={cn("relative pb-6", isLast && "pb-0")}>
      {/* Bullet/Icon */}
      <div
        className={cn(
          "absolute -left-5 w-6 h-6 rounded-sm flex items-center justify-center",
          isComplete
            ? "bg-primary text-primary-foreground"
            : "bg-muted text-muted-foreground",
        )}
      >
        {icon || <div className="w-2 h-2 rounded-full bg-current" />}
      </div>

      {/* Content */}
      <div className="ml-4">
        <h3
          className={cn(
            "text-lg font-medium mb-2",
            !isComplete && "opacity-50",
          )}
        >
          {title}
        </h3>
        {children}
      </div>
    </div>
  );
}

// biome-ignore lint/suspicious/noExplicitAny: We don't really care about the type here
function RenderObject({ obj }: { obj?: any }): ReactNode {
  const code = obj ? JSON.stringify(obj, null, 2) : "// No data";

  return (
    <pre className="bg-zinc-900 text-zinc-100 rounded-md p-4 overflow-x-auto text-sm font-mono">
      <code>{code}</code>
    </pre>
  );
}
