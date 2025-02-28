import { Slider, Switch, Textarea } from "@/components/inputs";
import type { PhaseDataMap } from "@/data/db";
import { teamReviewDefaults, teamReviewSchema } from "@/data/match";
import { useForm } from "@/hooks/useForm";
import { Paper } from "@mantine/core";
import type { ReactNode } from "react";

type Props = {
  matchId: string;
  initialData?: PhaseDataMap["postMatch"];
};

export function PostMatch({ matchId, initialData }: Props): ReactNode {
  const form = useForm<"postMatch">({
    matchId,
    phase: "postMatch",
    initialValues: initialData || teamReviewDefaults,
    schema: teamReviewSchema,
  });

  return (
    <div className="grid gap-y-6">
      <div>
        <Slider label="Driver Rating" {...form.getInputProps("driverRating")} />
        <Slider
          label="Defense Rating"
          {...form.getInputProps("defenseRating")}
        />
        <Slider label="Speed Rating" {...form.getInputProps("speedRating")} />
      </div>

      <Paper
        className="flex flex-col px-1 py-2 md:p-4 mt-4 items-center w-fit mx-auto"
        shadow="md"
        radius="sm"
        bg="dark"
      >
        <div className="grid grid-cols-3 md:flex items-end gap-y-4 md:items-center *:flex-1 text-center">
          <Switch
            label="Died?"
            classNames={{ label: "flex-grow text-mtn-xs md:text-mtn-md" }}
            {...form.getInputProps("died")}
          />
          <Switch
            label="Unstable?"
            classNames={{ label: "flex-grow text-mtn-xs md:text-mtn-md" }}
            {...form.getInputProps("unstable")}
          />
          <Switch
            label="Dropped game pieces?"
            classNames={{ label: "flex-grow text-mtn-xs md:text-mtn-md" }}
            {...form.getInputProps("droppedGamePieces")}
          />
          <Switch
            label="Alliance potential?"
            classNames={{ label: "flex-grow text-mtn-xs md:text-mtn-md" }}
            {...form.getInputProps("goodAlliancePartner")}
          />
          <Switch
            label="E-Stopped?"
            classNames={{ label: "flex-grow text-mtn-xs md:text-mtn-md" }}
            {...form.getInputProps("eStopped")}
          />
          <Switch
            label="A-Stopped?"
            classNames={{ label: "flex-grow text-mtn-xs md:text-mtn-md" }}
            {...form.getInputProps("aStopped")}
          />
        </div>
      </Paper>

      <Textarea
        label="Comments"
        autosize
        minRows={4}
        classNames={{
          input: "text-mtn-xs mt-2",
        }}
        {...form.getInputProps("comments")}
      />
    </div>
  );
}
