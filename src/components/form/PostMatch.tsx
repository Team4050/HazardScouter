import type { ReactNode } from "react";
import { Slider, Switch, Textarea } from "@/components/inputs";
import type { PhaseDataMap } from "@/data/db";
import { teamReviewDefaults, teamReviewSchema } from "@/data/match";
import { useForm } from "@/hooks/useForm";

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
        <form.Field name="driverRating">
          {(field) => (
            <Slider
              label="Driver Rating"
              value={field.state.value}
              onChange={(val: number) => field.handleChange(val)}
            />
          )}
        </form.Field>
        <form.Field name="defenseRating">
          {(field) => (
            <Slider
              label="Defense Rating"
              value={field.state.value}
              onChange={(val: number) => field.handleChange(val)}
            />
          )}
        </form.Field>
        <form.Field name="speedRating">
          {(field) => (
            <Slider
              label="Speed Rating"
              value={field.state.value}
              onChange={(val: number) => field.handleChange(val)}
            />
          )}
        </form.Field>
      </div>

      <div className="flex flex-col px-1 py-2 sm:p-4 mt-4 items-center w-fit mx-auto bg-zinc-900 rounded-sm shadow-md">
        <div className="grid grid-cols-3 md:flex items-end gap-y-4 *:flex-1 text-center">
          <form.Field name="malfunctioned">
            {(field) => (
              <Switch
                label="Died?"
                classNames={{ label: "flex-grow text-mtn-xs sm:text-mtn-md" }}
                checked={field.state.value}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  field.handleChange(e.currentTarget.checked)
                }
              />
            )}
          </form.Field>
          <form.Field name="unstable">
            {(field) => (
              <Switch
                label="Unstable?"
                classNames={{ label: "flex-grow text-mtn-xs sm:text-mtn-md" }}
                checked={field.state.value}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  field.handleChange(e.currentTarget.checked)
                }
              />
            )}
          </form.Field>
          <form.Field name="droppedGamePieces">
            {(field) => (
              <Switch
                label="Dropped game pieces?"
                classNames={{ label: "flex-grow text-mtn-xs sm:text-mtn-md" }}
                checked={field.state.value}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  field.handleChange(e.currentTarget.checked)
                }
              />
            )}
          </form.Field>
          <form.Field name="potentialPartner">
            {(field) => (
              <Switch
                label="Alliance potential?"
                classNames={{ label: "flex-grow text-mtn-xs sm:text-mtn-md" }}
                checked={field.state.value}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  field.handleChange(e.currentTarget.checked)
                }
              />
            )}
          </form.Field>
          <form.Field name="eStopped">
            {(field) => (
              <Switch
                label="E-Stopped?"
                classNames={{ label: "flex-grow text-mtn-xs sm:text-mtn-md" }}
                checked={field.state.value}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  field.handleChange(e.currentTarget.checked)
                }
              />
            )}
          </form.Field>
          <form.Field name="aStopped">
            {(field) => (
              <Switch
                label="A-Stopped?"
                classNames={{ label: "flex-grow text-mtn-xs sm:text-mtn-md" }}
                checked={field.state.value}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  field.handleChange(e.currentTarget.checked)
                }
              />
            )}
          </form.Field>
        </div>
      </div>

      <form.Field name="comments">
        {(field) => (
          <Textarea
            label="Comments"
            autosize
            minRows={4}
            classNames={{
              input: "text-mtn-xs mt-2",
            }}
            value={field.state.value}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              field.handleChange(e.currentTarget.value)
            }
          />
        )}
      </form.Field>
    </div>
  );
}
