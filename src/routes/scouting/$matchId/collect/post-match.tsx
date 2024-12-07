import { PostMatch } from "@/components/form/PostMatch";
import { useAppState } from "@/data/state";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/scouting/$matchId/collect/post-match")({
  beforeLoad: async () => {
    useAppState.getState().setMatchPhase("postMatch");
  },
  component: Page,
});

function Page(): JSX.Element {
  const { matchId } = Route.useParams();
  return <PostMatch matchId={matchId} />;
}
