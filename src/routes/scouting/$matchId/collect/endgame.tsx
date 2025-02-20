import { Endgame } from "@/components/form/Endgame";
import { useMatch } from "@/data/db";
import { useAppState } from "@/data/state";
import { createFileRoute } from "@tanstack/react-router";
import type { ReactNode } from "react";

export const Route = createFileRoute("/scouting/$matchId/collect/endgame")({
  beforeLoad: async () => {
    useAppState.getState().setMatchPhase("endgame");
  },
  component: Page,
});

function Page(): ReactNode {
  const { matchId } = Route.useParams();
  const match = useMatch(matchId);
  return <Endgame matchId={matchId} initialData={match?.phases.endgame} />;
}
