import { Counter, Switch } from "@/components/inputs";
import type { PhaseDataMap } from "@/data/db";
import { autoDefaults, autoSchema } from "@/data/match";
import { useForm } from "@/hooks/useForm";
import type { ReactNode } from "react";

type Props = {
  matchId: string;
  initialData?: PhaseDataMap["auto"];
};

export function Auto({ matchId, initialData }: Props): ReactNode {
  const form = useForm<"auto">({
    matchId,
    phase: "auto",
    initialValues: initialData || autoDefaults,
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
