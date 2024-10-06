import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/scouting/_form/auto")({
  component: () => <div>Hello /scouting/auto!</div>,
});
