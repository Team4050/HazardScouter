import { type PhaseDataMap, setScoutingPhaseData } from "@/data/db";
import type { ScoutingPhase } from "@/data/match";
import { useAppState } from "@/data/state";
import { type UseFormReturnType, useForm as useFormM } from "@mantine/form";
import { useDebouncedCallback } from "@mantine/hooks";
import { valibotResolver } from "mantine-form-valibot-resolver";
import { useEffect } from "react";
import type { BaseSchema } from "valibot";

type Props<T extends ScoutingPhase> = {
  matchId: string;
  phase: T;
  initialValues: PhaseDataMap[T];
  schema: BaseSchema<PhaseDataMap[T], PhaseDataMap[T], any>;
};

export function useForm<T extends ScoutingPhase>({
  initialValues,
  schema,
  matchId,
  phase,
}: Props<T>): UseFormReturnType<typeof initialValues> {
  type TV = typeof initialValues;

  const { setPhaseSaving, setPhaseValid } = useAppState();

  const debouncedSetValid = useDebouncedCallback(
    (isValid: boolean) => setPhaseValid(phase, isValid),
    300,
  );

  const debouncedSave = useDebouncedCallback((values: TV) => {
    setScoutingPhaseData(matchId, phase, values);
    setPhaseSaving(phase, false);
  }, 300);

  const form = useFormM<TV>({
    mode: "uncontrolled",
    initialValues,
    validateInputOnChange: true,
    validate: (values) => {
      const errors = valibotResolver(schema)(values);
      const isValid = Object.keys(errors).length === 0;
      debouncedSetValid(isValid);
      if (isValid) {
        setPhaseSaving(phase, true);
        debouncedSave(values);
      }
      return errors;
    },
  });

  // biome-ignore lint: We only want this effect to run when the hook mounts
  useEffect(() => {
    form.validate();
  }, []);

  return form;
}
