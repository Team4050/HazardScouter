import { Select, Switch } from "@/components/inputs";
import { matchCollection } from "@/data/db";
import { EndStatus, endGameDefaults, endGameSchema } from "@/data/match";
import { useForm } from "@/hooks/useForm";
import { enumToSelectItem } from "@/util";

export function Endgame({ matchId }: { matchId: string }): JSX.Element {
  const form = useForm<"endgame">({
    matchId,
    phase: "endgame",
    initialValues:
      matchCollection.findOne({ id: matchId })?.phases.endgame ||
      endGameDefaults,
    schema: endGameSchema,
  });

  return (
    <div className="grid gap-x-4 gap-y-2">
      <Select
        className="w-fit mx-auto"
        label="End Status"
        data={enumToSelectItem(EndStatus)}
        {...form.getInputProps("endStatus")}
      />
      <Switch
        label="Trap"
        {...form.getInputProps("trap", { type: "checkbox" })}
      />
    </div>
  );
}
