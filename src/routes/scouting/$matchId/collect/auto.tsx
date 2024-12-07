import { Auto } from "@/components/form/Auto";
import { useAppState } from "@/data/state";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/scouting/$matchId/collect/auto")({
  beforeLoad: async () => {
    useAppState.getState().setMatchPhase("auto");
  },
  component: Page,
});

function Page(): JSX.Element {
  const { matchId } = Route.useParams();
  return <Auto matchId={matchId} />;
}
