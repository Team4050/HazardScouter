import type { ReactNode } from "react";
import { Counter, SegmentedControl } from "@/components/inputs";
import type { PhaseDataMap } from "@/data/db";
import { AutoClimb, autoDefaults, autoSchema } from "@/data/match";
import { useForm } from "@/hooks/useForm";
import { enumToSelectItem } from "@/util";

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
    <div className="flex flex-col mx-auto gap-8">
      <form.Field name="fuelScored">
        {(field) => (
          <Counter
            label="Fuel Scored"
            value={field.state.value}
            onChange={(val: number) => field.handleChange(val)}
          />
        )}
      </form.Field>
      <form.Field name="climb">
        {(field) => (
          <SegmentedControl
            label="Climb"
            data={enumToSelectItem(AutoClimb)}
            value={field.state.value}
            onChange={(val) => field.handleChange(val as AutoClimb)}
          />
        )}
      </form.Field>
    </div>
  );
}
