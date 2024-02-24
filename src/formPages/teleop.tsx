import { Select, SelectItem } from "@nextui-org/react";
import { Controller } from "react-hook-form";

import { Counter } from "@app/components/form/Counter";
import { FormProps } from "@app/formPages/forms";
import useForm from "@app/hooks/useForm";
import {
  PickupType,
  TeleopData,
  teleopDataDefaults,
  teleopDataSchema,
} from "@app/store/schema";
import { useTeleopStore } from "@app/store/useDataStore";

export default function Teleop({ onChanged }: FormProps): JSX.Element {
  const { setData, data } = useTeleopStore();

  const { control } = useForm<TeleopData, typeof teleopDataSchema>({
    setData,
    onChanged,
    defaultValues: data ?? teleopDataDefaults,
    schema: teleopDataSchema,
  });

  return (
    <form className="flex flex-col space-y-8 text-center [&>*]:mx-auto">
      <Controller
        control={control}
        name="ampScores"
        render={({ field: { value, onChange } }) => (
          <Counter label="Amp Scores" value={value} onChange={onChange} />
        )}
      />

      <Controller
        control={control}
        name="speakerScores"
        render={({ field: { value, onChange } }) => (
          <Counter label="Speaker Scores" value={value} onChange={onChange} />
        )}
      />

      <Controller
        control={control}
        name="timesAmplified"
        render={({ field: { value, onChange } }) => (
          <Counter label="Times Amplified" value={value} onChange={onChange} />
        )}
      />

      <Controller
        control={control}
        name="pickupType"
        render={({ field: { value, onChange } }) => (
          <Select
            label="Pickup Type"
            selectedKeys={[value]}
            onChange={(e) => onChange(e.target.value as PickupType)}
            className="max-w-[300px]"
          >
            <SelectItem key={PickupType.None}>None</SelectItem>
            <SelectItem key={PickupType.Floor}>Floor</SelectItem>
            <SelectItem key={PickupType.Source}>Source</SelectItem>
            <SelectItem key={PickupType.Both}>Floor + Source</SelectItem>
          </Select>
        )}
      />
    </form>
  );
}
