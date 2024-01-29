import { Input, InputProps } from "@nextui-org/react";
import { Control, Controller } from "react-hook-form";

export type Props = {
  name: string;
  // biome-ignore lint:
  control: Control<any, any>;
} & InputProps;

export default function FormInput({
  name,
  placeholder,
  ...props
}: Props): JSX.Element {
  return (
    <Controller
      name={name}
      control={props.control}
      render={({ field, formState }) => {
        return (
          <Input
            {...props}
            placeholder=" " // TODO: Hack until https://github.com/nextui-org/nextui/issues/2268 is fixed
            isInvalid={!!formState.errors?.[name]?.message}
            errorMessage={formState.errors?.[name]?.message?.toString()}
            value={field.value}
            onChange={field.onChange}
          />
        );
      }}
    />
  );
}
