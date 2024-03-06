import { Card, CardBody, Textarea } from "@nextui-org/react";
import { Controller } from "react-hook-form";

import { Slider } from "../components/fields/Slider";
import { Switch } from "../components/fields/Switch";
import type { FormProps } from "../formPages/forms";
import useForm from "../hooks/useForm";
import type { PostMatchData } from "../store/schema";
import { postMatchDataSchema } from "../store/schema";
import { usePostMatchStore } from "../store/useDataStore";

export default function PostMatch({ onChanged }: FormProps): JSX.Element {
  const { setData, data } = usePostMatchStore();

  const { control } = useForm<PostMatchData, typeof postMatchDataSchema>({
    setData,
    onChanged,
    defaultValues: data ?? postMatchDataSchema,
    schema: postMatchDataSchema,
  });

  return (
    <form className="flex flex-col space-y-10 text-center [&>*]:mx-auto">
      <div className="w-full space-y-2">
        <Slider control={control} name="driverRating" label="Driver Rating" />
        <Slider control={control} name="defenseRating" label="Defense Rating" />
        <Slider control={control} name="speedRating" label="Speed Rating" />
      </div>

      <Card shadow="md" className="p-2">
        <CardBody>
          <div className="flex gap-4 flex-wrap md:flex-nowrap justify-around [&>*]:flex-1 text-center">
            <Switch
              control={control}
              name="died"
              label="Robot died?"
              classNames={{ label: "grow text-md" }}
            />

            <Switch
              control={control}
              name="unstable"
              label="Robot unstable?"
              classNames={{ label: "grow text-md" }}
            />

            <Switch
              control={control}
              name="droppedNotes"
              label="Robot dropped notes?"
              classNames={{ label: "grow text-md" }}
            />

            <Switch
              control={control}
              name="potentialPartner"
              label="Good alliance partner?"
              classNames={{ label: "grow text-md" }}
            />
          </div>
        </CardBody>
      </Card>

      <Controller
        control={control}
        name="comments"
        render={({ field: { value, onChange } }) => (
          <Textarea
            label="Comments"
            value={value}
            onValueChange={onChange}
            classNames={{ input: "min-h-[200px]" }}
          />
        )}
      />
    </form>
  );
}
