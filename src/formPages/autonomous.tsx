import { CheckIcon, XMarkIcon } from "@heroicons/react/20/solid";
import { Switch } from "@nextui-org/react";
import { Controller } from "react-hook-form";

import { Counter } from "../components/fields/Counter";
import type { FormProps } from "../formPages/forms";
import useForm from "../hooks/useForm";
import type { AutoData } from "../store/schema";
import { autoDataDefaults, autoDataSchema } from "../store/schema";
import { useAutoStore } from "../store/useDataStore";
import { cn } from "../util";

export default function Auto({ onChanged }: FormProps): JSX.Element {
  const { setData, data } = useAutoStore();

  const { control } = useForm<AutoData, typeof autoDataSchema>({
    setData,
    onChanged,
    defaultValues: data ?? autoDataDefaults,
    schema: autoDataSchema,
  });

  return (
    <form className="flex flex-col space-y-8 text-center [&>*]:mx-auto">
      <Controller
        control={control}
        name="leaveStartingZone"
        render={({ field: { value, onChange } }) => (
          <div className="flex flex-col space-y-2">
            <div className="my-auto">Left Starting Zone</div>
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
    </form>
  );
}
