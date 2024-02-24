import { Select, SelectItem, Tab, Tabs } from "@nextui-org/react";
import clsx from "clsx";
import { Controller } from "react-hook-form";

import FormInput from "@app/components/form/Input";
import { FormProps } from "@app/formPages/forms";
import useForm from "@app/hooks/useForm";
import {
  Alliance,
  DrivePosition,
  MatchType,
  PreMatchData,
  preMatchDataDefaults,
  preMatchDataSchema,
} from "@app/store/schema";
import { usePreMatchStore } from "@app/store/useDataStore";

export default function PreMatch({ onChanged }: FormProps): JSX.Element {
  const { setData, data } = usePreMatchStore();

  const { control, watch } = useForm<PreMatchData, typeof preMatchDataSchema>({
    setData,
    onChanged,
    defaultValues: data ?? preMatchDataDefaults,
    schema: preMatchDataSchema,
  });

  const alliance = watch("alliance") ?? preMatchDataDefaults.alliance;

  return (
    <form className="grid grid-cols-4 gap-4">
      <Controller
        control={control}
        name="alliance"
        defaultValue={preMatchDataDefaults.alliance}
        render={({ field: { value, onChange } }) => (
          <Tabs
            fullWidth
            className="col-span-full"
            classNames={{
              cursor: clsx(
                value === Alliance.Red ? "bg-red-500" : "bg-blue-500",
              ),
            }}
            selectedKey={value}
            onSelectionChange={onChange}
          >
            <Tab key={Alliance.Red} title="Red Alliance" />
            <Tab key={Alliance.Blue} title="Blue Alliance" />
          </Tabs>
        )}
      />

      <FormInput
        type="text"
        label="Scouter Initials"
        variant="faded"
        name="scouter"
        className="col-span-2"
        control={control}
      />

      <FormInput
        type="number"
        label="Match Number"
        variant="faded"
        name="matchNumber"
        className="col-span-2"
        control={control}
      />

      <FormInput
        type="number"
        label="Team Number"
        variant="faded"
        name="teamNumber"
        className="col-span-2"
        control={control}
      />

      <Controller
        control={control}
        name="matchType"
        render={({ field: { value, onChange } }) => (
          <Select
            label="Match Type"
            selectedKeys={[value]}
            onChange={(e) => onChange(e.target.value as MatchType)}
            className="col-span-2"
          >
            <SelectItem key={MatchType.Practice}>Practice</SelectItem>
            <SelectItem key={MatchType.Quals}>Qualifications</SelectItem>
            <SelectItem key={MatchType.Semi}>Semi-finals</SelectItem>
            <SelectItem key={MatchType.Finals}>Finals</SelectItem>
          </Select>
        )}
      />

      <Controller
        control={control}
        name="drivePosition"
        defaultValue={preMatchDataDefaults.drivePosition}
        render={({ field: { value, onChange } }) => (
          <div className="col-span-full w-full md:flex flex-row gap-x-2 text-center md:text-left">
            <div className="font-tech font-medium md:mb-0 mb-2">
              Driver Position
            </div>
            <Tabs
              fullWidth
              classNames={{
                cursor: clsx(
                  alliance === Alliance.Red ? "bg-red-500" : "bg-blue-500",
                ),
              }}
              selectedKey={value}
              onSelectionChange={onChange}
            >
              <Tab key={DrivePosition.Near} title="Near" />
              <Tab key={DrivePosition.Middle} title="Middle" />
              <Tab key={DrivePosition.Far} title="Far" />
            </Tabs>
          </div>
        )}
      />
    </form>
  );
}
