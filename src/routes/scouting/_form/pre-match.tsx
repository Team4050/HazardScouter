import { NumberInput, SegmentedControl, TextInput } from "@/components/mantine";
import { idFromMatchData, matchDataCollection, set } from "@/data/db";
import {
  Alliance,
  DrivePosition,
  type MatchData,
  MatchType,
  matchDataDefaults,
  matchDataSchema,
} from "@/data/games/shared";
import { useAppState } from "@/data/state";
import { useForm } from "@/hooks/useForm";
import { enumToSelectItem } from "@/util";
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
    <div className="grid md:grid-cols-2 gap-x-4 gap-y-2">
      <SegmentedControl
        className="col-span-full"
        label="Alliance"
        data={enumToSelectItem(Alliance)}
        fullWidth
        color={allianceColor}
        {...form.getInputProps("alliance")}
      />

      <TextInput
        label="Scouter Name"
        placeholder="Captain Safety"
        className="col-span-full"
        {...form.getInputProps("scouter")}
      />

      <NumberInput
        label="Match Number"
        inputMode="numeric"
        hideControls
        {...form.getInputProps("matchNumber")}
      />

      <TextInput
        label="Team Number"
        placeholder="4050"
        inputMode="numeric"
        {...form.getInputProps("teamNumber")}
      />

      <SegmentedControl
        className="col-span-full"
        label="Match Type"
        data={enumToSelectItem(MatchType)}
        fullWidth
        color={allianceColor}
        {...form.getInputProps("matchType")}
      />

      <SegmentedControl
        className="col-span-full"
        label="Drive Position"
        data={enumToSelectItem(DrivePosition)}
        color={allianceColor}
        {...form.getInputProps("drivePosition")}
      />
    </div>
  );
}
