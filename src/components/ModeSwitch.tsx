import { CameraIcon, TableCellsIcon } from "@heroicons/react/20/solid";
import { Switch } from "@nextui-org/react";
import { useLocation, useNavigate } from "react-router-dom";

export default function ModeSwitch(): JSX.Element {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <Switch
      defaultSelected
      size="lg"
      startContent={<TableCellsIcon />}
      endContent={<CameraIcon />}
      isSelected={!location.pathname.includes("scanning")}
      classNames={{
        wrapper: "bg-primary",
        startContent: "text-white",
        endContent: "text-white",
      }}
      onClick={() => {
        if (location.pathname.includes("scouting")) {
          navigate("/scanning");
        } else {
          navigate("/scouting");
        }
      }}
    />
  );
}
