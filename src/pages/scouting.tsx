import { Select, SelectItem, Switch, Tab, Tabs } from "@nextui-org/react";
import clsx from "clsx";
import { Controller } from "react-hook-form";
import { useMediaQuery } from "usehooks-ts";

import Pager, { FormProps } from "../components/Pager";
import FormInput from "../components/form/Input";
import useCompiledData from "../hooks/useCompiledData";
import useForm from "../hooks/useForm";
import {
  Alliance,
  AutoDataType,
  DrivePosition,
  MatchType,
  PreMatchDataType,
  autoDataDefaults,
  autoDataSchema,
  preMatchDataDefaults,
  preMatchDataSchema,
} from "../store/schema";
import { useAutoStore, usePreMatchStore } from "../store/useDataStore";

const isDev = import.meta.env.DEV;

export default function Scouting(): JSX.Element {
  const isPhone = useMediaQuery("(max-width: 768px)");
  const data = useCompiledData();

  return (
    <div
      className={clsx(
        "mx-auto",
        isPhone ? "max-w-xl" : null,
        isDev ? "flex flex-row space-x-8 md:mx-20" : null,
      )}
    >
      <div className={clsx(isDev ? "md:w-1/2" : null)}>
        <Pager
          pages={[
            {
              title: "Pre-Match",
              form: PreMatch,
            },
            {
              title: "Autonomous",
              form: Auto,
            },
            {
              title: "Teleoperated",
              form: Teleop,
            },
            {
              title: "Endgame",
              form: Endgame,
            },
            {
              title: "Post-Match",
              form: PostMatch,
            },
          ]}
        />
      </div>
      {isDev ? (
        <div className="hidden md:block md:w-1/2 mt-10">
          <pre className="mx-10">{data}</pre>
        </div>
      ) : null}
    </div>
  );
}

function PreMatch({ onChanged }: FormProps): JSX.Element {
  const { setData, data: preMatchData } = usePreMatchStore();

  const { control, watch } = useForm<
    PreMatchDataType,
    typeof preMatchDataSchema
  >({
    setData,
    onChanged,
    defaultValues: preMatchData ?? preMatchDataDefaults,
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
            value={value}
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
          <div className="col-span-full md:flex flex-row space-x-2 text-center md:text-left">
            <div className="font-tech font-medium md:mb-0 mb-2">
              Driver Position
            </div>
            <Tabs
              fullWidth
              className="col-span-2"
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

function Auto({ onChanged }: FormProps): JSX.Element {
  const { setData, data: autoData } = useAutoStore();

  const { control } = useForm<AutoDataType, typeof autoDataSchema>({
    setData,
    onChanged,
    defaultValues: autoDataDefaults,
    schema: autoDataSchema,
  });

  return (
    <form className="grid grid-cols-4 gap-4">
      <Controller
        control={control}
        name="leaveStartingZone"
        render={({ field: { value, onChange } }) => (
          <Switch isSelected={value} onChange={onChange}>
            Left Starting Zone
          </Switch>
        )}
      />

      <FormInput
        type="number"
        label="Amp Scores"
        variant="faded"
        name="ampScores"
        className="col-span-2"
        control={control}
      />

      <FormInput
        type="number"
        label="Speaker Scores"
        variant="faded"
        name="speakerScores"
        className="col-span-2"
        control={control}
      />
    </form>
  );
}

function Teleop({ onChanged }: FormProps): JSX.Element {
  return <div>Teleop</div>;
}

function Endgame({ onChanged }: FormProps): JSX.Element {
  return <div>Endgame</div>;
}

function PostMatch({ onChanged }: FormProps): JSX.Element {
  return <div>Post-Match</div>;
}
