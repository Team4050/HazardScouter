import { Counter, Switch } from "@/components/inputs";
import { matchCollection } from "@/data/db";
import { autoDefaults, autoSchema } from "@/data/match";
import { useForm } from "@/hooks/useForm";

export function Auto({ matchId }: { matchId: string }): JSX.Element {
  const form = useForm<"auto">({
    matchId,
    phase: "auto",
    initialValues:
      matchCollection.findOne({ id: matchId })?.phases.auto || autoDefaults,
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
