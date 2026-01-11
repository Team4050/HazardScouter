import { createFileRoute } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { PostMatch } from "@/components/form/PostMatch";
import { useMatch } from "@/data/db";

export const Route = createFileRoute("/scouting/$matchId/collect/post-match")({
  component: Page,
});

function Page(): ReactNode {
  const { matchId } = Route.useParams();
  const match = useMatch(matchId);
  return <PostMatch matchId={matchId} initialData={match?.phases.postMatch} />;
}
