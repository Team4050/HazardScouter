import { memo, type ReactNode, useCallback, useId, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Select as ShadcnSelect,
} from "@/components/ui/select";
import { Slider as ShadcnSlider } from "@/components/ui/slider";
import { Switch as ShadcnSwitch } from "@/components/ui/switch";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea as ShadcnTextarea } from "@/components/ui/textarea";
import { useIsMobile } from "@/hooks/useIsMobile";
import { cn } from "@/util";

type BooleanInputProps = {
  value?: boolean;
  defaultValue?: boolean;
  checked?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  error?: string;
};

type NumericInputProps = {
  value?: number;
  defaultValue?: number;
  onChange?: (value: number) => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  error?: string;
};

// TextInput wrapper with label support
type TextInputProps = React.ComponentProps<"input"> & {
  label?: string;
};

export function TextInput({
  label,
  className,
  id,
  ...props
}: TextInputProps): ReactNode {
  const generatedId = useId();
  const inputId = id || generatedId;
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      {label && (
        <label htmlFor={inputId} className="ml-1 font-medium text-base">
          {label}
        </label>
      )}
      <Input id={inputId} {...props} />
    </div>
  );
}

// NumberInput wrapper
type NumberInputProps = React.ComponentProps<"input"> & {
  label?: string;
  hideControls?: boolean;
  min?: number;
  max?: number;
};

export function NumberInput({
  label,
  className,
  id,
  hideControls = true,
  ...props
}: NumberInputProps): ReactNode {
  const generatedId = useId();
  const inputId = id || generatedId;
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      {label && (
        <label htmlFor={inputId} className="ml-1 font-medium text-base">
          {label}
        </label>
      )}
      <Input id={inputId} type="text" inputMode="numeric" {...props} />
    </div>
  );
}

// Autocomplete wrapper (using simple input with datalist for now)
type AutocompleteProps = React.ComponentProps<"input"> & {
  label?: string;
  data: string[];
};

export function Autocomplete({
  label,
  className,
  id,
  data,
  ...props
}: AutocompleteProps): ReactNode {
  const generatedId = useId();
  const inputId = id || generatedId;
  const listId = `${inputId}-list`;

  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      {label && (
        <label htmlFor={inputId} className="ml-1 font-medium text-base">
          {label}
        </label>
      )}
      <Input id={inputId} list={listId} {...props} />
      <datalist id={listId}>
        {data.map((item) => (
          <option key={item} value={item} />
        ))}
      </datalist>
    </div>
  );
}

// Select wrapper to match Mantine's data prop API
type SelectDataItem = { value: string; label: string } | string;
type SelectProps = {
  label?: string;
  data: SelectDataItem[];
  value?: string;
  onChange?: (value: string | null) => void;
  placeholder?: string;
  className?: string;
  allowDeselect?: boolean;
};

export function Select({
  label,
  data,
  value,
  onChange,
  placeholder = "Select...",
  className,
}: SelectProps): ReactNode {
  const id = useId();

  const normalizedData = data.map((item) =>
    typeof item === "string" ? { value: item, label: item } : item,
  );

  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      {label && (
        <label htmlFor={id} className="ml-1 mb-2 font-medium text-base">
          {label}
        </label>
      )}
      <ShadcnSelect value={value} onValueChange={(val) => onChange?.(val)}>
        <SelectTrigger id={id}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {normalizedData.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectContent>
      </ShadcnSelect>
    </div>
  );
}

// Textarea wrapper
type TextareaProps = React.ComponentProps<"textarea"> & {
  label?: string;
  autosize?: boolean;
  minRows?: number;
  classNames?: {
    input?: string;
  };
};

export function Textarea({
  label,
  className,
  id,
  autosize,
  minRows = 3,
  classNames,
  ...props
}: TextareaProps): ReactNode {
  const generatedId = useId();
  const inputId = id || generatedId;

  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      {label && (
        <label htmlFor={inputId} className="ml-1 mb-2 font-medium text-base">
          {label}
        </label>
      )}
      <ShadcnTextarea
        id={inputId}
        rows={minRows}
        className={cn(classNames?.input)}
        {...props}
      />
    </div>
  );
}

// SegmentedControl using Tabs
type SegmentedControlDataItem = { value: string; label: string } | string;
type SegmentedControlProps = {
  label?: string;
  data: SegmentedControlDataItem[];
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
  fullWidth?: boolean;
  color?: string;
};

