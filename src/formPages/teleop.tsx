import { Controller } from "react-hook-form";

import { Counter } from "../components/fields/Counter";
import Select from "../components/fields/Select";
import type { FormProps } from "../formPages/forms";
import useForm from "../hooks/useForm";
import type { TeleopData } from "../store/schema";
import {
  PickupType,
  teleopDataDefaults,
  teleopDataSchema,
} from "../store/schema";
import { useTeleopStore } from "../store/useDataStore";

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

      <Select
        control={control}
        name="pickupType"
        className="max-w-[300px]"
        label="Pickup Type"
        items={[
          { key: PickupType.None, label: "None" },
          { key: PickupType.Floor, label: "Floor" },
          { key: PickupType.Source, label: "Source" },
          { key: PickupType.Both, label: "Floor + Source" },
        ]}
      />
    </form>
  );
}
