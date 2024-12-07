import { phaseOrder, phaseRoutes } from "@/data/match";
import { useAppState } from "@/data/state";
import { cn } from "@/util";
import { Button } from "@mantine/core";
import { useLocation, useNavigate, useRouter } from "@tanstack/react-router";

export function FormNavigation({ matchId }: { matchId: string }): JSX.Element {
  const navigate = useNavigate();
  const location = useLocation();
  const { history } = useRouter();
  const { isPhaseValid } = useAppState();

  const currentRouteIndex = phaseRoutes.findIndex((route) =>
    location.pathname.includes(route),
  );

  const canGoNext =
    currentRouteIndex !== phaseRoutes.length - 1 &&
    isPhaseValid(phaseOrder[currentRouteIndex]);
  const canGoPrevious = currentRouteIndex !== 0;
  const canExit = currentRouteIndex === 0;

  const handleNext = () => {
    if (!canGoNext) return;
    navigate({
      to: `/scouting/$matchId/collect/${phaseRoutes[currentRouteIndex + 1]}`,
      params: { matchId },
    });
  };

  const handlePrevious = () => {
    if (canExit) {
      history.go(-1);
    } else {
      navigate({
        to: `/scouting/$matchId/collect/${phaseRoutes[currentRouteIndex - 1]}`,
        params: { matchId },
      });
    }
  };

  return (
    <div className="flex justify-between mt-5">
      <Button
        onClick={handlePrevious}
        disabled={!canGoPrevious && !canExit}
        size="compact-lg"
        className="w-40 font-normal"
        color={canExit ? "red" : "green"}
      >
        {canExit ? "Exit" : "< Prev"}
      </Button>
      <div className="w-40">
        <Button
          onClick={handleNext}
          disabled={!canGoNext}
          data-allow-next={currentRouteIndex !== phaseRoutes.length - 1}
          size="compact-lg"
          className={cn(
            "w-full font-normal",
            currentRouteIndex !== phaseRoutes.length - 1 ? null : "opacity-0",
          )}
        >
          {"Next >"}
        </Button>
      </div>
    </div>
  );
}
