import { FormNavigation } from "@/components/form/Navigation";
import { Outlet, createFileRoute } from "@tanstack/react-router";
import type { ReactNode } from "react";

export const Route = createFileRoute("/scouting/$matchId/collect")({
  component: Page,
});

function Page(): ReactNode {
  const { matchId } = Route.useParams();
  return (
    <>
      <Outlet />
      <FormNavigation matchId={matchId} />
    </>
  );
}
