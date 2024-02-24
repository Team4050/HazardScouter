import { CheckIcon, XMarkIcon } from "@heroicons/react/20/solid";
import { Select, SelectItem, Switch } from "@nextui-org/react";
import clsx from "clsx";
import { Controller } from "react-hook-form";

import { FormProps } from "@app/formPages/forms";
import useForm from "@app/hooks/useForm";
import {
  EndGameData,
  EndStatus,
  endGameDataDefaults,
  endGameDataSchema,
} from "@app/store/schema";
import { useEndGameStore } from "@app/store/useDataStore";

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
      <Controller
        control={control}
        name="endStatus"
        render={({ field: { value, onChange } }) => (
          <Select
            label="End Status"
            selectedKeys={[value]}
            onChange={(e) => onChange(e.target.value as EndStatus)}
            className="max-w-[300px]"
          >
            <SelectItem key={EndStatus.Parked}>Parked</SelectItem>
            <SelectItem key={EndStatus.OnStage}>On Stage</SelectItem>
            <SelectItem key={EndStatus.OnStageSpotlight}>
              On Stage, Spotlight
            </SelectItem>
            <SelectItem key={EndStatus.Harmony}>Harmony</SelectItem>
            <SelectItem key={EndStatus.FailedAttempt}>
              Failed Attempt
            </SelectItem>
            <SelectItem key={EndStatus.NotAttempted}>Not Attempted</SelectItem>
          </Select>
        )}
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
                wrapper: clsx(value ? "bg-green-500" : "bg-red-500"),
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
