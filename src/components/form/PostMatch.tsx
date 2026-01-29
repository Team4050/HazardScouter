import type { ReactNode } from "react";
import { Slider, Switch, Textarea } from "@/components/inputs";
import type { PhaseDataMap } from "@/data/db";
import { teamReviewDefaults, teamReviewSchema } from "@/data/match";
import { useForm } from "@/hooks/useForm";

const sliderFields = [
  { name: "driverRating", label: "Driver Rating" },
  { name: "defenseRating", label: "Defense Rating" },
  { name: "speedRating", label: "Speed Rating" },
] as const;

const switchFields = [
  { name: "malfunctioned", label: "Died?" },
  { name: "unstable", label: "Unstable?" },
  { name: "droppedGamePieces", label: "Dropped game pieces?" },
  { name: "potentialPartner", label: "Alliance potential?" },
  { name: "eStopped", label: "E-Stopped?" },
  { name: "aStopped", label: "A-Stopped?" },
] as const;

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
        {sliderFields.map(({ name, label }) => (
          <form.Field key={name} name={name}>
            {(field) => (
              <Slider
                label={label}
                value={field.state.value}
                onChange={(val: number) => field.handleChange(val)}
              />
            )}
          </form.Field>
        ))}
      </div>

      <div className="flex flex-col px-1 py-2 sm:p-4 mt-4 items-center w-fit mx-auto bg-zinc-900 rounded-sm shadow-md">
        <div className="grid grid-cols-3 md:flex items-end gap-y-4 *:flex-1 text-center">
          {switchFields.map(({ name, label }) => (
            <form.Field key={name} name={name}>
              {(field) => (
                <Switch
                  label={label}
                  classNames={{ label: "flex-grow text-xs sm:text-base" }}
                  checked={field.state.value}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    field.handleChange(e.currentTarget.checked)
                  }
                />
              )}
            </form.Field>
          ))}
        </div>
      </div>

      <form.Field name="comments">
        {(field) => (
          <Textarea
            label="Comments"
            autosize
            minRows={4}
            classNames={{
              input: "text-sm mt-2",
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
