import { useForm as useTanStackForm } from "@tanstack/react-form";
import { useCallback, useEffect, useRef } from "react";
import { useDebounceCallback } from "usehooks-ts";
import type { BaseSchema } from "valibot";
import { safeParse } from "valibot";
import { type PhaseDataMap, setScoutingPhaseData } from "@/data/db";
import type { ScoutingPhase } from "@/data/match";
import { useAppState } from "@/hooks/useAppState";

type Props<T extends ScoutingPhase> = {
  matchId: string;
  phase: T;
  initialValues: PhaseDataMap[T];
  // biome-ignore lint/suspicious/noExplicitAny: Schema types vary
  schema: BaseSchema<PhaseDataMap[T], PhaseDataMap[T], any>;
};

export function useForm<T extends ScoutingPhase>({
  initialValues,
  schema,
  matchId,
  phase,
}: Props<T>) {
  const { setPhaseSaving, setPhaseValid } = useAppState();
  const initialValidationDone = useRef(false);

  const debouncedSetValid = useDebounceCallback(
    (isValid: boolean) => setPhaseValid(phase, isValid),
    300,
  );

  const debouncedSave = useDebounceCallback((values: PhaseDataMap[T]) => {
    setScoutingPhaseData(matchId, phase, values);
    setPhaseSaving(phase, false);
  }, 300);

  const form = useTanStackForm({
    defaultValues: initialValues,
    validators: {
      onChange: ({ value }) => {
        const result = safeParse(schema, value);
        if (!result.success) {
          return result.issues[0]?.message || "Validation failed";
        }
        return undefined;
      },
    },
    onSubmit: async ({ value }) => {
      setScoutingPhaseData(matchId, phase, value);
    },
  });

  // Handle auto-save on valid changes
  const handleValuesChange = useCallback(
    (values: PhaseDataMap[T], isValid: boolean) => {
      debouncedSetValid(isValid);
      if (isValid) {
        setPhaseSaving(phase, true);
        debouncedSave(values);
      }
    },
    [debouncedSetValid, setPhaseSaving, phase, debouncedSave],
  );

  // Run initial validation on mount
  useEffect(() => {
    if (!initialValidationDone.current) {
      initialValidationDone.current = true;
      setTimeout(() => {
        const result = safeParse(schema, initialValues);
        setPhaseValid(phase, result.success);
      }, 0);
    }
  }, [schema, initialValues, phase, setPhaseValid]);

  // Subscribe to form state changes
  useEffect(() => {
    const unsubscribe = form.store.subscribe(() => {
      const state = form.store.state;
      if (state.isTouched) {
        const result = safeParse(schema, state.values);
        handleValuesChange(state.values, result.success);
      }
    });
    return unsubscribe;
  }, [form, handleValuesChange, schema]);

  return form;
}
