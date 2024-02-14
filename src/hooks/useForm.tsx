import { valibotResolver } from "@hookform/resolvers/valibot";
import { useEffect } from "react";
import {
  DefaultValues,
  FieldValues,
  UseFormReturn,
  useForm as useRhfForm,
} from "react-hook-form";
import { BaseSchema } from "valibot";

export default function useForm<
  T extends FieldValues,
  TSchema extends BaseSchema,
>({
  setData,
  onChanged,
  defaultValues,
  schema,
}: {
  setData: (data: T) => void;
  onChanged: (valid: boolean) => void;
  defaultValues: DefaultValues<T>;
  schema: TSchema;
}): UseFormReturn<T> {
  const form = useRhfForm<T>({
    mode: "onChange",
    resolver: valibotResolver(schema),
    defaultValues: defaultValues || {},
  });

  const {
    formState: { isValid },
    watch,
  } = form;

  useEffect(() => {
    onChanged(isValid);
  }, [onChanged, isValid]);

  useEffect(() => {
    const watcher = watch((values) => {
      // TODO: Need to debounce?
      if (values && Object.values(values).every((v) => v !== undefined)) {
        setData(values as T);
      }
    });
    return () => watcher.unsubscribe();
  }, [watch, setData]);

  return form;
}
