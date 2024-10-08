import { Counter } from "@/components/Counter";
import { Switch } from "@/components/mantine";
import { autoCollection, set } from "@/data/db";
import { type Auto, autoDefaults, autoSchema } from "@/data/games/2024";
import { useAppState } from "@/data/state";
import { useForm } from "@/hooks/useForm";
import { IconCheck, IconX } from "@tabler/icons-react";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/scouting/_form/auto")({
  beforeLoad: async () => {
    if (useAppState.getState().collectionId === undefined) {
      throw redirect({ to: "/scouting/pre-match" });
    }
    useAppState.getState().setPageName("Autonomous");
  },
  component: Page,
});

function Page(): JSX.Element {
  const collectionId = useAppState((state) => state.collectionId);

  if (!collectionId) {
    throw new Error("Collection ID not set");
  }

  const form = useForm<Auto>({
    initialValues: autoCollection.findOne({ id: collectionId }) || autoDefaults,
    schema: autoSchema,
    onValid: (values) => {
      set(autoCollection, collectionId, values);
    },
  });

  return (
    <div className="grid gap-x-4 gap-y-2">
      <Switch
        label="Left starting zone"
        thumbIcon={
          form.getValues().leaveStartingZone ? <IconCheck /> : <IconX />
        }
        {...form.getInputProps("leaveStartingZone")}
      />
      <Counter label="Amp Scores" {...form.getInputProps("ampScores")} />
      <Counter
        label="Speaker Scores"
        {...form.getInputProps("speakerScores")}
      />
    </div>
  );
}
