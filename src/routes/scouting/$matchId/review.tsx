import { useMatch } from "@/data/db";
import { scoutingPhaseName } from "@/data/match";
import { titleCase } from "@/util";
import { Paper } from "@mantine/core";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/scouting/$matchId/review")({
  component: Page,
});

function Page(): JSX.Element | null {
  const { matchId } = Route.useParams();
  const match = useMatch(matchId);

  if (!match) return null;

  const { phases, ...metadata } = match;

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Paper shadow="sm" p="md" radius="md">
        <h2 className="text-2xl mb-4">Match Details</h2>
        <div className="grid grid-cols-2 gap-4">
          {Object.entries(metadata).map(([key, value]) => (
            <div key={key} className="flex justify-between">
              <span className="font-medium">{titleCase(key)}:</span>
              <span>
                {value instanceof Date ? value.toLocaleString() : String(value)}
              </span>
            </div>
          ))}
        </div>
      </Paper>

      {Object.entries(phases).map(([phase, data]) => (
        <Paper key={phase} shadow="sm" p="md" radius="md">
          <h2 className="text-2xl mb-4">{scoutingPhaseName(phase as any)}</h2>
          <div className="grid grid-cols-2 gap-4">
            {Object.entries(data || {}).map(([key, value]) => (
              <div key={key} className="flex justify-between">
                <span className="font-medium">{titleCase(key)}:</span>
                <span>
                  {typeof value === "boolean"
                    ? value
                      ? "Yes"
                      : "No"
                    : String(value)}
                </span>
              </div>
            ))}
          </div>
        </Paper>
      ))}
    </div>
  );
}
