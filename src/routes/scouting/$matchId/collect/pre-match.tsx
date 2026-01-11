import { createFileRoute } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { PreMatch } from "@/components/form/PreMatch";
import { useMatch } from "@/data/db";

export const Route = createFileRoute("/scouting/$matchId/collect/pre-match")({
  component: Page,
});

function Page(): ReactNode {
  const { matchId } = Route.useParams();
  const match = useMatch(matchId);
  return <PreMatch matchId={matchId} initialData={match?.phases.preMatch} />;
}
