import { CheckIcon, XMarkIcon } from "@heroicons/react/20/solid";
import { Switch } from "@nextui-org/react";
import { Controller } from "react-hook-form";

import Select from "../components/fields/Select";
import type { FormProps } from "../formPages/forms";
import useForm from "../hooks/useForm";
import type { EndGameData } from "../store/schema";
import {
  EndStatus,
  endGameDataDefaults,
  endGameDataSchema,
} from "../store/schema";
import { useEndGameStore } from "../store/useDataStore";
import { cn } from "../util";

export default function Endgame({ onChanged }: FormProps): JSX.Element {
  const { setData, data } = useEndGameStore();

  const { control } = useForm<EndGameData, typeof endGameDataSchema>({
    setData,
    onChanged,
    defaultValues: data ?? endGameDataDefaults,
    schema: endGameDataSchema,
  });

  return (
    <form className="flex flex-col space-y-8 text-center [&>*]:mx-auto">
      <Select
        control={control}
        name="endStatus"
        label="End Status"
        className="max-w-[300px]"
        items={[
          { key: EndStatus.Parked, label: "Parked" },
          { key: EndStatus.OnStage, label: "On Stage" },
          { key: EndStatus.OnStageSpotlight, label: "On Stage, Spotlight" },
          { key: EndStatus.Harmony, label: "Harmony" },
          { key: EndStatus.FailedAttempt, label: "Failed Attempt" },
          { key: EndStatus.NotAttempted, label: "Not Attempted" },
        ]}
      />

      <Controller
        control={control}
        name="trap"
        render={({ field: { value, onChange } }) => (
          <div className="flex flex-col space-y-2">
            <div className="my-auto text-lg">Trap</div>
            <Switch
              isSelected={value}
              onChange={(key) => onChange(key)}
              className="mx-auto"
              classNames={{
                wrapper: cn(value ? "bg-green-500" : "bg-red-500"),
              }}
              startContent={<CheckIcon />}
              endContent={<XMarkIcon />}
              size="lg"
            />
          </div>
        )}
      />
    </form>
  );
}
