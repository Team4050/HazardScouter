import {
  type ComponentProps,
  memo,
  type ReactNode,
  useCallback,
  useId,
  useRef,
  useState,
} from "react";
import { Button } from "@/components/ui/button";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";
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
import { cn } from "@/util";

type BaseProps = {
  label?: ReactNode;
  classNames?: {
    wrapper?: string;
    label?: string;
    input?: string;
  };
};

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

type TextInputProps = BaseProps & ComponentProps<"input">;

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
      {label ? <InputLabel htmlFor={inputId}>{label}</InputLabel> : null}
      <Input id={inputId} {...props} />
    </div>
  );
}

type NumberInputProps = BaseProps &
  ComponentProps<"input"> & {
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
      {label ? <InputLabel htmlFor={inputId}>{label}</InputLabel> : null}
      <Input id={inputId} type="text" inputMode="numeric" {...props} />
    </div>
  );
}

type AutocompleteProps = BaseProps & {
  data: string[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
  emptyMessage?: string;
};

export function Autocomplete({
  label,
  className,
  data,
  value,
  onChange,
  placeholder,
  inputMode,
  emptyMessage = "No results",
}: AutocompleteProps): ReactNode {
  const id = useId();
  const anchorRef = useRef<HTMLDivElement>(null);
  return (
    <div className={cn("flex flex-col", className)}>
      {label ? <InputLabel htmlFor={id}>{label}</InputLabel> : null}
      <Combobox
        items={data}
        inputValue={value ?? ""}
        onInputValueChange={(inputValue, details) => {
          if (details.reason === "input-change") {
            onChange?.(inputValue);
          }
        }}
        onValueChange={(val) => onChange?.(val as string)}
      >
        <div ref={anchorRef}>
          <ComboboxInput
            id={id}
            className="w-full"
            placeholder={placeholder}
            showTrigger={false}
            inputMode={inputMode}
          />
        </div>
        <ComboboxContent anchor={anchorRef} className="min-w-(--anchor-width)">
          <ComboboxEmpty>{emptyMessage}</ComboboxEmpty>
          <ComboboxList>
            {(item) => (
              <ComboboxItem key={item} value={item}>
                {item}
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    </div>
  );
}

type SelectDataItem = { value: string; label: string } | string;
type SelectProps = BaseProps & {
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
      {label ? <InputLabel htmlFor={id}>{label}</InputLabel> : null}
      <ShadcnSelect value={value} onValueChange={(val) => onChange?.(val)}>
        <SelectTrigger id={id}>
          <SelectValue placeholder={placeholder}>
            {(value: string | null) =>
              value
                ? (normalizedData.find((item) => item.value === value)?.label ??
                  value)
                : placeholder
            }
          </SelectValue>
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

type TextareaProps = BaseProps &
  ComponentProps<"textarea"> & {
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
      {label ? <InputLabel htmlFor={inputId}>{label}</InputLabel> : null}
      <ShadcnTextarea
        id={inputId}
        rows={minRows}
        className={cn(classNames?.input)}
        {...props}
      />
    </div>
  );
}

type SegmentedControlDataItem = { value: string; label: string } | string;
type SegmentedControlProps = BaseProps & {
  data: SegmentedControlDataItem[];
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
  fullWidth?: boolean;
  color?: "red" | "blue" | "green";
};

export function SegmentedControl({
  label,
  data,
  value,
  onChange,
  className,
  fullWidth,
  color = "green",
}: SegmentedControlProps): ReactNode {
  const id = useId();

  const normalizedData = data.map((item) =>
    typeof item === "string" ? { value: item, label: item } : item,
  );

  // Map color values to Tailwind classes for alliance colors
  const getColorClasses = () => {
    if (color === "red") {
      return "data-active:bg-alliance-red data-active:text-white";
    }
    if (color === "blue") {
      return "data-active:bg-alliance-blue data-active:text-white";
    }
    if (color === "green") {
      return "data-active:bg-hazard-green data-active:text-background";
    }
  };

  return (
    <div className={cn("flex flex-col items-center", className)}>
      {label ? (
        <InputLabel htmlFor={id} className="ml-1">
          {label}
        </InputLabel>
      ) : null}
      <Tabs
        id={id}
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

type SwitchProps = BaseProps &
  BooleanInputProps & {
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
      {label ? (
        <InputLabel htmlFor={id} className={cn(classNames?.label)}>
          {label}
        </InputLabel>
      ) : null}
      <ShadcnSwitch
        id={id}
        checked={checked ?? value}
        onCheckedChange={handleCheckedChange}
        className={cn(
          "h-6 w-11 xs:h-7 xs:w-14",
          "[&>span]:h-5 [&>span]:w-5 [&>span]:data-checked:translate-x-5",
          "xs:[&>span]:h-6 xs:[&>span]:w-6 xs:[&>span]:data-checked:translate-x-7",
        )}
      />
    </div>
  );
}

type SliderProps = BaseProps &
  NumericInputProps & {
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
  const id = useId();
  return (
    <div
      className={cn(
        "flex md:flex-row flex-col items-center w-full md:h-14 h-20",
        className,
      )}
    >
      {label ? <InputLabel htmlFor={id}>{label}</InputLabel> : null}
      <ShadcnSlider
        id={id}
        className="w-full"
        min={min}
        max={max}
        step={step}
        showSteps
        value={value}
        onValueChange={(val) => onChange?.(val as number)}
      />
    </div>
  );
}

type CounterProps = BaseProps &
  NumericInputProps & {
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
  const id = useId();

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
      {label ? <InputLabel htmlFor={id}>{label}</InputLabel> : null}
      <div id={id} className="flex w-full gap-x-1.5">
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

function InputLabel({
  className,
  children,
  ...props
}: ComponentProps<"label">) {
  return (
    <label className={cn("text-lg leading-tight", className)} {...props}>
      {children}
    </label>
  );
}

function InputWrapper({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={cn(
        "flex items-center gap-x-2 border rounded-md px-3 py-2",
        className,
      )}
    >
      {children}
    </div>
  );
}
