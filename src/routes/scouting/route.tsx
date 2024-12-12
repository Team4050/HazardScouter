import { Outlet, createFileRoute } from "@tanstack/react-router";
import type { ReactNode } from "react";

export const Route = createFileRoute("/scouting")({
  component: Page,
});

function Page(): ReactNode {
  return (
    <div className="max-w-screen-lg mx-auto m-5">
      <Outlet />
    </div>
  );
}
