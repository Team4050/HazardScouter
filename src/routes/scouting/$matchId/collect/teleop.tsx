import { createFileRoute } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { Teleop } from "@/components/form/Teleop";
import { useMatch } from "@/data/db";

export const Route = createFileRoute("/scouting/$matchId/collect/teleop")({
  component: Page,
});

function Page(): ReactNode {
  const { matchId } = Route.useParams();
  const match = useMatch(matchId);
  return <Teleop matchId={matchId} initialData={match?.phases.teleop} />;
}
