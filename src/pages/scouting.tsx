import Pager from "../components/Pager";
import { Alliance, MatchType, useDataStore } from "../data";
import clsx from "clsx";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Input,
  Select,
  SelectItem,
  Tab,
  Tabs,
} from "@nextui-org/react";
import FormInput from "../components/FormInput";

export default function Scouting(): JSX.Element {
  return (
    <div className="max-w-xl mx-auto">
      <Pager
        pages={[
          {
            title: "Pre-Match",
            component: <PreMatch />,
          },
          {
            title: "Auto",
            component: <Auto />,
          },
          {
            title: "Teleop",
            component: <Teleop />,
          },
          {
            title: "Endgame",
            component: <Endgame />,
          },
          {
            title: "Post-Match",
            component: <PostMatch />,
          },
        ]}
      />
    </div>
  );
}

const preMatchSchema = z.object({
  scouter: z.string().length(2),
  matchNumber: z.coerce.number().min(1).max(999),
  teamNumber: z.coerce.number().min(1),
  matchType: z.nativeEnum(MatchType),
  alliance: z.nativeEnum(Alliance),
  drivePosition: z.coerce.number().min(1).max(3),
});

function PreMatch(): JSX.Element {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<z.infer<typeof preMatchSchema>>({
    resolver: zodResolver(preMatchSchema),
    defaultValues: {
      scouter: "",
      matchNumber: 0,
      teamNumber: 0,
      matchType: MatchType.Practice,
      alliance: Alliance.Red,
      drivePosition: 1,
    },
  });

  const setPreMatchData = useDataStore((state) => state.setPreMatchData);

  const onSubmit = (values: z.infer<typeof preMatchSchema>) => {
    setPreMatchData(values);
  };

  return (
    <form
      className="grid grid-cols-2 gap-4"
      onSubmit={(e) => {
        handleSubmit(onSubmit)(e);
        console.log(errors);
      }}
    >
      <Controller
        control={control}
        name="alliance"
        render={({ field: { value, onChange } }) => (
          <Tabs
            fullWidth
            className="col-span-2"
            classNames={{
              cursor: clsx(
                value === Alliance.Red ? "bg-red-500" : "bg-blue-500"
              ),
            }}
            selectedKey={value}
            onSelectionChange={(key) => onChange(key)}
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
        control={control}
        isClearable
      />

      <FormInput
        type="number"
        label="Match Number"
        variant="faded"
        name="matchNumber"
        control={control}
        isClearable
      />

      <FormInput
        type="number"
        label="Team Number"
        variant="faded"
        name="teamNumber"
        control={control}
        isClearable
      />

      <Controller
        control={control}
        name="matchType"
        render={({ field: { value, onChange } }) => (
          <Select
            label="Match Type"
            value={value}
            onChange={(e) => onChange(e.target.value as MatchType)}
          >
            <SelectItem key={MatchType.Practice}>Practice</SelectItem>
            <SelectItem key={MatchType.Quals}>Qualifications</SelectItem>
            <SelectItem key={MatchType.Semi}>Semi-finals</SelectItem>
            <SelectItem key={MatchType.Finals}>Finals</SelectItem>
          </Select>
        )}
      />

      <Button type="submit">Submit</Button>
    </form>
  );
}

function Auto(): JSX.Element {
  return <div>Auto</div>;
}

function Teleop(): JSX.Element {
  return <div>Teleop</div>;
}

function Endgame(): JSX.Element {
  return <div>Endgame</div>;
}

function PostMatch(): JSX.Element {
  return <div>Post-Match</div>;
}
