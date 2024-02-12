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

  const {
    formState: { isValid },
    watch,
  } = form;

  useEffect(() => {
    onChanged(isValid);
  }, [isValid, onChanged]);

  useEffect(() => {
    const watcher = watch((value) => {
      if (Object.values(value).every((v) => v !== undefined)) {
        setData(value as T);
      }
    });
    return () => watcher.unsubscribe();
  }, [watch, setData]);

  return form;
}
