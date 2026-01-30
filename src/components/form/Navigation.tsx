import { useLocation, useNavigate } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { phaseOrder, phaseRoutes } from "@/data/match";
import { useAppState } from "@/hooks/useAppState";

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
    <div className="flex justify-between md:h-auto h-14 mx-1">
      <Button
        onClick={handlePrevious}
        className="w-40 h-full"
        variant={firstPage ? "destructive" : "default"}
      >
        {firstPage ? "Exit" : "< Prev"}
      </Button>
      <Button
        onClick={handleNext}
        disabled={!pageIsValid}
        className="w-40 h-full"
      >
        {lastPage ? "Save" : "Next >"}
      </Button>
    </div>
  );
}
