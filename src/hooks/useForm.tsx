import { useAppState } from "@/data/state";
import { type UseFormReturnType, useForm as useFormM } from "@mantine/form";
import { valibotResolver } from "mantine-form-valibot-resolver";
import type { BaseSchema } from "valibot";

type Props<T> = {
  initialValues: T;
  schema: BaseSchema<T, T, any>;
  onValid: (values: T) => void;
};

export function useForm<T extends Record<string, any>>({
  initialValues,
  schema,
  onValid,
}: Props<T>): UseFormReturnType<T> {
  const setFormValid = useAppState((state) => state.setCurrentFormValid);

  return useFormM<T>({
    mode: "uncontrolled",
    initialValues,
    validateInputOnBlur: true,
    validate: (values) => {
      const errors = valibotResolver(schema)(values);

      if (Object.keys(errors).length === 0) {
        setFormValid(true);
        onValid(values);
      } else {
        setFormValid(false);
      }

      return errors;
    },
  });
}
