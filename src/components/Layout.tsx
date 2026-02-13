import { useLocation, useNavigate } from "@tanstack/react-router";
import { type ReactNode, useMemo } from "react";
import { AppLogo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { phaseSlugToTitle } from "@/data/match";
import { usePWAUpdater } from "@/hooks/usePWAUpdater";

const NAVBAR_HEIGHT = 60;

type LayoutProps = {
  content: ReactNode;
};

export function Layout({ content }: LayoutProps): ReactNode {
  const navigate = useNavigate();
  const path = useLocation({ select: (state) => state.pathname });
  usePWAUpdater();

  const matchPhaseTitle = useMemo(() => {
    const matchedPath = path.match(/\/scouting\/[^/]*\/collect\/(.*)/);

    let title = "Scouting";
    if (matchedPath && matchedPath.length === 2) {
      title = phaseSlugToTitle(matchedPath[1]);
    }

    return title;
  }, [path]);

  return (
    <div
      className="min-h-dvh flex flex-col"
      style={{ minHeight: `calc(100dvh - ${NAVBAR_HEIGHT}px)` }}
    >
      <header
        className="flex items-center px-2 border-b-2 bg-background select-none"
        style={{ height: NAVBAR_HEIGHT }}
      >
        <div className="flex-1 flex justify-start h-full">
          <AppLogo
            className="py-1 flex"
            classNames={{ text: "sm:block hidden" }}
            onClick={() => navigate({ to: "/" })}
          />
        </div>
        <div className="flex-1 flex justify-center">
          <h1 className="text-3xl lg:text-4xl leading-none text-center">
            {matchPhaseTitle}
          </h1>
        </div>
        <div className="flex-1 flex justify-end items-center gap-2">
          <span className="lg:hidden block opacity-50">{__COMMIT_HASH__}</span>
          <Button
            className="hidden lg:block text-primary py-0 px-2"
            variant="ghost"
            onClick={() => navigate({ to: "/admin" })}
          >
            Scouting Admin
          </Button>
        </div>
      </header>

      <main className="flex-1 flex flex-col max-w-5xl mx-auto w-full p-2 overflow-y-auto">
        {content}
      </main>
    </div>
  );
}
