import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/scouting/_form/teleop")({
  component: () => <div>Hello /scouting/teleop!</div>,
});
