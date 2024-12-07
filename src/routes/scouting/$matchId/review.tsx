import { openDeleteModal } from "@/components/modals";
import { matchCollection, useMatch } from "@/data/db";
import { phaseDetails, phaseOrder } from "@/data/match";
import { cn } from "@/util";
import { CodeHighlight } from "@mantine/code-highlight";
import { Button, Timeline } from "@mantine/core";
import { createFileRoute, useRouter } from "@tanstack/react-router";

export const Route = createFileRoute("/scouting/$matchId/review")({
  component: Page,
});

function Page(): JSX.Element | null {
  const { matchId } = Route.useParams();
  const match = useMatch(matchId);
  const { history } = useRouter();
  const navigate = Route.useNavigate();

  if (!match) return null;

  const { phases, ...metadata } = match;

  return (
    <>
      <div className="max-w-2xl mx-auto space-y-6">
        <Timeline active={Object.keys(phases).length} bulletSize={30}>
          <Timeline.Item title="Metadata">
            <RenderObject obj={metadata} />
          </Timeline.Item>
          {phaseOrder.map((phase) => {
            const { title, icon: Icon } = phaseDetails[phase];
            const data = phases[phase];

            return (
              <Timeline.Item
                key={phase}
                title={title}
                bullet={<Icon />}
                classNames={{
                  itemTitle: cn(data === undefined ? "opacity-50" : null),
                }}
              >
                <RenderObject obj={data} />
              </Timeline.Item>
            );
          })}
        </Timeline>

        <div className="flex">
          <Button
            onClick={() => history.go(-1)}
            size="compact-lg"
            className="w-40 font-normal"
          >
            {"< Back"}
          </Button>
          <Button
            color="red"
            size="compact-lg"
            variant="subtle"
            className="w-40 font-normal ml-auto"
            onClick={() => {
              openDeleteModal({
                onConfirm: () => {
                  matchCollection.removeOne({ id: matchId });
                  navigate({ to: "/scouting" });
                },
              });
            }}
          >
            Delete
          </Button>
        </div>
      </div>
    </>
  );
}

// biome-ignore lint/suspicious/noExplicitAny: We don't really care about the type here
function RenderObject({ obj }: { obj?: any }): JSX.Element {
  return (
    <CodeHighlight
      code={obj ? JSON.stringify(obj, null, 2) : "// No data"}
      language="json"
      withCopyButton={false}
    />
  );
}
