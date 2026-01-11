import { createFileRoute } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { Endgame } from "@/components/form/Endgame";
import { useMatch } from "@/data/db";

export const Route = createFileRoute("/scouting/$matchId/collect/endgame")({
  component: Page,
});

function Page(): ReactNode {
  const { matchId } = Route.useParams();
  const match = useMatch(matchId);
  return <Endgame matchId={matchId} initialData={match?.phases.endgame} />;
}
