import { Auto } from "@/components/form/Auto";
import { Endgame } from "@/components/form/Endgame";
import { PostMatch } from "@/components/form/PostMatch";
import { PreMatch } from "@/components/form/PreMatch";
import { Teleop } from "@/components/form/Teleop";
import { openDeleteModal } from "@/components/modals";
import { matchCollection, useMatch } from "@/data/db";
import { type ScoutingPhase, phaseDetails, phaseOrder } from "@/data/match";
import { useAppState } from "@/data/state";
import { cn } from "@/util";
import { Button, Loader, Paper } from "@mantine/core";
import { createFileRoute } from "@tanstack/react-router";
import type { ReactNode } from "react";

export const Route = createFileRoute("/scouting/$matchId/edit")({
  component: Page,
});

function Page(): ReactNode {
  const { matchId } = Route.useParams();
  const match = useMatch(matchId);
  const navigate = Route.useNavigate();
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
    }
  };

  return (
    <div className="grid grid-flow-row gap-y-6">
      {phaseOrder.map((phase) => {
        return (
          <Section key={phase} phase={phase}>
            {getPhaseForm(phase)}
          </Section>
        );
      })}
      <div className="flex">
        <Button
          onClick={() => history.go(-1)}
          size="compact-lg"
          className="w-40 font-normal"
        >
          {"< Back"}
        </Button>
        <Button
          color="red"
          size="compact-lg"
          variant="subtle"
          className="w-40 font-normal ml-auto"
          onClick={() => {
            openDeleteModal({
              onConfirm: () => {
                matchCollection.removeOne({ id: matchId });
                navigate({ to: "/scouting" });
              },
            });
          }}
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
    <>
      <Paper
        className={cn(
          "space-y-4 p-6",
          isPhaseValid(phase) ? "border-green-500" : "border-red-500",
        )}
        shadow="xl"
        withBorder
      >
        <div
          className={cn(
            "flex items-center space-x-2 text-green-500",
            isPhaseValid(phase) ? "text-green-500" : "text-red-500",
          )}
        >
          <Icon className="size-8" />
          <div className="text-3xl font-normal">{title}</div>
          <Loader
            size="sm"
            className={cn(
              "ml-auto",
              isPhaseSaving(phase) ? "visible" : "invisible",
            )}
          />
        </div>
        <div>{children}</div>
      </Paper>
    </>
  );
}
