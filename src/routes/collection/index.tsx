import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/collection/")({
  loader: () =>
    redirect({
      to: "/collection/$year/$formPage",
      params: { year: "2024", formPage: "1" },
    }),
});
