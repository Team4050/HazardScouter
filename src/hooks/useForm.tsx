import { useFormContext } from "@/providers/Form";
import { type UseFormReturnType, useForm as useFormM } from "@mantine/form";
import { useDebouncedCallback } from "@mantine/hooks";
import { valibotResolver } from "mantine-form-valibot-resolver";
import type { BaseSchema } from "valibot";

type Props<T> = {
  initialValues: T;
  schema: BaseSchema<T, T, any>;
  save?: (values: T) => void;
};

export function useForm<T extends Record<string, any>>({
  initialValues,
  schema,
  save,
}: Props<T>): UseFormReturnType<T> {
  const { setCurrentPageValid } = useFormContext();

  const debouncedSetValid = useDebouncedCallback(
    (isValid: boolean) => setCurrentPageValid(isValid),
    300,
  );

  const debouncedSave = useDebouncedCallback(
    (values: T) => save?.(values),
    300,
  );

  const form = useFormM<T>({
    mode: "uncontrolled",
    initialValues,
    validateInputOnChange: true,
    validate: (values) => {
      const errors = valibotResolver(schema)(values);
      const isValid = Object.keys(errors).length === 0;
      debouncedSetValid(isValid);
      if (isValid) {
        debouncedSave(values);
      }
      return errors;
    },
  });

  return form;
}
