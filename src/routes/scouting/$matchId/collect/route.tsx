import { FormNavigation } from "@/components/form/Navigation";
import { Outlet, createFileRoute } from "@tanstack/react-router";
import type { ReactNode } from "react";

export const Route = createFileRoute("/scouting/$matchId/collect")({
  component: Page,
});

function Page(): ReactNode {
  const { matchId } = Route.useParams();
  return (
    <div className="flex md:flex-col flex-col-reverse gap-y-4">
      <Outlet />
      <FormNavigation matchId={matchId} />
    </div>
  );
}
