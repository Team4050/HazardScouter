import { MinusIcon, PlusIcon } from "@heroicons/react/20/solid";
import { Button } from "@nextui-org/react";
import {
  Controller,
  ControllerProps,
  ControllerRenderProps,
} from "react-hook-form";

export default function Counter({
  render,
  ...props
}: ControllerProps): JSX.Element {
  return (
    <Controller
      {...props}
      render={({ field: { value, onChange } }) => (
        <div className="flex flex-row">
          <Button onClick={() => onChange(value - 1)}>
            <MinusIcon />
          </Button>
          <input type="text" disabled value={value} />
          <Button onClick={() => onChange(value + 1)}>
            <PlusIcon />
          </Button>
        </div>
      )}
    />
  );
}
