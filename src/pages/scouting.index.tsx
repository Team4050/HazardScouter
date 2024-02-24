import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/scouting/")({
  loader: () => redirect({ to: "/scouting/pre-match" }),
});
