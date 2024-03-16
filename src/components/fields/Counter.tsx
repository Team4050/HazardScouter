import { MinusIcon, PlusIcon } from "@heroicons/react/20/solid";
import { Button } from "@nextui-org/react";
import { useEffect, useState } from "react";
import type { FieldValues } from "react-hook-form";
import { Controller } from "react-hook-form";
import { useMediaQuery } from "usehooks-ts";

import { cn } from "../../util";
import type { FieldProps } from "./props";

export function Counter<T extends FieldValues>({
  control,
  name,
  ...props
}: FieldProps<T, Omit<CounterInputProps, "onChange">>): JSX.Element {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange } }) => (
        <CounterInput {...props} value={value} onChange={onChange} />
      )}
    />
  );
}

type CounterInputProps = {
  label?: string;
  labelLeft?: boolean;
  className?: string;
  classNames?: {
    label?: string;
    buttons?: string;
    container?: string;
    counter?: string;
  };
  size?: "sm" | "md" | "lg";
  value?: number;
  minCount?: number;
  maxCount?: number;
  onChange?: (value: number) => void;
};

function CounterInput({
  label,
  labelLeft,
  className,
  classNames,
  size,
  value,
  minCount = 0,
  maxCount = 99,
  onChange,
}: CounterInputProps): JSX.Element {
  const [count, setCount] = useState<number>(value || 0);
  const [computedSize, setComputedSize] = useState(size);
  const isMobile = useMediaQuery("(max-width: 640px)");

  useEffect(() => {
    if (size === undefined) {
      setComputedSize(isMobile ? "lg" : "md");
    }
  }, [isMobile, size, setComputedSize]);

  useEffect(() => {
    if (onChange) {
      onChange(count);
    }
  }, [count, onChange]);

  return (
    <div
      className={cn(
        "flex text-lg",
        labelLeft ? "flex-row space-x-1" : "flex-col space-y-1",
        className,
      )}
    >
      <div className={cn(classNames?.label)}>{label}</div>
      <div
        className={cn(
          "flex flex-row bg-background w-fit rounded-xl p-1",
          classNames?.container,
        )}
      >
        <Button
          isIconOnly
          radius="md"
          size={computedSize}
          className={cn(classNames?.buttons)}
          onClick={() => setCount(count - 1)}
          disabled={count <= minCount}
        >
          <MinusIcon
            className={cn(count <= minCount ? "opacity-50" : null, "w-6")}
          />
        </Button>
        <div
          className={cn(
            "text-center mx-3 my-auto font-tech w-8",
            isMobile ? "text-xl" : "text-lg",
            classNames?.counter,
          )}
        >
          {count}
        </div>
        <Button
          isIconOnly
          radius="md"
          size={computedSize}
          className={cn(classNames?.buttons)}
          onClick={() => setCount(count + 1)}
          disabled={count >= maxCount}
        >
          <PlusIcon
            className={cn(count >= maxCount ? "opacity-50" : null, "w-6")}
          />
        </Button>
      </div>
    </div>
  );
}
