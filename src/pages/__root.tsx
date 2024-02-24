import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NextUIProvider,
} from "@nextui-org/react";
import { Outlet, createRootRoute } from "@tanstack/react-router";
import clsx from "clsx";

import ModeSwitch from "@app/components/ModeSwitch";

export const Route = createRootRoute({
  component: Root,
});

function Root(): JSX.Element {
  const scanning = false;

  return (
    <>
      <NextUIProvider className="fixed h-screen w-screen">
        <main
          className={clsx(
            "text-foreground bg-background h-full bg-gradient-to-tr",
            scanning
              ? "orange from-green-800 to-orange-700"
              : "green from-red-600 to-blue-800",
          )}
        >
          <Navbar position="static" isBordered className="font-tech">
            <NavbarContent justify="start" className="">
              <NavbarBrand className="space-x-2">
                <img src="/logo.svg" className="max-h-10" />
                <span className="text-2xl">Hazard Scouter</span>
              </NavbarBrand>
            </NavbarContent>

            {scanning ? (
              <NavbarContent justify="end">
                <NavbarItem>
                  <ModeSwitch />
                </NavbarItem>
              </NavbarContent>
            ) : null}
          </Navbar>

          <div className="m-4">
            <Outlet />
          </div>
        </main>
      </NextUIProvider>
    </>
  );
}
