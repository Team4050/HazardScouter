import { Select, SelectItem, Tab, Tabs } from "@nextui-org/react";
import clsx from "clsx";
import { Controller } from "react-hook-form";

import Pager, { FormOnChanged } from "../components/Pager";
import FormInput from "../components/form/Input";
import useForm from "../hooks/useForm";
import {
  Alliance,
  MatchType,
  PreMatchDataType,
  preMatchDataDefaults,
  preMatchDataSchema,
} from "../store/schema";
import { usePreMatchStore } from "../store/useDataStore";

export default function Scouting(): JSX.Element {
  return (
    <div className="mx-auto max-w-xl">
      <Pager
        pages={[
          {
            title: "Pre-Match",
            form: (onChanged) => <PreMatch onChanged={onChanged} />,
          },
          {
            title: "Autonomous",
            // component: <Auto />,
            form: (onChanged) => <div></div>,
          },
          {
            title: "Teleoperated",
            form: (onChanged) => <Teleop onChanged={onChanged} />,
          },
          {
            title: "Endgame",
            form: (onChanged) => <Endgame onChanged={onChanged} />,
          },
          {
            title: "Post-Match",
            form: (onChanged) => <PostMatch onChanged={onChanged} />,
          },
        ]}
      />

      {/* {import.meta.env.DEV && (
        <div className="mt-10 max-w-28 mx-auto">
          <pre>{JSON.stringify(preMatchData, null, 2)}</pre>
        </div>
      )} */}
    </div>
  );
}

type SharedPageProps = {
  onChanged: FormOnChanged;
};

function PreMatch({ onChanged }: SharedPageProps): JSX.Element {
  const { setData, data: preMatchData } = usePreMatchStore();

  const { control, watch } = useForm<
    PreMatchDataType,
    typeof preMatchDataSchema
  >({
    setData,
    onChanged,
    defaultValues: preMatchData,
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

      <div className="col-span-full md:flex flex-row space-x-2 text-center md:text-left">
        <div className="font-tech font-medium md:mb-0 mb-2">
          Driver Position
        </div>
        <Controller
          control={control}
          name="drivePosition"
          render={({ field: { value, onChange } }) => (
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
              <Tab key={1} title="Position 1" />
              <Tab key={2} title="Position 2" />
              <Tab key={3} title="Position 3" />
            </Tabs>
          )}
        />
      </div>
    </form>
  );
}

// function Auto(): JSX.Element {
//   const { auto } = useDataStore();

//   const {
//     handleSubmit,
//     control,
//     formState: { errors, isDirty },
//     watch,
//     reset,
//   } = useForm<AutoData>({
//     mode: "onTouched",
//     resolver: zodResolver(preMatchDataSchema),
//     defaultValues: auto ?? {
//       leaveStartingZone: false,
//       ampScores: 0,
//       speakerScores: 0,
//     },
//   });

//   const onSubmit = (data: AutoData) => {
//     // TODO

//     console.log(data);
//   };

//   return (
//     <form
//       className="grid grid-cols-2 gap-4"
//       onSubmit={(e) => {
//         handleSubmit(onSubmit)(e);

//         if (errors) console.log(errors);
//       }}
//     >
//       {/* <Counter control={control} name="Amp Scores" /> */}
//     </form>
//   );
// }

function Teleop({ onChanged }: SharedPageProps): JSX.Element {
  return <div>Teleop</div>;
}

function Endgame({ onChanged }: SharedPageProps): JSX.Element {
  return <div>Endgame</div>;
}

function PostMatch({ onChanged }: SharedPageProps): JSX.Element {
  return <div>Post-Match</div>;
}
