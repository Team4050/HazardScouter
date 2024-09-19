import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/collection/")({
  loader: () =>
    redirect({
      to: "/collection/$year",
      params: { year: "2024" },
    }),
});
