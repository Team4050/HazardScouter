import { DevTools } from "@/components/DevTools";
import { AppLogo } from "@/components/Logo";
import { ModeSwitch } from "@/components/ModeSwitch";
import { phaseDetails } from "@/data/match";
import { useAppState } from "@/data/state";
import { navbarHeight } from "@/styles/theme";
import { AppShell, Burger, Drawer, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Outlet, createRootRoute } from "@tanstack/react-router";
import type { ReactNode } from "react";

import "@/sw";

export const Route = createRootRoute({
  component: Page,
});

function Page(): ReactNode {
  return (
    <>
      <Layout content={<Outlet />} />
      <DevTools />
    </>
  );
}

type LayoutProps = {
  content: ReactNode;
};

function Layout({ content }: LayoutProps): ReactNode {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);
  const matchPhase = useAppState((state) => state.matchPhase);
  const navigate = Route.useNavigate();

  const rightSection: ReactNode = (
    <>
      <div className="hidden lg:flex items-center space-x-2">
        <ModeSwitch className="w-40" />
      </div>
      <Burger
        opened={drawerOpened}
        onClick={toggleDrawer}
        hiddenFrom="sm"
        className="inline-block lg:hidden"
      />
    </>
  );

  return (
    <>
      <AppShell header={{ height: navbarHeight }} padding="sm">
        <AppShell.Header className="flex items-center px-2 first-child:mr-auto first-child:justify-start last-child:justify-end last-child:ml-auto middle-child:justify-center">
          <AppLogo
            className="py-0.5 flex-1 flex"
            classNames={{ text: "md:block hidden" }}
            onClick={() => navigate({ to: "/" })}
          />
          <div className="flex-1 flex">
            <Title className="text-2xl lg:text-4xl leading-none text-center">
              Hello! {matchPhase ? phaseDetails[matchPhase].title : "Scouting"}
            </Title>
          </div>
          <div className="flex-1 flex">{rightSection}</div>
        </AppShell.Header>

        <AppShell.Main className="max-w-screen-lg mx-auto m-5">
          {content}
        </AppShell.Main>
      </AppShell>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        title={<AppLogo className="w-full" />}
        classNames={{
          header: "px-2 py-1 mb-2 h-[60px]",
          title: "h-full",
        }}
      >
        <Sidebar closeDrawer={closeDrawer} />
      </Drawer>
    </>
  );
}

type SidebarProps = {
  closeDrawer: () => void;
};

function Sidebar({ closeDrawer }: SidebarProps): ReactNode {
  return (
    <>
      <ModeSwitch className="w-full" onChange={() => closeDrawer()} />
    </>
  );
}
