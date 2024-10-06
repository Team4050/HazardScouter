import { cn } from "@/util";
import {
  NumberInput as MNumberInput,
  SegmentedControl as MSegmentedControl,
  type SegmentedControlProps as MSegmentedControlProps,
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
      {label ? <div className="text-mtn-sm ml-1">{label}</div> : null}
      <MSegmentedControl fullWidth {...segmentedControlProps} />
    </div>
  );
}
