import { phaseOrder, phaseRoutes } from "@/data/match";
import { useAppState } from "@/hooks/useAppState";
import { Button } from "@mantine/core";
import { useLocation, useNavigate } from "@tanstack/react-router";
import type { ReactNode } from "react";

export function FormNavigation({ matchId }: { matchId: string }): ReactNode {
  const navigate = useNavigate();
  const location = useLocation();
  const { isPhaseValid } = useAppState();

  const currentRouteIndex = phaseRoutes.findIndex((route) =>
    location.pathname.includes(route),
  );

  const firstPage = currentRouteIndex === 0;
  const lastPage = currentRouteIndex === phaseRoutes.length - 1;
  const pageIsValid = isPhaseValid(phaseOrder[currentRouteIndex]);

  const handleNext = () => {
    if (lastPage) {
      navigate({ to: "/scouting" });
    } else {
      navigate({
        to: `/scouting/$matchId/collect/${phaseRoutes[currentRouteIndex + 1]}`,
        params: { matchId },
      });
    }
  };

  const handlePrevious = () => {
    if (firstPage) {
      navigate({ to: "/scouting" });
    } else {
      navigate({
        to: `/scouting/$matchId/collect/${phaseRoutes[currentRouteIndex - 1]}`,
        params: { matchId },
      });
    }
  };

  return (
    <div className="flex justify-between md:h-auto h-14">
      <Button
        onClick={handlePrevious}
        size="compact-lg"
        className="w-40 h-full font-normal"
        color={firstPage ? "red" : "green"}
      >
        {firstPage ? "Exit" : "< Prev"}
      </Button>
      <Button
        onClick={handleNext}
        disabled={!pageIsValid}
        size="compact-lg"
        className="w-40 h-full font-normal"
      >
        {lastPage ? "Save" : "Next >"}
      </Button>
    </div>
  );
}
