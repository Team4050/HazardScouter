import { Teleop } from "@/components/form/Teleop";
import { useAppState } from "@/data/state";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/scouting/$matchId/collect/teleop")({
  beforeLoad: async () => {
    useAppState.getState().setMatchPhase("teleop");
  },
  component: Page,
});

function Page(): JSX.Element {
  const { matchId } = Route.useParams();
  return <Teleop matchId={matchId} />;
}
