import { Navbar } from "@/components/Navbar";
import { TailwindIndicator } from "@/components/TailwindIndicator";
import DevTools from "@/providers/DevTools";
import { Outlet, createRootRoute } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: Page,
});

function Page(): JSX.Element {
  return (
    <>
      <Navbar content={<Outlet />} />
      <DevTools />
      <TailwindIndicator />
    </>
  );
}
