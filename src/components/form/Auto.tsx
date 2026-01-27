import type { ReactNode } from "react";
import { Counter, Switch } from "@/components/inputs";
import type { PhaseDataMap } from "@/data/db";
import { autoDefaults, autoSchema } from "@/data/match";
import { useForm } from "@/hooks/useForm";
import { useIsMobile } from "@/hooks/useIsMobile";

type Props = {
  matchId: string;
  initialData?: PhaseDataMap["auto"];
};

export function Auto({ matchId, initialData }: Props): ReactNode {
  const isMobile = useIsMobile();
  const form = useForm<"auto">({
    matchId,
    phase: "auto",
    initialValues: initialData || autoDefaults,
    schema: autoSchema,
  });

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 grid-rows-4">
      <div className="row-span-full flex flex-col gap-y-5 my-auto md:gap-y-2">
        <form.Field name="leaveStartingLine">
          {(field) => (
            <Switch
              label="Left starting line"
              checked={field.state.value}
              onChange={(e) => field.handleChange(e.currentTarget.checked)}
            />
          )}
        </form.Field>
        <form.Field name="coralPreloaded">
          {(field) => (
            <Switch
              label="Coral preloaded"
              checked={field.state.value}
              onChange={(e) => field.handleChange(e.currentTarget.checked)}
            />
          )}
        </form.Field>
        <form.Field name="removedAlgae">
          {(field) => (
            <Switch
              label="Removed algae"
              checked={field.state.value}
              onChange={(e) => field.handleChange(e.currentTarget.checked)}
            />
          )}
        </form.Field>
        <form.Field name="processor">
          {(field) => (
            <Counter
              label="Processor Scores"
              max={99}
              value={field.state.value}
              onChange={(val) => field.handleChange(val)}
            />
          )}
        </form.Field>
        <form.Field name="net">
          {(field) => (
            <Counter
              label="Net Scores"
              max={99}
              value={field.state.value}
              onChange={(val) => field.handleChange(val)}
            />
          )}
        </form.Field>
      </div>

      <svg
        width="100%"
        height="100%"
        viewBox="0 0 44 225"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="row-span-full max-h-[500px] max-w-[250px] data-[mobile=true]:hidden"
        data-mobile={isMobile}
      >
        <path
          d="M3 221.5V182M41 3V29C41 33.4066 38.9253 37.556 35.4 40.2L8.6 60.3C5.07472 62.944 3 67.0934 3 71.5V182M3 182L41 156M3 122L41 96"
          stroke="#D115EB"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      <form.Field name="reef.coralLevel4">
        {(field) => (
          <Counter
            label="Coral Level 4"
            className="mt-0 mb-0 sm:mb-auto"
            max={12}
            value={field.state.value}
            onChange={(val) => field.handleChange(val)}
          />
        )}
      </form.Field>
      <form.Field name="reef.coralLevel3">
        {(field) => (
          <Counter
            label="Coral Level 3"
            max={12}
            value={field.state.value}
            onChange={(val) => field.handleChange(val)}
          />
        )}
      </form.Field>
      <form.Field name="reef.coralLevel2">
        {(field) => (
          <Counter
            label="Coral Level 2"
            max={12}
            value={field.state.value}
            onChange={(val) => field.handleChange(val)}
          />
        )}
      </form.Field>
      <form.Field name="reef.coralLevel1">
        {(field) => (
          <Counter
            label="Coral Level 1"
            className="mb-0 mt-0 sm:mt-auto"
            max={12}
            value={field.state.value}
            onChange={(val) => field.handleChange(val)}
          />
        )}
      </form.Field>
    </div>
  );
}
