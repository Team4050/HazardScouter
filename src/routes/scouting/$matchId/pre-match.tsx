import { SegmentedControl } from "@/components/inputs";
import { matchCollection, useReactivity } from "@/data/db";
import {
  Alliance,
  DrivePosition,
  MatchType,
  preMatchDefaults,
  preMatchSchema,
} from "@/data/match/shared";
import { useAppState } from "@/data/state";
import { useForm } from "@/hooks/useForm";
import { enumToSelectItem } from "@/util";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/scouting/$matchId/pre-match")({
  component: Page,
  loader: () => {
    useAppState.getState().setMatchPhase("preMatch");
  },
});

function Page(): JSX.Element {
  const [allianceColor, setAllianceColor] = useState<
    "red" | "blue" | undefined
  >();
  const { matchId } = Route.useParams();

  const match = useReactivity(
    () => matchCollection.findOne({ id: matchId }),
    [matchId],
  );

  useEffect(() => {
    setAllianceColor(
      match?.phases.preMatch?.alliance || preMatchDefaults.alliance,
    );
  }, [match]);

  const form = useForm<"preMatch">({
    matchId,
    phase: "preMatch",
    initialValues: match?.phases.preMatch || preMatchDefaults,
    schema: preMatchSchema,
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
