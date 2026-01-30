import type { ReactNode } from "react";
import { ReefCoralSection } from "@/components/form/ReefCoralSection";
import { Counter, Select, Switch } from "@/components/inputs";
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
    <div className="grid grid-cols-2 sm:grid-cols-3 grid-rows-4">
      <div className="row-span-full flex flex-col md:gap-y-2 gap-y-5 my-auto">
        <form.Field name="strategy">
          {(field) => (
            <Select
              label="Strategy"
              data={enumToSelectItem(Strategy)}
              value={field.state.value}
              onChange={(val: string | null) =>
                field.handleChange(val as Strategy)
              }
            />
          )}
        </form.Field>
        <form.Field name="pickupType">
          {(field) => (
            <Select
              label="Pickup Type"
              data={enumToSelectItem(PickupType)}
              value={field.state.value}
              onChange={(val: string | null) =>
                field.handleChange(val as PickupType)
              }
            />
          )}
        </form.Field>
        <form.Field name="processor">
          {(field) => (
            <Counter
              label="Processor Scores"
              value={field.state.value}
              onChange={(val: number) => field.handleChange(val)}
            />
          )}
        </form.Field>
        <form.Field name="net">
          {(field) => (
            <Counter
              label="Net Scores"
              max={99}
              value={field.state.value}
              onChange={(val: number) => field.handleChange(val)}
            />
          )}
        </form.Field>
        <form.Field name="removedAlgae">
          {(field) => (
            <Switch
              label="Removed Algae"
              checked={field.state.value}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                field.handleChange(e.currentTarget.checked)
              }
            />
          )}
        </form.Field>
      </div>

      <svg
        width="100%"
        height="100%"
        viewBox="0 0 44 225"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="row-span-full max-h-[500px] max-w-[250px] hidden xs:block"
      >
        <path
          d="M3 221.5V182M41 3V29C41 33.4066 38.9253 37.556 35.4 40.2L8.6 60.3C5.07472 62.944 3 67.0934 3 71.5V182M3 182L41 156M3 122L41 96"
          stroke="#D115EB"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      <ReefCoralSection form={form} />
    </div>
  );
}
