import { Counter, Switch } from "@/components/inputs";
import { matchCollection } from "@/data/db";
import { type Auto, autoDefaults, autoSchema } from "@/data/match/2024";
import { useAppState } from "@/data/state";
import { useForm } from "@/hooks/useForm";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/scouting/$matchId/auto")({
  beforeLoad: async () => {
    useAppState.getState().setMatchPhase("auto");
  },
  component: Page,
});

function Page(): JSX.Element {
  const { matchId } = Route.useParams();

  const form = useForm<Auto>({
    initialValues:
      matchCollection.findOne({ id: matchId })?.phases.auto?.data ||
      autoDefaults,
    schema: autoSchema,
  });

  return (
    <div className="grid gap-x-4 gap-y-2">
      <Switch
        label="Left starting zone"
        {...form.getInputProps("leaveStartingZone", { type: "checkbox" })}
      />
      <Counter label="Amp Scores" {...form.getInputProps("ampScores")} />
      <Counter
        label="Speaker Scores"
        {...form.getInputProps("speakerScores")}
      />
    </div>
  );
}
