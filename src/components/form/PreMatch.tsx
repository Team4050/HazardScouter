import { SegmentedControl } from "@/components/inputs";
import type { PhaseDataMap } from "@/data/db";
import {
  Alliance,
  DrivePosition,
  MatchType,
  preMatchDefaults,
  preMatchSchema,
} from "@/data/match";
import { useForm } from "@/hooks/useForm";
import { enumToSelectItem } from "@/util";
import { type ReactNode, useEffect, useState } from "react";

type Props = {
  matchId: string;
  initialData?: PhaseDataMap["preMatch"];
};

export function PreMatch({ matchId, initialData }: Props): ReactNode {
  const [allianceColor, setAllianceColor] = useState<
    "red" | "blue" | undefined
  >();

  useEffect(() => {
    setAllianceColor(initialData?.alliance || preMatchDefaults.alliance);
  }, [initialData]);

  const form = useForm<"preMatch">({
    matchId,
    phase: "preMatch",
    initialValues: initialData || preMatchDefaults,
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
