import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/scouting/")({
  component: () => null,
  loader: () => {
    redirect({ to: "/scouting/$formPage", params: { formPage: "pre-match" } });
  },
});
