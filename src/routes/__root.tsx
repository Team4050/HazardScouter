import { DevTools } from "@/components/DevTools";
import { AppLogo } from "@/components/Logo";
import { ModeSwitch } from "@/components/ModeSwitch";
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

function Page(): JSX.Element {
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

function Layout({ content }: LayoutProps): JSX.Element {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);
  const formPage = useAppState((state) => state.pageName);

  const rightSection: JSX.Element = (
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
          />
          <div className="flex-1 flex">
            <Title className="text-2xl lg:text-4xl leading-none text-center">
              {formPage}
            </Title>
          </div>
          <div className="flex-1 flex">{rightSection}</div>
        </AppShell.Header>

        <AppShell.Main>{content}</AppShell.Main>
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

function Sidebar({ closeDrawer }: SidebarProps): JSX.Element {
  return (
    <>
      <ModeSwitch className="w-full" onChange={() => closeDrawer()} />
    </>
  );
}
