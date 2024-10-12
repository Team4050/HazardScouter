import { Select, Switch } from "@/components/mantine";
import { endgameCollection, set } from "@/data/db";
import {
  type EndGame,
  EndStatus,
  endGameDefaults,
  endGameSchema,
} from "@/data/games/2024";
import { useAppState } from "@/data/state";
import { useForm } from "@/hooks/useForm";
import { enumToSelectItem } from "@/util";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/scouting/_form/endgame")({
  beforeLoad: async () => {
    if (useAppState.getState().collectionId === undefined) {
      throw redirect({ to: "/scouting/pre-match" });
    }
    useAppState.getState().setPageName("End Game");
  },
  component: Page,
});

function Page(): JSX.Element {
  const collectionId = useAppState((state) => state.collectionId);

  if (!collectionId) {
    throw new Error("Collection ID not set");
  }

  const form = useForm<EndGame>({
    initialValues:
      endgameCollection.findOne({ id: collectionId }) || endGameDefaults,
    schema: endGameSchema,
    onValid: (values) => {
      set(endgameCollection, collectionId, values);
    },
  });

  return (
    <div className="grid gap-x-4 gap-y-2">
      <Select
        className="w-fit mx-auto"
        label="End Status"
        data={enumToSelectItem(EndStatus)}
        {...form.getInputProps("endStatus")}
      />
      <Switch label="Trap" {...form.getInputProps("trap")} />
    </div>
  );
}
