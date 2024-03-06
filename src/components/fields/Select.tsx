import {
  Select as NUISelect,
  SelectItem,
  SelectProps,
} from "@nextui-org/react";
import type { FieldValues } from "react-hook-form";
import { Controller } from "react-hook-form";

import { cn } from "../../util";
import type { FieldProps } from "./props";

type Props<T extends FieldValues> = FieldProps<
  T,
  Omit<SelectProps, "children">
> & {
  items: {
    key: string;
    label: string;
  }[];
};

export default function Select<T extends FieldValues>({
  control,
  name,
  items,
  ...props
}: Props<T>): JSX.Element {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange }, formState: { dirtyFields } }) => (
        <NUISelect
          {...props}
          selectedKeys={[value]}
          onChange={(e) => onChange(e.target.value)}
          classNames={{
            trigger: cn(
              dirtyFields[name] === true
                ? "border-green-500/70 border-2"
                : null,
            ),
          }}
          items={items}
        >
          {(item) => <SelectItem key={item.key}>{item.label}</SelectItem>}
        </NUISelect>
      )}
    />
  );
}
