import type { InputProps } from "@nextui-org/react";
import { Input as NUIInput } from "@nextui-org/react";
import type { FieldValues } from "react-hook-form";
import { Controller } from "react-hook-form";

import { cn } from "../../util";
import type { FieldProps } from "./props";

export default function Input<T extends FieldValues>({
  control,
  name,
  ...props
}: FieldProps<T, InputProps>): JSX.Element {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value, onChange, onBlur, disabled }, formState }) => {
        return (
          <NUIInput
            classNames={{
              inputWrapper: cn(
                formState.errors?.[name]?.message
                  ? "border-red-500"
                  : value
                    ? "border-green-500/70"
                    : null,
              ),
            }}
            {...props}
            name={name}
            isInvalid={!!formState.errors?.[name]?.message}
            // errorMessage={formState.errors?.[name]?.message?.toString()}
            value={value}
            onChange={(e) =>
              onChange(
                e.target.value && props.type === "number"
                  ? e.target.valueAsNumber
                  : e.target.value,
              )
            }
            onBlur={onBlur}
            disabled={disabled}
          />
        );
      }}
    />
  );
}
