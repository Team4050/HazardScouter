import { createFileRoute, redirect } from "@tanstack/react-router";
import { phaseRoutes } from "@/data/match";

export const Route = createFileRoute("/scouting/$matchId/collect/")({
  loader: ({ params }) =>
    redirect({ to: `/scouting/$matchId/collect/${phaseRoutes[0]}`, params }),
});
