import { ModeSwitch } from "@/components/ModeSwitch";
import DevTools from "@/providers/DevTools";
import { AppShell, Title } from "@mantine/core";
import { Outlet, createRootRoute } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: Page,
});

function Page(): JSX.Element {
  return (
    <>
      <AppShell header={{ height: 60 }} padding="md">
        <AppShell.Header className="flex items-center justify-between px-2">
          <img
            src="/hazard-scouter.svg"
            className="h-full w-40 py-1 flex-none"
          />
          <Title>Data Collection</Title>
          <div className="flex-none w-40">
            <ModeSwitch className="w-full" />
          </div>
        </AppShell.Header>

        <AppShell.Main>
          <Outlet />
        </AppShell.Main>
      </AppShell>
      <DevTools />
    </>
  );
}
