import { MinusIcon, PlusIcon } from "@heroicons/react/20/solid";
import { Button } from "@nextui-org/react";
import clsx from "clsx";
import { useEffect, useState } from "react";

type CounterProps = {
  label?: string;
  labelLeft?: boolean;
  // eslint-disable-next-line
  // control: Control<any, any>;
  classNames?: {
    label?: string;
    buttons?: string;
    container?: string;
    counter?: string;
  };
  size?: "sm" | "md" | "lg";
  value?: number;
  onChange?: (value: number) => void;
};

export function Counter({
  label,
  labelLeft,
  classNames,
  size = "md",
  value,
  onChange,
}: CounterProps): JSX.Element {
  const [count, setCount] = useState<number>(value || 0);

  useEffect(() => {
    if (onChange) {
      onChange(count);
    }
  }, [count, onChange]);

  return (
    <div className={clsx("flex", labelLeft ? "flex-row" : "flex-col")}>
      <div className={clsx("text-lg", classNames?.label)}>{label}</div>
      <div
        className={clsx(
          "flex flex-row bg-background w-fit rounded-xl p-1",
          classNames?.container,
        )}
      >
        <Button
          isIconOnly
          radius="md"
          size={size}
          className={clsx(classNames?.buttons)}
          onClick={() => setCount(count - 1)}
          disabled={count <= 0}
        >
          <MinusIcon
            className={clsx(count <= 0 ? "opacity-50" : null, "w-6")}
          />
        </Button>
        <div
          className={clsx(
            "text-center mx-3 my-auto text-lg font-tech w-8",
            classNames?.counter,
          )}
        >
          {count}
        </div>
        <Button
          isIconOnly
          radius="md"
          size={size}
          className={clsx(classNames?.buttons)}
          onClick={() => setCount(count + 1)}
          disabled={count >= 99}
        >
          <PlusIcon
            className={clsx(count >= 99 ? "opacity-50" : null, "w-6")}
          />
        </Button>
      </div>
    </div>
  );
}
