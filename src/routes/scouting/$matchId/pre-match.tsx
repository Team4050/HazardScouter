import { NumberInput, SegmentedControl, TextInput } from "@/components/inputs";
import { matchCollection, useReactivity } from "@/data/db";
import {
  Alliance,
  DrivePosition,
  MatchType,
  matchDataDefaults,
  matchDataSchema,
} from "@/data/match/shared";
import { useAppState } from "@/data/state";
import { useForm } from "@/hooks/useForm";
import { enumToSelectItem } from "@/util";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/scouting/$matchId/pre-match")({
  component: Page,
  loader: () => {
    useAppState.getState().setMatchPhase("preMatch");
  },
});

function Page(): JSX.Element {
  const [allianceColor, setAllianceColor] = useState<"red" | "blue">(
    matchDataDefaults.alliance,
  );
  const { matchId } = Route.useParams();
  const match = useReactivity(
    () => matchCollection.findOne({ id: matchId }),
    [matchId],
  );

  const form = useForm<"preMatch">({
    matchId,
    phase: "preMatch",
    initialValues: match?.phases.preMatch || matchDataDefaults,
    schema: matchDataSchema,
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
