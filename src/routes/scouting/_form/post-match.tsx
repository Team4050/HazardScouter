import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/scouting/_form/post-match")({
  component: () => <div>Hello /scouting/post-match!</div>,
});
