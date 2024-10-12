import { Counter } from "@/components/Counter";
import { Select } from "@/components/mantine";
import { set, teleopCollection } from "@/data/db";
import {
  PickupType,
  type Teleop,
  teleopDefaults,
  teleopSchema,
} from "@/data/games/2024";
import { useAppState } from "@/data/state";
import { useForm } from "@/hooks/useForm";
import { enumToSelectItem } from "@/util";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/scouting/_form/teleop")({
  beforeLoad: async () => {
    if (useAppState.getState().collectionId === undefined) {
      throw redirect({ to: "/scouting/pre-match" });
    }
    useAppState.getState().setPageName("Teleop");
  },
  component: Page,
});

function Page(): JSX.Element {
  const collectionId = useAppState((state) => state.collectionId);

  if (!collectionId) {
    throw new Error("Collection ID not set");
  }

  const form = useForm<Teleop>({
    initialValues:
      teleopCollection.findOne({ id: collectionId }) || teleopDefaults,
    schema: teleopSchema,
    onValid: (values) => {
      set(teleopCollection, collectionId, values);
    },
  });

  return (
    <div className="grid gap-x-4 gap-y-2">
      <Counter label="Amp Scores" {...form.getInputProps("ampScores")} />
      <Counter
        label="Speaker Scores"
        {...form.getInputProps("speakerScores")}
      />
      <Counter
        label="Times Amplified"
        {...form.getInputProps("timesAmplified")}
      />
      <Select
        label="Pickup Type"
        className="w-fit mx-auto"
        data={enumToSelectItem(PickupType)}
      />
    </div>
  );
}
