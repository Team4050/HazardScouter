import { AppLogo } from "@/components/Logo";
import { ModeSwitch } from "@/components/ModeSwitch";
import { AppShell, Burger, Drawer, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import type { ReactNode } from "react";

type NavbarProps = {
  content: ReactNode;
};

export function Navbar({ content }: NavbarProps): JSX.Element {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);

  const rightSection: JSX.Element = (
    <>
      <ModeSwitch className="w-40 hidden lg:block" />
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
      <AppShell header={{ height: 60 }} padding="sm">
        <AppShell.Header className="flex items-center px-2 first-child:mr-auto first-child:justify-start last-child:justify-end last-child:ml-auto middle-child:justify-center">
          <AppLogo
            className="py-0.5 flex-1 flex"
            classNames={{ text: "md:block hidden" }}
          />
          <div className="flex-1 flex">
            <Title className="text-2xl lg:text-4xl leading-none text-center">
              Data Collection
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
