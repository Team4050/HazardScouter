import { FormNavigation } from "@/components/form/Navigation";
import { Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/scouting/$matchId/collect")({
  component: Page,
});

function Page(): JSX.Element {
  const { matchId } = Route.useParams();
  return (
    <>
      <Outlet />
      <FormNavigation matchId={matchId} />
    </>
  );
}
