import { useLiveQuery } from "@tanstack/react-db";
import { createLazyFileRoute } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { JsonView } from "@/components/JsonView";
import { matchCollection } from "@/data/db";

export const Route = createLazyFileRoute("/debug")({
  component: Page,
});

function Page(): ReactNode {
  const { data } = useLiveQuery(() => matchCollection);

  return (
    <div className="min-h-screen bg-gray-950 text-white p-2">
      <div className="flex justify-end px-1 mb-1">
        <span className="flex items-center gap-1.5 text-xs text-gray-400">
          <span className="inline-block w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          Live
        </span>
      </div>

      {data?.length ? (
        <JsonView value={data} />
      ) : (
        <div className="text-center text-gray-500 py-8 text-xs">No matches</div>
      )}
    </div>
  );
}
