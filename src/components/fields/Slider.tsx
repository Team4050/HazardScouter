import type { SliderProps } from "@nextui-org/react";
import { Slider as NUISlider } from "@nextui-org/react";
import type { FieldValues } from "react-hook-form";
import { Controller } from "react-hook-form";

import type { FieldProps } from "./props";

export function Slider<T extends FieldValues>({
  control,
  name,
  ...props
}: FieldProps<T, SliderProps>): JSX.Element {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange } }) => (
        <NUISlider
          step={1}
          showSteps
          minValue={0}
          maxValue={10}
          {...props}
          name={name}
          value={value}
          onChange={onChange}
        />
      )}
    />
  );
}
