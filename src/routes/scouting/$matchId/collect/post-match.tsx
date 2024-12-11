import { PostMatch } from "@/components/form/PostMatch";
import { useMatch } from "@/data/db";
import { useAppState } from "@/data/state";
import { createFileRoute } from "@tanstack/react-router";
import type { ReactNode } from "react";

export const Route = createFileRoute("/scouting/$matchId/collect/post-match")({
  beforeLoad: async () => {
    useAppState.getState().setMatchPhase("postMatch");
  },
  component: Page,
});

function Page(): ReactNode {
  const { matchId } = Route.useParams();
  const match = useMatch(matchId);
  return <PostMatch matchId={matchId} initialData={match?.phases.postMatch} />;
}
