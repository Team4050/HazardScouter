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
      render={({
        field: { value, onChange, onBlur, disabled },
        fieldState: { error },
      }) => {
        return (
          <NUIInput
            classNames={{
              inputWrapper: cn(
                error ? "border-red-500" : value ? "border-green-500/70" : null,
              ),
            }}
            inputMode={props.type === "number" ? "numeric" : undefined}
            {...props}
            name={name}
            isInvalid={!!error}
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
