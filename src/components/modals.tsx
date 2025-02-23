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
import { modals } from "@mantine/modals";
import { useNavigate } from "@tanstack/react-router";
import { type ReactNode, useMemo, useState } from "react";

export function NewMatchModal({
  opened,
  onClose,
}: {
  opened: boolean;
  onClose: () => void;
}): ReactNode {
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
        value <= 0 || value > 99999 || !isNumberLike(value)
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
      to: "/scouting/$matchId/collect",
      params: { matchId: id },
    });
  };

  return (
    <>
      <Modal
        opened={opened}
        onClose={onClose}
        title="New Match"
        overlayProps={{
          backgroundOpacity: 0.55,
          blur: 3,
        }}
        transitionProps={{
          onEntered: () => {
            form.getInputNode("scouter")?.focus();
          },
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
          <NumberInput
            label="Match"
            {...form.getInputProps("matchNumber")}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                event.preventDefault();
                form.onSubmit(handleSubmit)();
              }
            }}
          />
          <Button type="submit" className="ml-auto mt-2">
            Go
          </Button>
        </form>
      </Modal>
    </>
  );
}

type modalPayload = Parameters<typeof modals.openConfirmModal>[0];

export function openDeleteModal(payload?: modalPayload) {
  modals.openConfirmModal({
    title: "Delete Match",
    children: "Are you sure you want to delete this match?",
    labels: {
      confirm: "Delete Match",
      cancel: "Cancel",
    },
    confirmProps: {
      color: "red",
    },
    ...payload,
  });
}

export function openExportModal(payload?: modalPayload) {
  modals.openConfirmModal({
    title: "Download Matches",
    children:
      "Are you sure you are ready to download? This will reset your data and clear all finished matches.",
    labels: {
      confirm: "Download",
      cancel: "Cancel",
    },
    ...payload,
  });
}
