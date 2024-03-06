import { Tab, Tabs } from "@nextui-org/react";
import { Controller } from "react-hook-form";

import Input from "../components/fields/Input";
import Select from "../components/fields/Select";
import type { FormProps } from "../formPages/forms";
import useForm from "../hooks/useForm";
import type { PreMatchData } from "../store/schema";
import {
  Alliance,
  DrivePosition,
  MatchType,
  preMatchDataDefaults,
  preMatchDataSchema,
} from "../store/schema";
import { usePreMatchStore } from "../store/useDataStore";
import { cn } from "../util";

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
              cursor: cn(value === Alliance.Red ? "bg-red-500" : "bg-blue-500"),
            }}
            selectedKey={value}
            onSelectionChange={onChange}
          >
            <Tab key={Alliance.Red} title="Red Alliance" />
            <Tab key={Alliance.Blue} title="Blue Alliance" />
          </Tabs>
        )}
      />

      <Input
        type="text"
        label="Scouter Name"
        variant="faded"
        name="scouter"
        className="col-span-2"
        control={control}
      />

      <Input
        type="number"
        label="Match Number"
        variant="faded"
        name="matchNumber"
        className="col-span-2"
        control={control}
      />

      <Input
        type="number"
        label="Team Number"
        variant="faded"
        name="teamNumber"
        className="col-span-2"
        control={control}
      />

      <Select
        control={control}
        name="matchType"
        label="Match Type"
        items={[
          { key: MatchType.Practice, label: "Practice" },
          { key: MatchType.Quals, label: "Qualifications" },
          { key: MatchType.Semi, label: "Semi-finals" },
          { key: MatchType.Finals, label: "Finals" },
        ]}
        className="col-span-2"
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
                cursor: cn(
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
