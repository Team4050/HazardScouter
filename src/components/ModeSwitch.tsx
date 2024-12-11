import { cn } from "@/util";
import { Select } from "@mantine/core";
import { useLocation, useNavigate } from "@tanstack/react-router";
import type { ReactNode } from "react";

type Props = {
  className?: string;
  onChange?: () => void;
};

export function ModeSwitch({ className, onChange }: Props): ReactNode {
  const location = useLocation();
  const navigate = useNavigate();

  const scanningRoute = location.pathname.includes("scanning");
  const collectionRoute = location.pathname.includes("scouting");
  const otherLocation = !(scanningRoute || collectionRoute);

  let mode: string | undefined;
  if (collectionRoute) mode = "scouting";
  if (scanningRoute) mode = "scanning";

  const handleChange = (v: string | null) => {
    if (!v) return;

    if (v === "scouting") {
      navigate({ to: "/scouting" });
    } else if (v === "scanning") {
      navigate({ to: "/scanning" });
    }

    onChange?.();
  };

  return (
    <Select
      data={[
        { label: "Scouting", value: "scouting" },
        { label: "Scanning", value: "scanning" },
      ]}
      value={mode}
      onChange={handleChange}
      className={cn(otherLocation ? "hidden" : "", className)}
    />
  );
}
