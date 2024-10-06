import { cn } from "@/util";
import {
  SegmentedControl as MSegmentedControl,
  type SegmentedControlProps as MSegmentedControlProps,
} from "@mantine/core";

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
      {label ? <div className="text-sm">{label}</div> : null}
      <MSegmentedControl fullWidth {...segmentedControlProps} />
    </div>
  );
}
