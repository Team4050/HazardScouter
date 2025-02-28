import { openDeleteModal } from "@/components/modals";
import { matchCollection, useMatch } from "@/data/db";
import { phaseDetails, phaseOrder } from "@/data/match";
import { useIsMobile } from "@/hooks/useIsMobile";
import { cn } from "@/util";
import { CodeHighlight } from "@mantine/code-highlight";
import { Button, Timeline } from "@mantine/core";
import { createFileRoute, useRouter } from "@tanstack/react-router";
import type { ReactNode } from "react";

export const Route = createFileRoute("/scouting/$matchId/review")({
  component: Page,
});

function Page(): ReactNode {
  const { matchId } = Route.useParams();
  const match = useMatch(matchId);
  const { history } = useRouter();
  const navigate = Route.useNavigate();
  const isMobile = useIsMobile();

  if (!match) return null;

  const { phases, ...metadata } = match;

  return (
    <>
      <div className="max-w-2xl mx-auto gap-y-6 flex md:flex-col flex-col-reverse">
        <Timeline
          active={Object.keys(phases).length}
          bulletSize={30}
          radius="xs"
          classNames={{
            root: isMobile ? "pl-2 ml-1" : undefined,
            item: isMobile ? "pl-2" : undefined,
          }}
        >
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

        <div className="flex md:h-auto h-14">
          <Button
            onClick={() => history.go(-1)}
            size="compact-lg"
            className="w-40 h-full font-normal"
          >
            {"< Back"}
          </Button>
          <Button
            color="red"
            size="compact-lg"
            variant="subtle"
            className="w-40 h-full font-normal ml-auto"
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
function RenderObject({ obj }: { obj?: any }): ReactNode {
  return (
    <CodeHighlight
      code={obj ? JSON.stringify(obj, null, 2) : "// No data"}
      language="json"
      withCopyButton={false}
    />
  );
}
