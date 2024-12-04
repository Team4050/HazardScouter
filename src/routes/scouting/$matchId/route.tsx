import { matchCollection } from "@/data/db";
import { phaseDetails, phaseOrder } from "@/data/match";
import { FormProvider, useFormContext } from "@/providers/Form";
import { cn } from "@/util";
import { Button } from "@mantine/core";
import {
  Outlet,
  createFileRoute,
  notFound,
  useLocation,
  useNavigate,
} from "@tanstack/react-router";

export const Route = createFileRoute("/scouting/$matchId")({
  component: Page,
  loader: async ({ params: { matchId } }) => {
    if (matchCollection.findOne({ id: matchId }) === undefined) {
      throw notFound();
    }
  },
  notFoundComponent: NotFound,
});

const routes = phaseOrder.map((phase) => phaseDetails[phase].slug);

function Page(): JSX.Element {
  return (
    <>
      <FormProvider>
        <Outlet />
        <FormNavigation />
      </FormProvider>
    </>
  );
}

function NotFound(): JSX.Element {
  const { matchId } = Route.useParams();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center space-y-5">
      <div>Match '{matchId}' not found...</div>
      <Button onClick={() => navigate({ to: "/scouting" })}>
        {"< Go Back"}
      </Button>
    </div>
  );
}

function FormNavigation(): JSX.Element {
  const { matchId } = Route.useParams();

  const navigate = useNavigate();
  const location = useLocation();

  const { isCurrentPageValid: isValid } = useFormContext();

  const currentRouteIndex = routes.findIndex((route) =>
    location.pathname.includes(route),
  );
  const canGoNext = currentRouteIndex !== routes.length - 1 && isValid;
  const canGoPrevious = currentRouteIndex !== 0;

  const handleNext = () => {
    if (!canGoNext) return;
    navigate({
      to: `/scouting/$matchId/${routes[currentRouteIndex + 1]}`,
      params: { matchId },
    });
  };

  const handlePrevious = () => {
    navigate({
      to: `/scouting/$matchId/${routes[currentRouteIndex - 1]}`,
      params: { matchId },
    });
  };

  return (
    <div className="flex justify-between mt-5">
      <Button
        onClick={handlePrevious}
        disabled={!canGoPrevious}
        size="compact-lg"
        className={cn("w-40 font-normal", canGoPrevious ? null : "opacity-0")}
      >
        {"< Prev"}
      </Button>
      <div className="w-40">
        <Button
          onClick={handleNext}
          disabled={!canGoNext}
          data-allow-next={currentRouteIndex !== routes.length - 1}
          size="compact-lg"
          className={cn(
            "w-full font-normal",
            currentRouteIndex !== routes.length - 1 ? null : "opacity-0",
          )}
        >
          {"Next >"}
        </Button>
      </div>
    </div>
  );
}
