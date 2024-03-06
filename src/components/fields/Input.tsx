import { Input, InputProps } from "@nextui-org/react";
import type { FieldValues } from "react-hook-form";
import { Controller } from "react-hook-form";

import { cn } from "../../util";
import type { FieldProps } from "./props";

export default function Text<T extends FieldValues>({
  control,
  name,
  ...props
}: FieldProps<T, InputProps>): JSX.Element {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, formState }) => {
        return (
          <Input
            {...props}
            name={field.name}
            isInvalid={!!formState.errors?.[name]?.message}
            // errorMessage={formState.errors?.[name]?.message?.toString()}
            value={field.value}
            onChange={(e) =>
              field.onChange(
                e.target.value && props.type === "number"
                  ? e.target.valueAsNumber
                  : e.target.value,
              )
            }
            onBlur={field.onBlur}
            disabled={field.disabled}
            classNames={{
              inputWrapper: cn(
                formState.errors?.[name]?.message
                  ? "border-red-500"
                  : field.value
                    ? "border-green-500/70"
                    : null,
              ),
            }}
          />
        );
      }}
    />
  );
}
