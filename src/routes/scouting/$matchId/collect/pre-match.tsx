import { PreMatch } from "@/components/form/PreMatch";
import { useAppState } from "@/data/state";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/scouting/$matchId/collect/pre-match")({
  component: Page,
  beforeLoad: () => {
    useAppState.getState().setMatchPhase("preMatch");
  },
});

function Page(): JSX.Element {
  const { matchId } = Route.useParams();
  return <PreMatch matchId={matchId} />;
}
