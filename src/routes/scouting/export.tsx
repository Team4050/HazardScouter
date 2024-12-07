import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/scouting/export")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/scouting/export"!</div>;
}
