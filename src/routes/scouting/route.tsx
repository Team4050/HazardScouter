import { Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/scouting")({
  component: RouteComponent,
});

function RouteComponent() {
  // const theme = useMantineTheme();
  // const matchData = useReactivity(
  //   () => matchCollection.findOne({ id: "//todo" }),
  //   ["//todo"],
  // );
  // const [bannerRef, setBannerRef] = useState<HTMLDivElement | null>(null);
  // const showMatchBanner = matchData;

  return (
    <>
      {/* {showMatchBanner ? (
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
      ) : null} */}

      <div className="max-w-screen-lg mx-auto m-5 mt-0">
        {/* <div
          style={{
            height: showMatchBanner ? bannerRef?.clientHeight : undefined,
          }}
          className="md:mb-4"
        /> */}

        <Outlet />
      </div>
    </>
  );
}
