import type { ReactNode } from "react";
import { Slider } from "@/components/inputs";
import type { PhaseDataMap } from "@/data/db";
import { endGameDefaults, endGameSchema } from "@/data/match";
import { useForm } from "@/hooks/useForm";

type Props = {
  matchId: string;
  initialData?: PhaseDataMap["endgame"];
};

export function Endgame({ matchId, initialData }: Props): ReactNode {
  const form = useForm<"endgame">({
    matchId,
    phase: "endgame",
    initialValues: initialData || endGameDefaults,
    schema: endGameSchema,
  });

  return (
    <div className="grid gap-x-4 gap-y-2">
      <form.Field name="climbLevel">
        {(field) => (
          <Slider
            label="Climb Level"
            min={0}
            max={3}
            value={field.state.value}
            onChange={(val: number) => field.handleChange(val)}
          />
        )}
      </form.Field>
    </div>
  );
}
