import { createFileRoute, Outlet } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { FormNavigation } from "@/components/form/Navigation";

export const Route = createFileRoute("/scouting/$matchId/collect")({
  component: Page,
});

function Page(): ReactNode {
  const { matchId } = Route.useParams();
  return (
    <div className="flex md:flex-col flex-col-reverse gap-y-8 mt-4">
      <Outlet />
      <FormNavigation matchId={matchId} />
    </div>
  );
}
