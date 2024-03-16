import { Counter } from "../components/fields/Counter";
import { Switch } from "../components/fields/Switch";
import type { AutoData } from "../data/schema";
import { autoDataDefaults, autoDataSchema } from "../data/schema";
import { useAutoStore } from "../data/useDataStore";
import type { FormProps } from "../formPages/forms";
import useForm from "../hooks/useForm";

export default function Auto({ onChanged }: FormProps): JSX.Element {
  const { setData, data } = useAutoStore();

  const { control } = useForm<AutoData, typeof autoDataSchema>({
    setData,
    onChanged,
    defaultValues: data ?? autoDataDefaults,
    schema: autoDataSchema,
  });

  return (
    <form className="flex flex-col space-y-4 text-center [&>*]:mx-auto">
      <Switch
        control={control}
        name="leaveStartingZone"
        label="Left Starting Zone"
      />

      <Counter control={control} name="ampScores" label="Amp Scores" />

      <Counter control={control} name="speakerScores" label="Speaker Scores" />
    </form>
  );
}
