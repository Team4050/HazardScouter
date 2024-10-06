import { NumberInput, SegmentedControl, TextInput } from "@/components/mantine";
import { idFromMatchData, matchDataCollection, set } from "@/data/db";
import {
  type MatchData,
  matchDataDefaults,
  matchDataSchema,
} from "@/data/games/shared";
import { useAppState } from "@/data/state";
import { useForm } from "@/hooks/useForm";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/scouting/_form/pre-match")({
  component: Page,
  loader: () => {
    useAppState.getState().setPageName("Pre-Match");
  },
});

function Page(): JSX.Element {
  const [allianceColor, setAllianceColor] = useState<"red" | "blue">(
    matchDataDefaults.alliance,
  );
  const collectionId = useAppState((state) => state.collectionId);
  const setCollectionId = useAppState((state) => state.setCollectionId);

  const form = useForm<MatchData>({
    initialValues:
      matchDataCollection.findOne({ id: collectionId }) || matchDataDefaults,
    schema: matchDataSchema,
    onValid: (values) => {
      const id = idFromMatchData(values);
      set(matchDataCollection, id, values);
      setCollectionId(id);
    },
  });

  form.watch("alliance", ({ value }) => {
    setAllianceColor(value);
  });

  return (
    <>
      <div className="grid md:grid-cols-2 gap-x-4 gap-y-2">
        <SegmentedControl
          className="col-span-full"
          label="Alliance"
          data={[
            { label: "Red", value: "red" },
            { label: "Blue", value: "blue" },
          ]}
          key={form.key("alliance")}
          fullWidth
          color={allianceColor}
          {...form.getInputProps("alliance")}
        />

        <TextInput
          label="Scouter Name"
          placeholder="Captain Safety"
          className="col-span-full"
          key={form.key("scouter")}
          {...form.getInputProps("scouter")}
        />

        <NumberInput
          label="Match Number"
          key={form.key("matchNumber")}
          inputMode="numeric"
          hideControls
          {...form.getInputProps("matchNumber")}
        />

        <TextInput
          label="Team Number"
          placeholder="4050"
          key={form.key("teamNumber")}
          inputMode="numeric"
          {...form.getInputProps("teamNumber")}
        />

        <SegmentedControl
          className="col-span-full"
          label="Match Type"
          data={[
            { label: "Practice", value: "practice" },
            { label: "Quals", value: "quals" },
            { label: "Semi", value: "semi" },
            { label: "Finals", value: "finals" },
          ]}
          key={form.key("matchType")}
          fullWidth
          color={allianceColor}
          {...form.getInputProps("matchType")}
        />

        <SegmentedControl
          className="col-span-full"
          label="Drive Position"
          key={form.key("drivePosition")}
          data={[
            { label: "Near", value: "near" },
            { label: "Middle", value: "middle" },
            { label: "Far", value: "far" },
          ]}
          color={allianceColor}
          {...form.getInputProps("drivePosition")}
        />
      </div>
    </>
  );
}
