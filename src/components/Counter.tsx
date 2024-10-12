import { cn } from "@/util";
import {
  Button,
  NumberInput,
  type NumberInputHandlers,
  type NumberInputProps,
} from "@mantine/core";
import { useRef, useState } from "react";

type CounterProps = NumberInputProps & {
  label?: string;
};

export function Counter({
  min = 0,
  max = 999,
  onChange,
  label,
  className,
  ...numberInputProps
}: CounterProps): JSX.Element {
  const handlerRef = useRef<NumberInputHandlers>(null);
  const [value, setValue] = useState<number>(min);

  const handleChange = (value: string | number) => {
    if (typeof value === "string") return;
    setValue(value);
    onChange?.(value);
  };

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center mx-auto w-[180px]",
        className,
      )}
    >
      {label ? <label className="mb-1 text-mtn-sm">{label}</label> : null}
      <div className="flex w-full gap-x-1.5">
        <Button
          onClick={() => handlerRef.current?.decrement()}
          disabled={value === min}
          classNames={{
            root: "px-0 w-full font-normal text-4xl",
            inner: "pl-0.5",
          }}
        >
          -
        </Button>
        <NumberInput
          hideControls
          classNames={{
            input: "text-center text-3xl",
            root: "max-w-16",
          }}
          min={min}
          max={max}
          onChange={handleChange}
          {...numberInputProps}
          handlersRef={handlerRef}
          readOnly={true}
        />
        <Button
          onClick={() => handlerRef.current?.increment()}
          disabled={value === max}
          classNames={{
            root: "px-0 w-full font-normal text-4xl",
            inner: "pl-0.5",
          }}
        >
          +
        </Button>
      </div>
    </div>
  );
}
