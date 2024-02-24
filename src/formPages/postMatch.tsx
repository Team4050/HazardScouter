import { CheckIcon, XMarkIcon } from "@heroicons/react/20/solid";
import { Card, CardBody, Slider, Switch, Textarea } from "@nextui-org/react";
import clsx from "clsx";
import { Controller } from "react-hook-form";

import { FormProps } from "../formPages/forms";
import useForm from "../hooks/useForm";
import { PostMatchData, postMatchDataSchema } from "../store/schema";
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
        <Controller
          control={control}
          name="driverRating"
          render={({ field: { value, onChange } }) => (
            <Slider
              step={1}
              label="Driver Rating"
              showSteps
              minValue={0}
              maxValue={10}
              value={value}
              onChange={onChange}
            />
          )}
        />
        <Controller
          control={control}
          name="defenseRating"
          render={({ field: { value, onChange } }) => (
            <Slider
              step={1}
              label="Defense Rating"
              showSteps
              minValue={0}
              maxValue={10}
              value={value}
              onChange={onChange}
            />
          )}
        />
        <Controller
          control={control}
          name="speedRating"
          render={({ field: { value, onChange } }) => (
            <Slider
              step={1}
              label="Speed Rating"
              showSteps
              minValue={0}
              maxValue={10}
              value={value}
              onChange={onChange}
            />
          )}
        />
      </div>

      <Card shadow="md" className="p-2">
        <CardBody>
          <div className="flex gap-4 flex-wrap md:flex-nowrap justify-around [&>*]:flex-1 text-center">
            <Controller
              control={control}
              name="died"
              render={({ field: { value, onChange } }) => (
                <div className="flex flex-col space-y-2">
                  <div className="grow">Robot died?</div>
                  <Switch
                    isSelected={value}
                    onChange={(key) => onChange(key)}
                    className="mx-auto"
                    classNames={{
                      wrapper: clsx(value ? "bg-green-500" : "bg-red-500"),
                    }}
                    startContent={<CheckIcon />}
                    endContent={<XMarkIcon />}
                  />
                </div>
              )}
            />

            <Controller
              control={control}
              name="unstable"
              render={({ field: { value, onChange } }) => (
                <div className="flex flex-col space-y-2">
                  <div className="grow">Robot unstable?</div>
                  <Switch
                    isSelected={value}
                    onChange={(key) => onChange(key)}
                    className="mx-auto"
                    classNames={{
                      wrapper: clsx(value ? "bg-green-500" : "bg-red-500"),
                    }}
                    startContent={<CheckIcon />}
                    endContent={<XMarkIcon />}
                  />
                </div>
              )}
            />

            <Controller
              control={control}
              name="droppedNotes"
              render={({ field: { value, onChange } }) => (
                <div className="flex flex-col space-y-2">
                  <div className="grow">Robot dropped notes?</div>
                  <Switch
                    isSelected={value}
                    onChange={(key) => onChange(key)}
                    className="mx-auto"
                    classNames={{
                      wrapper: clsx(value ? "bg-green-500" : "bg-red-500"),
                    }}
                    startContent={<CheckIcon />}
                    endContent={<XMarkIcon />}
                  />
                </div>
              )}
            />

            <Controller
              control={control}
              name="potentialPartner"
              render={({ field: { value, onChange } }) => (
                <div className="flex flex-col space-y-2">
                  <div className="grow">Good alliance partner?</div>
                  <Switch
                    isSelected={value}
                    onChange={(key) => onChange(key)}
                    className="mx-auto"
                    classNames={{
                      wrapper: clsx(value ? "bg-green-500" : "bg-red-500"),
                    }}
                    startContent={<CheckIcon />}
                    endContent={<XMarkIcon />}
                  />
                </div>
              )}
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
