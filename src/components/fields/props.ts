import type { Control, FieldValues, Path } from "react-hook-form";

export type FieldProps<T extends FieldValues, CT> = Omit<CT, "name"> & {
  control: Control<T, object>;
  name: Path<T>;
};
