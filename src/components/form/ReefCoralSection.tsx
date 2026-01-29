import { Counter } from "@/components/inputs";

type CoralLevel = {
  name: string;
  label: string;
  className?: string;
};

const coralLevels: CoralLevel[] = [
  {
    name: "reef.coralLevel4",
    label: "Coral Level 4",
    className: "mt-0 mb-0 sm:mb-auto",
  },
  { name: "reef.coralLevel3", label: "Coral Level 3" },
  { name: "reef.coralLevel2", label: "Coral Level 2" },
  {
    name: "reef.coralLevel1",
    label: "Coral Level 1",
    className: "mb-0 mt-0 sm:mt-auto",
  },
];

type ReefCoralSectionProps = {
  // biome-ignore lint/suspicious/noExplicitAny: Form types vary by phase
  form: { Field: any };
};

export function ReefCoralSection({ form }: ReefCoralSectionProps) {
  return (
    <>
      {coralLevels.map(({ name, label, className }) => (
        <form.Field key={name} name={name}>
          {(field: {
            state: { value: number };
            handleChange: (val: number) => void;
          }) => (
            <Counter
              label={label}
              className={className}
              max={12}
              value={field.state.value}
              onChange={(val) => field.handleChange(val)}
            />
          )}
        </form.Field>
      ))}
    </>
  );
}
