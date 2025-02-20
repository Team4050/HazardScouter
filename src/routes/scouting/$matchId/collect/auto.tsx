import { Auto } from "@/components/form/Auto";
import { useMatch } from "@/data/db";
import { useAppState } from "@/data/state";
import { createFileRoute } from "@tanstack/react-router";
import type { ReactNode } from "react";

export const Route = createFileRoute("/scouting/$matchId/collect/auto")({
  beforeLoad: async () => {
    useAppState.getState().setMatchPhase("auto");
  },
  component: Page,
});

function Page(): ReactNode {
  const { matchId } = Route.useParams();
  const match = useMatch(matchId);
  return <Auto matchId={matchId} initialData={match?.phases.auto} />;
}
