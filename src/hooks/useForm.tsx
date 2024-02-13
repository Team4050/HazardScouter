import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import {
  DefaultValues,
  FieldValues,
  UseFormReturn,
  useForm as useRhfForm,
} from "react-hook-form";
import { z } from "zod";

export default function useForm<
  T extends FieldValues,
  TSchema extends z.Schema,
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
    resolver: zodResolver(schema),
    defaultValues: defaultValues || {},
  });

  useEffect(() => {
    onChanged(form.formState.isValid);
  }, [onChanged, form.formState.isValid]);

  useEffect(() => {
    const watcher = form.watch((values) => {
      // TODO: Need to debounce?
      if (values && Object.values(values).every((v) => v !== undefined)) {
        setData(values as T);
      }
    });
    return () => watcher.unsubscribe();
  }, [form, setData]);

  return form;
}
