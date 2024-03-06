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
      <Counter control={control} name="ampScores" label="Amp Scores" />

      <Counter control={control} name="speakerScores" label="Speaker Scores" />

      <Counter
        control={control}
        name="timesAmplified"
        label="Times Amplified"
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
