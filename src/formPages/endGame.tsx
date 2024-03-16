import Select from "../components/fields/Select";
import { Switch } from "../components/fields/Switch";
import type { FormProps } from "../formPages/forms";
import useForm from "../hooks/useForm";
import type { EndGameData } from "../store/schema";
import {
  EndStatus,
  endGameDataDefaults,
  endGameDataSchema,
} from "../store/schema";
import { useEndGameStore } from "../store/useDataStore";

export default function Endgame({ onChanged }: FormProps): JSX.Element {
  const { setData, data } = useEndGameStore();

  const { control } = useForm<EndGameData, typeof endGameDataSchema>({
    setData,
    onChanged,
    defaultValues: data ?? endGameDataDefaults,
    schema: endGameDataSchema,
  });

  return (
    <form className="flex flex-col space-y-4 text-center [&>*]:mx-auto">
      <Select
        control={control}
        name="endStatus"
        label="End Status"
        className="max-w-[250px]"
        items={[
          { key: EndStatus.Parked, label: "Parked" },
          { key: EndStatus.OnStage, label: "On Stage" },
          { key: EndStatus.OnStageSpotlight, label: "On Stage, Spotlight" },
          { key: EndStatus.Harmony, label: "Harmony" },
          { key: EndStatus.FailedAttempt, label: "Failed Attempt" },
          { key: EndStatus.NotAttempted, label: "Not Attempted" },
        ]}
      />

      <Switch control={control} name="trap" label="Trap" />
    </form>
  );
}
