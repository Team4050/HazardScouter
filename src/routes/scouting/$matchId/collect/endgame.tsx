import { Endgame } from "@/components/form/Endgame";
import { useAppState } from "@/data/state";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/scouting/$matchId/collect/endgame")({
  beforeLoad: async () => {
    useAppState.getState().setMatchPhase("endgame");
  },
  component: Page,
});

function Page(): JSX.Element {
  const { matchId } = Route.useParams();
  return <Endgame matchId={matchId} />;
}
