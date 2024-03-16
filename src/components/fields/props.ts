import type { Control, FieldPath, FieldValues } from "react-hook-form";

export type FieldProps<
  TFieldValues extends FieldValues,
  CT,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = Omit<CT, "name"> & {
  control: Control<TFieldValues, object>;
  name: TName;
};
