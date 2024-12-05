import { phaseRoutes } from "@/data/match";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/scouting/$matchId/collect/")({
  loader: ({ params }) =>
    redirect({ to: `/scouting/$matchId/collect/${phaseRoutes[0]}`, params }),
});
