import { Autocomplete, NumberInput } from "@/components/inputs";
import { type Match, matchCollection, newId, useReactivity } from "@/data/db";
import {
  ActionIcon,
  Button,
  LoadingOverlay,
  Modal,
  Table,
  isNumberLike,
} from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { IconPencil, IconTrash } from "@tabler/icons-react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";

export const Route = createFileRoute("/scouting/")({
  component: Page,
});

const tableHead = ["Match", "Team", "Scouter", "Started", "Finished"];

function Page(): JSX.Element {
  const navigate = useNavigate();
  const matches = useReactivity(() => matchCollection.find().fetch(), []);
  const [matchId, setMatchId] = useState<string | null>(null);

  const [newModalOpened, { open: openNewModal, close: closeNewModal }] =
    useDisclosure();
  const [
    deleteModalOpened,
    { open: openDeleteModal, close: closeDeleteModal },
  ] = useDisclosure();

  const scouters = useMemo(() => {
    return [...new Set(matches.map((match) => match.scouter))];
  }, [matches]);

  const teams = useMemo(() => {
    return [...new Set(matches.map((match) => match.teamNumber))];
  }, [matches]);

  const handleEdit = (id: string) => {
    navigate({ to: "/scouting/$matchId/pre-match", params: { matchId: id } });
  };

  const handleDelete = (id: string) => {
    setMatchId(id);
    openDeleteModal();
  };

  const handleOpen = (id: string) => {
    console.log("Open", id);
  };

  return (
    <>
      <NewMatchModal
        opened={newModalOpened}
        onClose={closeNewModal}
        scouters={scouters}
        teams={teams}
      />
      <DeleteModal
        opened={deleteModalOpened}
        matchId={matchId}
        onClose={closeDeleteModal}
      />

      <div className="flex mb-10">
        <div className="text-4xl flex-grow">Match List</div>
        <Button onClick={openNewModal}>Scout New Match</Button>
      </div>

      <Table highlightOnHover>
        <Table.Thead>
          <Table.Tr>
            {tableHead.map((head) => (
              <Table.Th key={head}>{head}</Table.Th>
            ))}
            <Table.Th className="w-0" />
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {matches.map(
            ({ id, matchNumber, teamNumber, scouter, started, finished }) => {
              return (
                <Table.Tr
                  key={id}
                  onClick={() => handleOpen(id)}
                  className="cursor-pointer"
                >
                  <Table.Td>{matchNumber}</Table.Td>
                  <Table.Td>{teamNumber}</Table.Td>
                  <Table.Td>{scouter}</Table.Td>
                  <Table.Td>
                    {new Date(started).toLocaleTimeString("en-US")}
                  </Table.Td>
                  <Table.Td>
                    {finished
                      ? new Date(finished).toLocaleTimeString()
                      : "In Progress"}
                  </Table.Td>
                  <Table.Td className="w-fit">
                    <ActionGroup
                      onClickEdit={() => handleEdit(id)}
                      onClickDelete={() => handleDelete(id)}
                    />
                  </Table.Td>
                </Table.Tr>
              );
            },
          )}
        </Table.Tbody>
      </Table>
    </>
  );
}

function ActionGroup({
  onClickEdit,
  onClickDelete,
}: { onClickEdit: () => void; onClickDelete: () => void }): JSX.Element {
  return (
    <div className="w-fit flex space-x-2">
      <ActionIcon
        onClick={(e) => {
          e.stopPropagation();
          onClickEdit();
        }}
        variant="subtle"
      >
        <IconPencil />
      </ActionIcon>
      <ActionIcon
        onClick={(e) => {
          e.stopPropagation();
          onClickDelete();
        }}
        variant="subtle"
        color="red"
      >
        <IconTrash />
      </ActionIcon>
    </div>
  );
}

function NewMatchModal({
  opened,
  onClose,
  scouters,
  teams,
}: {
  opened: boolean;
  onClose: () => void;
  scouters: string[];
  teams: number[];
}): JSX.Element {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

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
    navigate({ to: "/scouting/$matchId/pre-match", params: { matchId: id } });
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

function DeleteModal({
  opened,
  matchId,
  onClose,
}: {
  opened: boolean;
  matchId: string | null;
  onClose: () => void;
}): JSX.Element {
  const handleDelete = () => {
    if (matchId) {
      matchCollection.removeOne({ id: matchId });
    }
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
