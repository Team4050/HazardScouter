import { CheckIcon, XMarkIcon } from "@heroicons/react/20/solid";
import type { SwitchProps } from "@nextui-org/react";
import { Switch as NUISwitch } from "@nextui-org/react";
import type { FieldValues } from "react-hook-form";
import { Controller } from "react-hook-form";

import { cn } from "../../util";
import type { FieldProps } from "./props";

type Props<T extends FieldValues> = FieldProps<
  T,
  Omit<SwitchProps, "classNames">
> & {
  label: string;
  classNames?: {
    label?: string;
    container?: string;
  };
};

export function Switch<T extends FieldValues>({
  control,
  name,
  classNames,
  label,
  ...props
}: Props<T>): JSX.Element {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange } }) => (
        <div className={cn("flex flex-col space-y-2", classNames?.container)}>
          <div className={cn("my-auto text-lg", classNames?.label)}>
            {label}
          </div>
          <NUISwitch
            className="mx-auto"
            classNames={{
              wrapper: cn(value ? "bg-green-500" : "bg-red-500"),
            }}
            startContent={<CheckIcon />}
            endContent={<XMarkIcon />}
            size="lg"
            {...props}
            name={name}
            isSelected={value}
            onChange={(key) => onChange(key)}
          />
        </div>
      )}
    />
  );
}
