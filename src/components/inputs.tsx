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
  classNames,
  id,
  ...props
}: TextInputProps): ReactNode {
  const generatedId = useId();
  const inputId = id || generatedId;
  return (
    <InputWrapper
      label={label}
      htmlFor={inputId}
      className={className}
      classNames={classNames}
    >
      <Input id={inputId} className={classNames?.input} {...props} />
    </InputWrapper>
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
  classNames,
  id,
  hideControls = true,
  ...props
}: NumberInputProps): ReactNode {
  const generatedId = useId();
  const inputId = id || generatedId;
  return (
    <InputWrapper
      label={label}
      htmlFor={inputId}
      className={className}
      classNames={classNames}
    >
      <Input
        id={inputId}
        type="text"
        inputMode="numeric"
        className={classNames?.input}
        {...props}
      />
    </InputWrapper>
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
  classNames,
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
    <InputWrapper
      label={label}
      htmlFor={id}
      className={className}
      classNames={classNames}
    >
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
            className={cn("w-full", classNames?.input)}
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
    </InputWrapper>
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
  classNames,
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
    <InputWrapper
      label={label}
      htmlFor={id}
      className={className}
      classNames={classNames}
    >
      <ShadcnSelect value={value} onValueChange={(val) => onChange?.(val)}>
        <SelectTrigger id={id} className={classNames?.input}>
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
    </InputWrapper>
  );
}

type TextareaProps = BaseProps &
  ComponentProps<"textarea"> & {
    autosize?: boolean;
    minRows?: number;
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
    <InputWrapper
      label={label}
      htmlFor={inputId}
      className={className}
      classNames={classNames}
    >
      <ShadcnTextarea
        id={inputId}
        rows={minRows}
        className={cn("bg-accent font-mono text-xs!", classNames?.input)}
        {...props}
      />
    </InputWrapper>
  );
}

type SegmentedControlDataItem = { value: string; label: string } | string;
type SegmentedControlProps = BaseProps & {
  data: SegmentedControlDataItem[];
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
  color?: "red" | "blue" | "green";
};

export function SegmentedControl({
  label,
  data,
  value,
  onChange,
  className,
  classNames,
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
    <InputWrapper
      label={label}
      htmlFor={id}
      className={className}
      classNames={classNames}
    >
      <Tabs id={id} value={value} onValueChange={onChange} className="w-full">
        <TabsList className="w-full h-20">
          {normalizedData.map((item) => (
            <TabsTrigger
              key={item.value}
              value={item.value}
              className={cn(
                "h-full flex-1 transition-colors duration-300",
                getColorClasses(),
              )}
            >
              {item.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </InputWrapper>
  );
}

type SwitchProps = BaseProps &
  BooleanInputProps & {
    className?: string;
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
    <InputWrapper
      label={label}
      htmlFor={id}
      className={cn("items-center", className)}
      classNames={classNames}
    >
      <ShadcnSwitch
        id={id}
        checked={checked ?? value}
        onCheckedChange={handleCheckedChange}
        className={cn("w-14 xs:w-16", classNames?.input)}
      />
    </InputWrapper>
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
  classNames,
  min = 0,
  max = 10,
  step = 1,
  value,
  onChange,
}: SliderProps): ReactNode {
  const id = useId();
  return (
    <InputWrapper
      label={label}
      htmlFor={id}
      className={className}
      classNames={classNames}
    >
      <ShadcnSlider
        id={id}
        className={cn(classNames?.input)}
        min={min}
        max={max}
        step={step}
        showSteps
        value={value}
        onValueChange={(val) => onChange?.(val as number)}
      />
    </InputWrapper>
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
  classNames,
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
    <InputWrapper
      label={label}
      htmlFor={id}
      className={cn("mx-auto w-55", className)}
      classNames={classNames}
    >
      <div id={id} className="flex w-full gap-x-1.5 h-20">
        <Button
          type="button"
          onClick={handleDecrement}
          disabled={displayValue === min}
          className="px-0 size-full font-normal text-5xl"
        >
          -
        </Button>
        <Input
          type="text"
          inputMode="numeric"
          className={cn(
            "text-center text-5xl px-0 size-full",
            classNames?.input,
          )}
          min={min}
          max={max}
          value={displayValue}
          onChange={handleChange}
        />
        <Button
          type="button"
          onClick={handleIncrement}
          disabled={displayValue === max}
          className="px-0 size-full font-normal text-5xl"
        >
          +
        </Button>
      </div>
    </InputWrapper>
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

type InputWrapperProps = {
  label?: ReactNode;
  htmlFor?: string;
  className?: string;
  classNames?: BaseProps["classNames"];
  children: ReactNode;
};

function InputWrapper({
  label,
  htmlFor,
  className,
  classNames,
  children,
}: InputWrapperProps) {
  return (
    <div
      className={cn("flex flex-col gap-1.5", className, classNames?.wrapper)}
    >
      {label ? (
        <InputLabel htmlFor={htmlFor} className={classNames?.label}>
          {label}
        </InputLabel>
      ) : null}
      {children}
    </div>
  );
}
