import { matchDataCollection, useReactivity } from "@/data/db";
import { useAppState } from "@/data/state";
import { navbarHeight } from "@/styles/theme";
import { type Icon, cn } from "@/util";
import { Affix, Button, getThemeColor, useMantineTheme } from "@mantine/core";
import {
  IconDeviceGamepad2,
  IconListCheck,
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
import { useRef } from "react";

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
  const bannerRef = useRef<HTMLDivElement>(null);
  const theme = useMantineTheme();
  const collectionId = useAppState((state) => state.collectionId);

  const matchData = useReactivity(
    () => matchDataCollection.findOne({ id: collectionId }),
    [collectionId],
  );

  const currentRouteIndex = routes.findIndex((route) =>
    location.pathname.includes(route),
  );

  return (
    <>
      {matchData && currentRouteIndex !== 0 ? (
        <Affix
          position={{ top: navbarHeight }}
          className="w-full"
          ref={bannerRef}
        >
          <div
            className="sm:mx-auto sm:w-64 mx-5 rounded-b-xl shadow-2xl px-2 flex space-x-2 justify-center text-white text-2xl *:flex *:items-center *:space-x-1"
            style={{
              backgroundColor: getThemeColor(matchData.alliance, theme),
            }}
          >
            <div>
              <div>{matchData.matchType.toLocaleUpperCase()}:</div>
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
            height: matchData ? bannerRef.current?.clientHeight : undefined,
          }}
        />
        <Outlet />
        <div className="flex justify-between mt-5">
          <Button
            onClick={() =>
              navigate({ to: `/scouting/${routes[currentRouteIndex - 1]}` })
            }
            disabled={currentRouteIndex === 0}
            size="compact-lg"
            className={cn(
              "w-40 font-normal",
              currentRouteIndex === 0 ? "opacity-0" : null,
            )}
          >
            {"< Prev"}
          </Button>
          <Button
            onClick={() =>
              navigate({ to: `/scouting/${routes[currentRouteIndex + 1]}` })
            }
            disabled={
              currentRouteIndex === routes.length - 1 || !currentFormValid
            }
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
        <div className="mt-5">
          <pre>{collectionId}</pre>
        </div>
      </div>
    </>
  );
}
