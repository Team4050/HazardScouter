import { AppLogo } from "@/components/Logo";
import { phaseSlugToTitle } from "@/data/match";
import { useIsScoutingTablet } from "@/hooks/useIsMobile";
import { usePWAUpdater } from "@/hooks/usePWAUpdater";
import { navbarHeight } from "@/styles/theme";
import { ActionIcon, AppShell, Button, Title } from "@mantine/core";
import { IconRefreshAlert } from "@tabler/icons-react";
import { useLocation, useNavigate } from "@tanstack/react-router";
import { type ReactNode, useMemo } from "react";

type LayoutProps = {
  content: ReactNode;
};

export function Layout({ content }: LayoutProps): ReactNode {
  const isTablet = useIsScoutingTablet();
  const navigate = useNavigate();
  const path = useLocation({ select: (state) => state.pathname });
  const { needRefresh, forceUpdate } = usePWAUpdater();

  const matchPhaseTitle = useMemo(() => {
    const matchedPath = path.match(/\/scouting\/[^\/]*\/collect\/(.*)/);

    let title = "Scouting";
    if (matchedPath && matchedPath.length === 2) {
      title = phaseSlugToTitle(matchedPath[1]);
    }

    return title;
  }, [path]);

  return (
    <>
      <AppShell header={{ height: navbarHeight }} padding="sm">
        <AppShell.Header className="flex items-center px-2 first-child:mr-auto first-child:justify-start last-child:justify-end last-child:ml-auto middle-child:justify-center">
          <AppLogo
            className="py-0.5 flex-1 flex"
            classNames={{ text: "sm:block hidden" }}
            onClick={() => navigate({ to: "/" })}
          />
          <div className="flex-1 flex">
            <Title className="text-2xl lg:text-4xl leading-none text-center">
              {matchPhaseTitle}
            </Title>
          </div>
          <div className="flex-1 flex">
            {isTablet ? (
              <span className="opacity-50">{__COMMIT_HASH__}</span>
            ) : (
              <Button
                className="hidden lg:block"
                variant="subtle"
                onClick={() => navigate({ to: "/admin" })}
              >
                Scouting Admin
              </Button>
            )}
            {needRefresh ? (
              <ActionIcon
                variant="transparent"
                className="my-auto"
                onClick={forceUpdate}
              >
                <IconRefreshAlert />
              </ActionIcon>
            ) : null}
          </div>
        </AppShell.Header>

        <AppShell.Main className="max-w-screen-lg mx-auto my-2 md:my-5 min-h-[calc(100dvh-var(--app-shell-header-height,0px)-var(--app-shell-footer-height,0px)-var(--app-shell-padding)*2)]">
          {content}
        </AppShell.Main>
      </AppShell>

      {/* <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        title={<AppLogo className="w-full" />}
        classNames={{
          header: "px-2 py-1 mb-2 h-[60px]",
          title: "h-full",
        }}
      >
        <Sidebar closeDrawer={closeDrawer} />
      </Drawer> */}
    </>
  );
}

// type SidebarProps = {
//   closeDrawer: () => void;
// };

// function Sidebar({ closeDrawer }: SidebarProps): ReactNode {
//   return (
//     <>
//       <ModeSwitch className="w-full" onChange={() => closeDrawer()} />
//     </>
//   );
// }
