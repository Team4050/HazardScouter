import { matchCollection } from "@/data/db";
import { Button } from "@mantine/core";
import { createFileRoute, notFound, useRouter } from "@tanstack/react-router";
import type { ReactNode } from "react";

export const Route = createFileRoute("/scouting/$matchId")({
  loader: async ({ params: { matchId } }) => {
    if (matchCollection.findOne({ id: matchId }) === undefined) {
      throw notFound();
    }
  },
  notFoundComponent: NotFound,
});

function NotFound(): ReactNode {
  const { matchId } = Route.useParams();
  const { history } = useRouter();

  return (
    <div className="flex flex-col items-center space-y-5">
      <div>Match '{matchId}' not found...</div>
      <Button onClick={() => history.go(-1)}>{"< Go Back"}</Button>
    </div>
  );
}
