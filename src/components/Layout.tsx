import { AppLogo } from "@/components/Logo";
import { phaseDetails } from "@/data/match";
import { useAppState } from "@/data/state";
import { useSecretTap } from "@/hooks/useSecretTap";
import { navbarHeight } from "@/styles/theme";
import { AppShell, Button, Title } from "@mantine/core";
import { useNavigate } from "@tanstack/react-router";
import type { ReactNode } from "react";

type LayoutProps = {
  content: ReactNode;
};

export function Layout({ content }: LayoutProps): ReactNode {
  // const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
  //   useDisclosure(false);
  const matchPhase = useAppState((state) => state.matchPhase);
  const navigate = useNavigate();
  const handleSecretTap = useSecretTap(
    () => {
      navigate({ to: "/admin" });
    },
    () => {
      navigate({ to: "/" });
    },
  );

  return (
    <>
      <AppShell header={{ height: navbarHeight }} padding="sm">
        <AppShell.Header className="flex items-center px-2 first-child:mr-auto first-child:justify-start last-child:justify-end last-child:ml-auto middle-child:justify-center">
          <AppLogo
            className="py-0.5 flex-1 flex"
            classNames={{ text: "md:block hidden" }}
            onClick={handleSecretTap}
          />
          <div className="flex-1 flex">
            <Title className="text-2xl lg:text-4xl leading-none text-center">
              {matchPhase ? phaseDetails[matchPhase].title : "Scouting"}
            </Title>
          </div>
          <div className="flex-1 flex">
            <Button
              className="hidden lg:block"
              variant="subtle"
              onClick={() => navigate({ to: "/admin" })}
            >
              Scouting Admin
            </Button>
          </div>
        </AppShell.Header>

        <AppShell.Main className="max-w-screen-lg mx-auto my-5 min-h-[calc(100dvh-var(--app-shell-header-height,0px)-var(--app-shell-footer-height,0px)-var(--app-shell-padding)*2)]">
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