export function SegmentedControl({
  label,
  data,
  value,
  onChange,
  className,
  fullWidth,
  color,
}: SegmentedControlProps): ReactNode {
  const normalizedData = data.map((item) =>
    typeof item === "string" ? { value: item, label: item } : item,
  );

  // Map color values to Tailwind classes for alliance colors
  const getColorClasses = () => {
    if (color === "red") {
      return "data-[state=active]:bg-alliance-red data-[state=active]:text-white";
    }
    if (color === "blue") {
      return "data-[state=active]:bg-alliance-blue data-[state=active]:text-white";
    }
    return "";
  };

  return (
    <div className={cn(className)}>
      {label && <label className="ml-1 text-base">{label}</label>}
      <Tabs
        value={value}
        onValueChange={onChange}
        className={cn(fullWidth && "w-full")}
      >
        <TabsList className={cn("mt-1", fullWidth && "w-full")}>
          {normalizedData.map((item) => (
            <TabsTrigger
              key={item.value}
              value={item.value}
              className={cn(
                fullWidth && "flex-1",
                "transition-colors duration-300",
                getColorClasses(),
              )}
            >
              {item.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </div>
  );
}

// Switch wrapper
type SwitchProps = BooleanInputProps & {
  label?: string;
  className?: string;
  classNames?: {
    label?: string;
  };
};

export function Switch({
  label,
  className,
  classNames,
  checked,
  value,
  onChange,
}: SwitchProps): ReactNode {
  const isMobile = useIsMobile();
  const id = useId();

  // Create a synthetic event for onChange
  const handleCheckedChange = (newChecked: boolean) => {
    if (onChange) {
      const syntheticEvent = {
        currentTarget: { checked: newChecked },
        target: { checked: newChecked },
      } as React.ChangeEvent<HTMLInputElement>;
      onChange(syntheticEvent);
    }
  };

  return (
    <div className={cn("flex flex-col items-center", className)}>
      {label && (
        <label htmlFor={id} className={cn("mb-1", classNames?.label)}>
          {label}
        </label>
      )}
      <ShadcnSwitch
        id={id}
        checked={checked ?? value}
        onCheckedChange={handleCheckedChange}
        className={cn(
          isMobile
            ? "h-6 w-11 [&>span]:h-5 [&>span]:w-5 [&>span]:data-[state=checked]:translate-x-5"
            : "h-7 w-14 [&>span]:h-6 [&>span]:w-6 [&>span]:data-[state=checked]:translate-x-7",
        )}
      />
    </div>
  );
}

// Slider wrapper
type SliderProps = NumericInputProps & {
  label?: string;
  className?: string;
  min?: number;
  max?: number;
  step?: number;
};

export function Slider({
  label,
  className,
  min = 0,
  max = 10,
  step = 1,
  value,
  onChange,
}: SliderProps): ReactNode {
  const generateMarks = () => {
    const marks = [];
    for (let i = min; i <= max; i += step) {
      marks.push(i);
    }
    return marks;
  };

  const marks = generateMarks();

  return (
    <div
      className={cn(
        "flex md:flex-row flex-col items-center w-full md:h-14 h-20",
        className,
      )}
    >
      {label && (
        <label className="md:w-48 md:mr-4 md:mb-0 mb-1 text-base">
          {label}
        </label>
      )}
      <div className="w-full flex flex-col">
        <ShadcnSlider
          className="w-full"
          min={min}
          max={max}
          step={step}
          value={value !== undefined ? [value] : undefined}
          onValueChange={(vals) => onChange?.(vals[0])}
        />
        <div className="flex justify-between mt-1 px-1">
          {marks.map((mark) => (
            <span key={mark} className="text-sm font-medium text-muted-foreground">
              {mark}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// Counter component
type CounterProps = NumericInputProps & {
  label?: string;
  className?: string;
  min?: number;
  max?: number;
};

export const Counter = memo(function Counter({
  min = 0,
  max = 999,
  onChange,
  label,
  className,
  defaultValue,
  value,
}: CounterProps): ReactNode {
  const [internalValue, setInternalValue] = useState<number>(
    value ?? defaultValue ?? min,
  );

  // Sync internal value with controlled value
  const displayValue = value ?? internalValue;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number.parseInt(e.target.value, 10);
    if (!Number.isNaN(newValue) && newValue >= min && newValue <= max) {
      setInternalValue(newValue);
      onChange?.(newValue);
    }
  };

  const handleIncrement = useCallback(() => {
    const newValue = displayValue + 1;
    if (newValue <= max) {
      setInternalValue(newValue);
      onChange?.(newValue);
    }
  }, [displayValue, max, onChange]);

  const handleDecrement = useCallback(() => {
    const newValue = displayValue - 1;
    if (newValue >= min) {
      setInternalValue(newValue);
      onChange?.(newValue);
    }
  }, [displayValue, min, onChange]);

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center mx-auto w-37.5 sm:w-45",
        className,
      )}
    >
      {label && (
        <label className="mb-1 self-start w-full text-center text-base">
          {label}
        </label>
      )}
      <div className="flex w-full gap-x-1.5">
        <Button
          type="button"
          onClick={handleDecrement}
          disabled={displayValue === min}
          className="px-0 w-full font-normal text-5xl h-14"
        >
          -
        </Button>
        <Input
          type="text"
          inputMode="numeric"
          className="text-center text-4xl px-0 h-14"
          min={min}
          max={max}
          value={displayValue}
          onChange={handleChange}
        />
        <Button
          type="button"
          onClick={handleIncrement}
          disabled={displayValue === max}
          className="px-0 w-full font-normal text-5xl h-14"
        >
          +
        </Button>
      </div>
    </div>
  );
});
