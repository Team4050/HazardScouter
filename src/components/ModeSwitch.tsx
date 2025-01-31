import { cn } from "@/util";
import { Select } from "@mantine/core";
import { useLocation, useNavigate } from "@tanstack/react-router";
import type { ReactNode } from "react";

type Props = {
  className?: string;
  onChange?: () => void;
};

const options = [
  { label: "Scouting", value: "scouting" },
  { label: "Collecting", value: "collecting" },
];

export function ModeSwitch({ className, onChange }: Props): ReactNode {
  const location = useLocation();
  const navigate = useNavigate();

  const collectionRoute = location.pathname.includes("collecting");
  const scoutingRoute = location.pathname.includes("scouting");

  let mode: string | undefined;
  if (collectionRoute) mode = "collecting";
  if (scoutingRoute) mode = "scouting";

  const handleChange = (v: string | null) => {
    const values = options.map((o) => o.value);
    if (!v || !values.find((val) => val === v)) return;

    navigate({ to: `/${v}` });

    onChange?.();
  };

  return (
    <Select
      data={options}
      value={mode}
      onChange={handleChange}
      className={cn(
        "text-mtn-sm",
        !collectionRoute && !scoutingRoute ? "hidden" : "",
        className,
      )}
      allowDeselect={false}
      withCheckIcon={false}
    />
  );
}
