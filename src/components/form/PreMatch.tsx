import type { ReactNode } from "react";
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

type Props = {
  matchId: string;
  initialData?: PhaseDataMap["preMatch"];
};

export function PreMatch({ matchId, initialData }: Props): ReactNode {
  const form = useForm<"preMatch">({
    matchId,
    phase: "preMatch",
    initialValues: initialData || preMatchDefaults,
    schema: preMatchSchema,
  });

  return (
    <div className="grid md:grid-cols-2 gap-x-4 gap-y-2">
      <form.Field name="alliance">
        {(field) => (
          <SegmentedControl
            className="col-span-full"
            label="Alliance"
            data={enumToSelectItem(Alliance)}
            fullWidth
            color={field.state.value}
            value={field.state.value}
            onChange={(val) => field.handleChange(val as Alliance)}
          />
        )}
      </form.Field>

      <form.Field name="matchType">
        {(field) => (
          <form.Subscribe selector={(state) => state.values.alliance}>
            {(alliance) => (
              <SegmentedControl
                className="col-span-full"
                label="Match Type"
                data={enumToSelectItem(MatchType)}
                fullWidth
                color={alliance}
                value={field.state.value}
                onChange={(val) => field.handleChange(val as MatchType)}
              />
            )}
          </form.Subscribe>
        )}
      </form.Field>

      <form.Field name="drivePosition">
        {(field) => (
          <form.Subscribe selector={(state) => state.values.alliance}>
            {(alliance) => (
              <SegmentedControl
                className="col-span-full"
                label="Drive Position"
                data={enumToSelectItem(DrivePosition)}
                fullWidth
                color={alliance}
                value={field.state.value}
                onChange={(val) => field.handleChange(val as DrivePosition)}
              />
            )}
          </form.Subscribe>
        )}
      </form.Field>
    </div>
  );
}
