import { Select, Switch } from "@/components/inputs";
import { matchCollection } from "@/data/db";
import {
  type EndGame,
  EndStatus,
  endGameDefaults,
  endGameSchema,
} from "@/data/match/2024";
import { useAppState } from "@/data/state";
import { useForm } from "@/hooks/useForm";
import { enumToSelectItem } from "@/util";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/scouting/$matchId/endgame")({
  beforeLoad: async () => {
    useAppState.getState().setMatchPhase("endgame");
  },
  component: Page,
});

function Page(): JSX.Element {
  const { matchId } = Route.useParams();
  const form = useForm<EndGame>({
    initialValues:
      matchCollection.findOne({ id: matchId })?.phases.endgame ||
      endGameDefaults,
    schema: endGameSchema,
  });

  return (
    <div className="grid gap-x-4 gap-y-2">
      <Select
        className="w-fit mx-auto"
        label="End Status"
        data={enumToSelectItem(EndStatus)}
        {...form.getInputProps("endStatus")}
      />
      <Switch
        label="Trap"
        {...form.getInputProps("trap", { type: "checkbox" })}
      />
    </div>
  );
}
