import { IconRefreshAlert } from "@tabler/icons-react";
import { useLocation, useNavigate } from "@tanstack/react-router";
import { type ReactNode, useMemo } from "react";
import { AppLogo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { phaseSlugToTitle } from "@/data/match";
import { useIsScoutingTablet } from "@/hooks/useIsMobile";
import { usePWAUpdater } from "@/hooks/usePWAUpdater";

const NAVBAR_HEIGHT = 60;

type LayoutProps = {
  content: ReactNode;
};

export function Layout({ content }: LayoutProps): ReactNode {
  const isTablet = useIsScoutingTablet();
  const navigate = useNavigate();
  const path = useLocation({ select: (state) => state.pathname });
  const { needRefresh, forceUpdate } = usePWAUpdater();

  const matchPhaseTitle = useMemo(() => {
    const matchedPath = path.match(/\/scouting\/[^/]*\/collect\/(.*)/);

    let title = "Scouting";
    if (matchedPath && matchedPath.length === 2) {
      title = phaseSlugToTitle(matchedPath[1]);
    }

    return title;
  }, [path]);

  return (
    <div className="min-h-screen flex flex-col">
      <header
        className="flex items-center px-2 border-b bg-background"
        style={{ height: NAVBAR_HEIGHT }}
      >
        <div className="flex-1 flex justify-start h-full">
          <AppLogo
            className="py-0.5 flex"
            classNames={{ text: "sm:block hidden" }}
            onClick={() => navigate({ to: "/" })}
          />
        </div>
        <div className="flex-1 flex justify-center">
          <h1 className="text-2xl lg:text-4xl leading-none text-center font-heading">
            {matchPhaseTitle}
          </h1>
        </div>
        <div className="flex-1 flex justify-end items-center gap-2">
          {isTablet ? (
            <span className="opacity-50">{__COMMIT_HASH__}</span>
          ) : (
            <Button
              className="hidden lg:block text-primary"
              variant="ghost"
              onClick={() => navigate({ to: "/admin" })}
              size="lg"
            >
              Scouting Admin
            </Button>
          )}
          {needRefresh ? (
            <button
              type="button"
              className="p-2 hover:bg-accent rounded-md transition-colors"
              onClick={forceUpdate}
            >
              <IconRefreshAlert className="h-5 w-5" />
            </button>
          ) : null}
        </div>
      </header>

      <main
        className="flex-1 max-w-5xl mx-auto w-full p-2 md:p-4"
        style={{ minHeight: `calc(100dvh - ${NAVBAR_HEIGHT}px)` }}
      >
        {content}
      </main>
    </div>
  );
}
