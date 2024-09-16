import DevTools from "@/providers/DevTools";
import { AppShell } from "@mantine/core";
import { Outlet, createRootRoute } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: () => (
    <>
      <AppShell header={{ height: 60 }} padding="md">
        <AppShell.Header>
          <img src="hazard-scouter.svg" className="h-full py-1" />
        </AppShell.Header>

        <AppShell.Main>
          <Outlet />
        </AppShell.Main>
      </AppShell>
      <DevTools />
    </>
  ),
});
