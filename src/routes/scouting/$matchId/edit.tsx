import { createFileRoute } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { Auto } from "@/components/form/Auto";
import { Endgame } from "@/components/form/Endgame";
import { PostMatch } from "@/components/form/PostMatch";
import { PreMatch } from "@/components/form/PreMatch";
import { Teleop } from "@/components/form/Teleop";
import { ConfirmDialog, useConfirmDialog } from "@/components/modals";
import { Button } from "@/components/ui/button";
import { matchCollection, useMatch } from "@/data/db";
import { phaseDetails, phaseOrder, type ScoutingPhase } from "@/data/match";
import { useAppState } from "@/hooks/useAppState";
import { cn } from "@/util";

export const Route = createFileRoute("/scouting/$matchId/edit")({
  component: Page,
});

function Page(): ReactNode {
  const { matchId } = Route.useParams();
  const match = useMatch(matchId);
  const navigate = Route.useNavigate();
  const { confirmDialogProps, openConfirmDialog } = useConfirmDialog();

  const getPhaseForm = (phase: ScoutingPhase) => {
    switch (phase) {
      case "preMatch":
        return (
          <PreMatch matchId={matchId} initialData={match?.phases.preMatch} />
        );
      case "auto":
        return <Auto matchId={matchId} initialData={match?.phases.auto} />;
      case "teleop":
        return <Teleop matchId={matchId} initialData={match?.phases.teleop} />;
      case "endgame":
        return (
          <Endgame matchId={matchId} initialData={match?.phases.endgame} />
        );
      case "postMatch":
        return (
          <PostMatch matchId={matchId} initialData={match?.phases.postMatch} />
        );
      default:
        return phase satisfies never;
    }
  };

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
    <div className="flex md:flex-col flex-col-reverse gap-y-6">
      <ConfirmDialog {...confirmDialogProps} />
      <div className="flex flex-col gap-y-6">
        {phaseOrder.map((phase) => {
          return (
            <Section key={phase} phase={phase}>
              {getPhaseForm(phase)}
            </Section>
          );
        })}
      </div>
      <div className="flex h-14 md:h-auto justify-between">
        <Button
          onClick={() => history.go(-1)}
          className="w-40 h-full font-normal"
        >
          {"< Back"}
        </Button>
        <Button
          variant="ghost"
          className="w-40 font-normal h-full text-red-500 hover:text-red-500 hover:bg-red-500/10"
          onClick={handleDelete}
        >
          Delete
        </Button>
      </div>
    </div>
  );
}

type SectionProps = {
  children: React.ReactNode;
  phase: ScoutingPhase;
};

function Section({ children, phase }: SectionProps): ReactNode {
  const { icon: Icon, title } = phaseDetails[phase];
  const { isPhaseValid, isPhaseSaving } = useAppState();

  return (
    <div
      className={cn(
        "gap-y-4 px-2 py-4 sm:p-6 border rounded-lg shadow-lg",
        isPhaseValid(phase) ? "border-green-500" : "border-red-500",
      )}
    >
      <div
        className={cn(
          "flex items-center space-x-2 text-green-500",
          isPhaseValid(phase) ? "text-green-500" : "text-red-500",
        )}
      >
        <Icon className="size-8" />
        <div className="text-3xl font-normal">{title}</div>
        <div
          className={cn(
            "ml-auto h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent",
            isPhaseSaving(phase) ? "visible" : "invisible",
          )}
        />
      </div>
      <div>{children}</div>
    </div>
  );
}
