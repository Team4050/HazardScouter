import { matchDataCollection, useReactivity } from "@/data/db";
import { useAppState } from "@/data/state";
import { navbarHeight } from "@/styles/theme";
import { type Icon, cn } from "@/util";
import { Affix, Button, getThemeColor, useMantineTheme } from "@mantine/core";
import {
  IconDeviceGamepad2,
  IconListCheck,
  IconListNumbers,
  IconRobot,
  IconRoute2,
  IconStopwatch,
  IconSwords,
} from "@tabler/icons-react";
import {
  Outlet,
  createFileRoute,
  useLocation,
  useNavigate,
} from "@tanstack/react-router";
import { useState } from "react";

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
  const currentFormValid = useAppState((state) => state.currentFormValid);
  const theme = useMantineTheme();
  const collectionId = useAppState((state) => state.collectionId);
  const matchData = useReactivity(
    () => matchDataCollection.findOne({ id: collectionId }),
    [collectionId],
  );
  const [bannerRef, setBannerRef] = useState<HTMLDivElement | null>(null);

  const currentRouteIndex = routes.findIndex((route) =>
    location.pathname.includes(route),
  );
  const canGoNext = currentRouteIndex !== routes.length - 1 && currentFormValid;
  const canGoPrevious = currentRouteIndex !== 0;
  const showMatchBanner = matchData && currentRouteIndex !== 0;

  return (
    <>
      {showMatchBanner ? (
        <Affix
          position={{ top: navbarHeight }}
          className="w-full"
          ref={setBannerRef}
        >
          <div
            className="w-fit max-w-full mx-auto rounded-b-xl shadow-2xl px-2 py-1.5 flex justify-center text-white text-2xl *:flex *:items-center *:gap-x-0.5 space-x-1.5 divide-x-2 divide-solid divide-y-0 leading-none middle-child:pl-1"
            style={{
              backgroundColor: getThemeColor(matchData.alliance, theme),
            }}
          >
            <div>
              <IconListNumbers />
              <div>{matchData.matchType.toLocaleUpperCase()}</div>
            </div>
            <div>
              <IconSwords />
              <div>{matchData.matchNumber}</div>
            </div>
            <div>
              <IconRobot />
              <div>{matchData.teamNumber}</div>
            </div>
          </div>
        </Affix>
      ) : null}

      <div className="max-w-screen-md mx-auto m-5 mt-0">
        <div
          style={{
            height: showMatchBanner ? bannerRef?.clientHeight : undefined,
          }}
        />

        <Outlet />

        <div className="flex justify-between mt-5">
          <Button
            onClick={() =>
              navigate({ to: `/scouting/${routes[currentRouteIndex - 1]}` })
            }
            disabled={!canGoPrevious}
            size="compact-lg"
            className={cn(
              "w-40 font-normal",
              canGoPrevious ? null : "opacity-0",
            )}
          >
            {"< Prev"}
          </Button>
          <Button
            onClick={() =>
              navigate({ to: `/scouting/${routes[currentRouteIndex + 1]}` })
            }
            disabled={!canGoNext}
            data-allow-next={currentRouteIndex !== routes.length - 1}
            size="compact-lg"
            className={cn(
              "w-40 font-normal",
              currentRouteIndex !== routes.length - 1 ? null : "opacity-0",
            )}
          >
            {"Next >"}
          </Button>
        </div>
      </div>
    </>
  );
}
