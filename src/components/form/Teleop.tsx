import type { ReactNode } from "react";
import { Counter, SegmentedControl, Switch } from "@/components/inputs";
import type { PhaseDataMap } from "@/data/db";
import {
  PickupType,
  Strategy,
  teleopDefaults,
  teleopSchema,
} from "@/data/match";
import { useForm } from "@/hooks/useForm";
import { enumToSelectItem } from "@/util";

type Props = {
  matchId: string;
  initialData?: PhaseDataMap["teleop"];
};

export function Teleop({ matchId, initialData }: Props): ReactNode {
  const form = useForm<"teleop">({
    matchId,
    phase: "teleop",
    initialValues: initialData || teleopDefaults,
    schema: teleopSchema,
  });

  return (
    <div className="grid grid-cols-2 mx-auto gap-8">
      <form.Field name="bump">
        {(field) => (
          <Switch
            label="Bump"
            checked={field.state.value}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              field.handleChange(e.currentTarget.checked)
            }
          />
        )}
      </form.Field>
      <form.Field name="trench">
        {(field) => (
          <Switch
            label="Trench"
            checked={field.state.value}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              field.handleChange(e.currentTarget.checked)
            }
          />
        )}
      </form.Field>
      <form.Field name="pickupType">
        {(field) => (
          <SegmentedControl
            label="Pickup Type"
            data={enumToSelectItem(PickupType)}
            value={field.state.value}
            onChange={(val: string) => field.handleChange(val as PickupType)}
            className="col-span-full"
          />
        )}
      </form.Field>
      <form.Field name="fuelScored">
        {(field) => (
          <Counter
            label="Fuel Scored"
            value={field.state.value}
            onChange={(val: number) => field.handleChange(val)}
            className="col-span-full"
            incrementBy={5}
            max={200}
          />
        )}
      </form.Field>
      <form.Field name="strategy">
        {(field) => (
          <SegmentedControl
            label="Strategy"
            data={enumToSelectItem(Strategy)}
            value={field.state.value}
            onChange={(val: string) => field.handleChange(val as Strategy)}
            className="col-span-full"
          />
        )}
      </form.Field>
    </div>
  );
}
