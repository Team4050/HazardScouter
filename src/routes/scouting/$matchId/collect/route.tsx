import { createFileRoute, Outlet } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { FormNavigation, NAV_HEIGHT } from "@/components/form/Navigation";

export const Route = createFileRoute("/scouting/$matchId/collect")({
  component: Page,
});

function Page(): ReactNode {
  const { matchId } = Route.useParams();
  return (
    <div className="flex flex-col gap-y-8 mt-4">
      <Outlet />
      {/* Spacer so mobile floating nav doesn't cover content */}
      <div className="md:hidden" style={{ height: NAV_HEIGHT }} />
      <FormNavigation matchId={matchId} />
    </div>
  );
}
