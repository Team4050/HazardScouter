import { Counter, Select } from "@/components/inputs";
import { matchCollection } from "@/data/db";
import { PickupType, teleopDefaults, teleopSchema } from "@/data/match";
import { useForm } from "@/hooks/useForm";
import { enumToSelectItem } from "@/util";

export function Teleop({ matchId }: { matchId: string }): JSX.Element {
  const form = useForm<"teleop">({
    matchId,
    phase: "teleop",
    initialValues:
      matchCollection.findOne({ id: matchId })?.phases.teleop || teleopDefaults,
    schema: teleopSchema,
  });

  return (
    <div className="grid gap-x-4 gap-y-2">
      <Counter label="Amp Scores" {...form.getInputProps("ampScores")} />
      <Counter
        label="Speaker Scores"
        {...form.getInputProps("speakerScores")}
      />
      <Counter
        label="Times Amplified"
        {...form.getInputProps("timesAmplified")}
      />
      <Select
        label="Pickup Type"
        className="w-fit mx-auto"
        data={enumToSelectItem(PickupType)}
        {...form.getInputProps("pickupType")}
      />
    </div>
  );
}
