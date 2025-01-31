import { cn } from "@/util";
import {
  Button,
  Autocomplete as MAutocomplete,
  NumberInput as MNumberInput,
  SegmentedControl as MSegmentedControl,
  type SegmentedControlProps as MSegmentedControlProps,
  Select as MSelect,
  Slider as MSlider,
  type SliderProps as MSliderProps,
  Switch as MSwitch,
  type SwitchProps as MSwitchProps,
  Textarea as MTextArea,
  TextInput as MTextInput,
  type NumberInputHandlers,
  type NumberInputProps,
} from "@mantine/core";
import { type ReactNode, useRef, useState } from "react";

type InputProps = {
  value?: boolean;
  defaultValue?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  error?: string;
};

export const Autocomplete = MAutocomplete.withProps({
  classNames: {
    label: "ml-1",
  },
});

export const TextInput = MTextInput.withProps({
  classNames: {
    label: "ml-1",
  },
});

export const NumberInput = MNumberInput.withProps({
  classNames: {
    label: "ml-1",
  },
  inputMode: "numeric",
  hideControls: true,
});

export const Select = MSelect.withProps({
  classNames: {
    label: "ml-1 mb-2 font-medium",
  },
  allowDeselect: false,
});

export const Textarea = MTextArea.withProps({
  classNames: {
    label: "ml-1 mb-2",
  },
});

type SegmentedControlProps = MSegmentedControlProps & {
  label?: string;
};

export function SegmentedControl({
  label,
  className,
  ...segmentedControlProps
}: SegmentedControlProps): ReactNode {
  return (
    <div className={cn(className)}>
      {label ? <label className="text-mtn-sm ml-1">{label}</label> : null}
      <MSegmentedControl fullWidth {...segmentedControlProps} />
    </div>
  );
}

type SwitchProps = MSwitchProps &
  InputProps & {
    classNames?: {
      label?: string;
    };
  };

export function Switch({
  label,
  className,
  classNames,
  ...switchProps
}: SwitchProps): ReactNode {
  const { label: labelClassNames, ...switchClassNames } = classNames ?? {};
  return (
    <div className={cn("flex flex-col items-center", className)}>
      {label ? (
        <label className={cn("mb-1 text-mtn-sm", labelClassNames)}>
          {label}
        </label>
      ) : null}
      <MSwitch
        radius="xs"
        size="xl"
        classNames={switchClassNames}
        {...switchProps}
      />
    </div>
  );
}

type SliderProps = MSliderProps & InputProps & { label?: string };

export function Slider({
  label,
  className,
  min = 0,
  max = 10,
  step = 1,
  ...sliderProps
}: SliderProps): ReactNode {
  const generateMarks = (): { value: number; label?: string }[] => {
    const marks = [];
    for (let i = min; i <= max; i += step) {
      marks.push({ value: i, label: i.toString() });
    }
    return marks;
  };

  return (
    <div
      className={cn(
        "flex md:flex-row flex-col items-center w-full md:h-14 h-20",
        className,
      )}
    >
      {label ? (
        <label className="md:w-48 md:mr-4 md:mb-0 mb-1 text-mtn-sm">
          {label}
        </label>
      ) : null}
      <MSlider
        className="w-full"
        radius="xs"
        size="xl"
        min={min}
        max={max}
        step={step}
        marks={generateMarks()}
        {...sliderProps}
      />
    </div>
  );
}

type CounterProps = NumberInputProps &
  InputProps & {
    label?: string;
  };

export function Counter({
  min = 0,
  max = 999,
  onChange,
  label,
  className,
  defaultValue,
  value,
  ...numberInputProps
}: CounterProps): ReactNode {
  const handlerRef = useRef<NumberInputHandlers>(null);
  const [internalValue, setInternalValue] = useState<number>(
    value ?? defaultValue ?? min,
  );

  const handleChange = (value: string | number) => {
    if (typeof value === "string") return;
    setInternalValue(value);
    onChange?.(value);
  };

  const handleIncrement = () => {
    if (handlerRef.current) {
      const newValue = internalValue + 1;
      if (newValue <= max) {
        setInternalValue(newValue);
        onChange?.(newValue);
      }
    }
  };

  const handleDecrement = () => {
    if (handlerRef.current) {
      const newValue = internalValue - 1;
      if (newValue >= min) {
        setInternalValue(newValue);
        onChange?.(newValue);
      }
    }
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
          onClick={handleDecrement}
          disabled={internalValue === min}
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
          }}
          min={min}
          max={max}
          value={internalValue}
          onChange={handleChange}
          {...numberInputProps}
          handlersRef={handlerRef}
        />
        <Button
          onClick={handleIncrement}
          disabled={internalValue === max}
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
