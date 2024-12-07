import { Slider, Switch, Textarea } from "@/components/inputs";
import { useMatch } from "@/data/db";
import { teamReviewDefaults, teamReviewSchema } from "@/data/match";
import { useForm } from "@/hooks/useForm";
import { Paper } from "@mantine/core";

export function PostMatch({ matchId }: { matchId: string }): JSX.Element {
  const match = useMatch(matchId);

  const form = useForm<"postMatch">({
    matchId,
    phase: "postMatch",
    initialValues: match?.phases.postMatch || teamReviewDefaults,
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
        className="flex flex-col p-1 md:p-4 mt-4 items-center w-fit mx-auto"
        shadow="md"
        radius="sm"
        bg="dark"
      >
        <div>{match !== undefined ? match.teamNumber : "Unknown"}'s Robot</div>
        <div className="flex items-center justify-around *:flex-1 text-center">
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
            label="Dropped notes?"
            classNames={{ label: "flex-grow text-mtn-xs md:text-mtn-md" }}
            {...form.getInputProps("droppedNotes")}
          />
          <Switch
            label="Alliance potential?"
            classNames={{ label: "flex-grow text-mtn-xs md:text-mtn-md" }}
            {...form.getInputProps("goodAlliancePartner")}
          />
        </div>
      </Paper>

      <Textarea
        label="Comments"
        autosize
        minRows={4}
        classNames={{
          input: "text-mtn-xs",
        }}
        {...form.getInputProps("comments")}
      />
    </div>
  );
}
