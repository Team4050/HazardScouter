import { Input, InputProps } from "@nextui-org/react";
import clsx from "clsx";
import { Control, Controller } from "react-hook-form";

type Props = {
  name: string;
  // eslint-disable-next-line
  control: Control<any, any>;
} & InputProps;

export default function FormInput({ name, ...props }: Props): JSX.Element {
  return (
    <Controller
      name={name}
      control={props.control}
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
                props.type === "number"
                  ? e.target.valueAsNumber
                  : e.target.value,
              )
            }
            onBlur={field.onBlur}
            disabled={field.disabled}
            classNames={{
              inputWrapper: clsx(
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
