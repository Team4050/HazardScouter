import { type Match, matchCollection, newId, useReactivity } from "@/data/db";
import {
  Autocomplete,
  Button,
  LoadingOverlay,
  Modal,
  NumberInput,
  isNumberLike,
} from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";

export function NewMatchModal({
  opened,
  onClose,
}: {
  opened: boolean;
  onClose: () => void;
}): JSX.Element {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const matches = useReactivity(() => matchCollection.find().fetch(), []);

  const scouters = useMemo(() => {
    return [...new Set(matches.map((match) => match.scouter))];
  }, [matches]);

  const teams = useMemo(() => {
    return [...new Set(matches.map((match) => match.teamNumber))];
  }, [matches]);

  const form = useForm<Omit<Match, "started" | "finished" | "phases">>({
    mode: "uncontrolled",
    validate: {
      scouter: isNotEmpty("Scouter name is required"),
      matchNumber: (value) =>
        value <= 0 || value > 999 || !isNumberLike(value)
          ? "Invalid match number"
          : null,
      teamNumber: (value) =>
        value <= 0 || value > 9999 || !isNumberLike(value)
          ? "Invalid team number"
          : null,
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    setLoading(true);

    const id = newId();
    matchCollection.insert({
      id,
      ...values,
      started: new Date(),
      phases: {},
    });

    await new Promise((resolve) => setTimeout(resolve, 500));
    setLoading(false);

    onClose();
    navigate({
      to: "/scouting/$matchId/collect/pre-match",
      params: { matchId: id },
    });
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title="New Match"
      centered
      overlayProps={{
        backgroundOpacity: 0.55,
        blur: 3,
      }}
    >
      <LoadingOverlay visible={loading} />

      <form
        className="flex flex-col gap-y-2"
        onSubmit={form.onSubmit(handleSubmit, (errors) => {
          const firstErrorPath = Object.keys(errors)[0];
          form.getInputNode(firstErrorPath)?.focus();
        })}
      >
        <Autocomplete
          label="Scouter"
          data={scouters}
          {...form.getInputProps("scouter")}
        />
        <Autocomplete
          label="Team"
          data={teams.map((t) => t.toString())}
          inputMode="numeric"
          {...form.getInputProps("teamNumber")}
        />
        <NumberInput label="Match" {...form.getInputProps("matchNumber")} />
        {/* <NumberInput label="Team" {...form.getInputProps("teamNumber")} /> */}
        <Button type="submit" className="ml-auto mt-2">
          Go
        </Button>
      </form>
    </Modal>
  );
}

export function DeleteModal({
  opened,
  onClose,
  onDelete,
}: {
  opened: boolean;
  onClose: () => void;
  onDelete: () => void;
}): JSX.Element {
  const handleDelete = () => {
    onDelete();
    onClose();
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title="Delete Match"
      centered
      overlayProps={{
        backgroundOpacity: 0.55,
        blur: 3,
      }}
    >
      <div className="flex flex-col gap-y-4">
        <div>Are you sure you want to delete this match?</div>
        <div className="space-x-4 ml-auto">
          <Button color="red" variant="subtle" onClick={handleDelete}>
            Delete
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </div>
      </div>
    </Modal>
  );
}
