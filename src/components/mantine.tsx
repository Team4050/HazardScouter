import { cn } from "@/util";
import {
  NumberInput as MNumberInput,
  SegmentedControl as MSegmentedControl,
  type SegmentedControlProps as MSegmentedControlProps,
  Switch as MSwitch,
  type SwitchProps as MSwitchProps,
  TextInput as MTextInput,
} from "@mantine/core";

export const TextInput = MTextInput.withProps({
  classNames: {
    label: "ml-1",
  },
});

export const NumberInput = MNumberInput.withProps({
  classNames: {
    label: "ml-1",
  },
});

type SegmentedControlProps = MSegmentedControlProps & {
  label?: string;
};

export function SegmentedControl({
  label,
  className,
  ...segmentedControlProps
}: SegmentedControlProps): JSX.Element {
  return (
    <div className={cn(className)}>
      {label ? <label className="text-mtn-sm ml-1">{label}</label> : null}
      <MSegmentedControl fullWidth {...segmentedControlProps} />
    </div>
  );
}

type SwitchProps = MSwitchProps;

export function Switch({
  label,
  className,
  ...switchProps
}: SwitchProps): JSX.Element {
  return (
    <div className={cn("flex flex-col items-center", className)}>
      {label ? <label className="mb-1">{label}</label> : null}
      <MSwitch radius="xs" size="xl" {...switchProps} />
    </div>
  );
}
