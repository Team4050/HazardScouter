import { cn } from "@/util";
import { Select } from "@mantine/core";
import { useLocation, useNavigate } from "@tanstack/react-router";

type Props = {
  className?: string;
  onChange?: () => void;
};

export function ModeSwitch({ className, onChange }: Props): JSX.Element {
  const location = useLocation();
  const navigate = useNavigate();

  const scanningRoute = location.pathname.includes("scanning");
  const collectionRoute = location.pathname.includes("collection");
  const otherLocation = !(scanningRoute || collectionRoute);

  let mode: string | undefined;
  if (collectionRoute) mode = "collection";
  if (scanningRoute) mode = "scanning";

  const handleChange = (v: string | null) => {
    if (!v) return;

    if (v === "collection") {
      navigate({ to: "/collection" });
    } else if (v === "scanning") {
      navigate({ to: "/scanning" });
    }

    onChange?.();
  };

  return (
    <Select
      data={[
        { label: "Collection", value: "collection" },
        { label: "Scanning", value: "scanning" },
      ]}
      value={mode}
      onChange={handleChange}
      className={cn(otherLocation ? "hidden" : "", className)}
    />
  );
}
