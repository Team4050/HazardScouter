import { Slider, Switch, Textarea } from "@/components/inputs";
import {
  matchDataCollection,
  postMatchCollection,
  set,
  useReactivity,
} from "@/data/db";
import {
  type PostMatch,
  postMatchDefaults,
  postMatchSchema,
} from "@/data/games/shared";
import { useAppState } from "@/data/state";
import { useForm } from "@/hooks/useForm";
import { Paper } from "@mantine/core";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/scouting/_form/post-match")({
  beforeLoad: async () => {
    if (useAppState.getState().collectionId === undefined) {
      throw redirect({ to: "/scouting/pre-match" });
    }
    useAppState.getState().setPageName("Post Match");
  },
  component: Page,
});

function Page(): JSX.Element {
  const collectionId = useAppState((state) => state.collectionId);
  const teamNumber = useReactivity(
    () => matchDataCollection.findOne({ id: collectionId })?.teamNumber,
    [collectionId],
  );

  if (!collectionId) {
    throw new Error("Collection ID not set");
  }

  const form = useForm<PostMatch>({
    initialValues:
      postMatchCollection.findOne({ id: collectionId }) || postMatchDefaults,
    schema: postMatchSchema,
    onValid: (values) => {
      set(postMatchCollection, collectionId, values);
    },
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
        <div>{teamNumber}'s Robot</div>
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
