import { useAppState } from "@/data/state";
import type { Icon } from "@/util";
import { Button, Stepper as MStepper } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import {
  IconDeviceGamepad2,
  IconListCheck,
  IconRoute2,
  IconStopwatch,
} from "@tabler/icons-react";
import {
  Outlet,
  createFileRoute,
  useLocation,
  useNavigate,
} from "@tanstack/react-router";

export const Route = createFileRoute("/scouting/_form")({
  component: FormLayout,
});

type FormPageInfo = {
  icon: Icon;
  title: string;
  slug: string;
  description?: string;
};

const formPages: FormPageInfo[] = [
  {
    title: "Pre-Match",
    slug: "pre-match",
    icon: IconListCheck,
  },
  {
    title: "Auto",
    slug: "auto",
    icon: IconRoute2,
  },
  {
    title: "Teleop",
    slug: "teleop",
    icon: IconDeviceGamepad2,
  },
  {
    title: "Endgame",
    slug: "endgame",
    icon: IconStopwatch,
  },
  {
    title: "Post-Match",
    slug: "post-match",
    icon: IconListCheck,
  },
];

const routes = formPages.map((page) => page.slug);

function FormLayout(): JSX.Element {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPageValid = useAppState((state) => state.currentPageValid);

  const currentRouteIndex = routes.findIndex((route) =>
    location.pathname.includes(route),
  );

  return (
    <>
      <div className="container mx-auto max-w-screen-md m-5">
        <Outlet />
        <div className="flex justify-between mt-5">
          <Button
            onClick={() =>
              navigate({ to: `/scouting/${routes[currentRouteIndex - 1]}` })
            }
            disabled={currentRouteIndex === 0}
            size="compact-lg"
            classNames={{ label: "text-xs" }}
            className="w-40"
          >
            {"< Prev"}
          </Button>
          <Button
            onClick={() =>
              navigate({ to: `/scouting/${routes[currentRouteIndex + 1]}` })
            }
            disabled={
              currentRouteIndex === routes.length - 1 || !currentPageValid
            }
            size="compact-lg"
            className="w-40"
          >
            {"Next >"}
          </Button>
        </div>
      </div>
    </>
  );
}

type StepperProps = {
  steps: FormPageInfo[];
  currentStep: number;
  allowNextStep: boolean;
  onStepChange: (step: number) => void;
  className?: string;
};

function Stepper({
  steps,
  currentStep,
  onStepChange,
  allowNextStep,
  className,
}: StepperProps): JSX.Element {
  const mobile = useMediaQuery("(max-width: 768px)");

  return (
    <MStepper
      active={currentStep}
      onStepClick={onStepChange}
      className={className}
      size={mobile ? "xs" : "md"}
      wrap={false}
    >
      {steps.map((step) => (
        <MStepper.Step
          key={step.title.toLowerCase()}
          icon={<step.icon className="m-1 md:m-0.5" />}
          label={step.title}
          description={step.description}
        />
      ))}
    </MStepper>
  );
}
