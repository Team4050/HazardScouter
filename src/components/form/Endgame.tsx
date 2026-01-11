import type { ReactNode } from "react";
import { Select } from "@/components/inputs";
import type { PhaseDataMap } from "@/data/db";
import { EndStatus, endGameDefaults, endGameSchema } from "@/data/match";
import { useForm } from "@/hooks/useForm";
import { enumToSelectItem } from "@/util";

type Props = {
  matchId: string;
  initialData?: PhaseDataMap["endgame"];
};

export function Endgame({ matchId, initialData }: Props): ReactNode {
  const form = useForm<"endgame">({
    matchId,
    phase: "endgame",
    initialValues: initialData || endGameDefaults,
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
    </div>
  );
}
