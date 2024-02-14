import { CheckIcon, XMarkIcon } from "@heroicons/react/20/solid";
import {
  Checkbox,
  Select,
  SelectItem,
  Switch,
  Tab,
  Tabs,
} from "@nextui-org/react";
import clsx from "clsx";
import { Controller } from "react-hook-form";
import { useMediaQuery } from "usehooks-ts";

import Pager, { FormProps } from "../components/Pager";
import { Counter } from "../components/form/Counter";
import FormInput from "../components/form/Input";
import useCompiledData from "../hooks/useCompiledData";
import useForm from "../hooks/useForm";
import {
  Alliance,
  AutoData,
  DrivePosition,
  MatchType,
  PickupType,
  PreMatchData,
  TeleopData,
  autoDataDefaults,
  autoDataSchema,
  preMatchDataDefaults,
  preMatchDataSchema,
  teleopDataDefaults,
  teleopDataSchema,
} from "../store/schema";
import {
  useAutoStore,
  usePreMatchStore,
  useTeleopStore,
} from "../store/useDataStore";

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

  const { control, watch } = useForm<PreMatchData, typeof preMatchDataSchema>({
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

  const { control } = useForm<AutoData, typeof autoDataSchema>({
    setData,
    onChanged,
    defaultValues: autoData ?? autoDataDefaults,
    schema: autoDataSchema,
  });

  return (
    <form className="flex flex-col space-y-4 text-center [&>*]:mx-auto">
      <Controller
        control={control}
        name="leaveStartingZone"
        render={({ field: { value, onChange } }) => (
          <div className="flex flex-col space-y-2">
            <div className="my-auto text-lg">Left Starting Zone</div>
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

function Teleop({ onChanged }: FormProps): JSX.Element {
  const { setData, data: teleData } = useTeleopStore();

  const { control } = useForm<TeleopData, typeof teleopDataSchema>({
    setData,
    onChanged,
    defaultValues: teleData ?? teleopDataDefaults,
    schema: teleopDataSchema,
  });

  return (
    <form className="flex flex-col space-y-4 text-center [&>*]:mx-auto">
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

      <Controller
        control={control}
        name="timesAmplified"
        render={({ field: { value, onChange } }) => (
          <Counter label="Times Amplified" value={value} onChange={onChange} />
        )}
      />

      <Controller
        control={control}
        name="pickupType"
        render={({ field: { value, onChange } }) => (
          <Select
            label="Pickup Type"
            selectedKeys={[value]}
            onChange={(e) => onChange(e.target.value as PickupType)}
            className="max-w-[300px]"
          >
            <SelectItem key={PickupType.None}>None</SelectItem>
            <SelectItem key={PickupType.Floor}>Floor</SelectItem>
            <SelectItem key={PickupType.Source}>Source</SelectItem>
            <SelectItem key={PickupType.Both}>Floor + Source</SelectItem>
          </Select>
        )}
      />
    </form>
  );
}

function Endgame({ onChanged }: FormProps): JSX.Element {
  return <div>Endgame</div>;
}

function PostMatch({ onChanged }: FormProps): JSX.Element {
  return <div>Post-Match</div>;
}
