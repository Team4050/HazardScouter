import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  NextUIProvider,
} from "@nextui-org/react";
import { Outlet, createRootRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createRootRoute({
  component: Root,
});

function Root(): JSX.Element {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <NextUIProvider>
      <main className="text-foreground bg-background absolute inset-0 bg-gradient-to-tr overflow-hidden green from-red-600 to-blue-800">
        <Navbar
          position="static"
          isBordered
          className="font-tech"
          onMenuOpenChange={setIsMenuOpen}
        >
          <NavbarContent className="gap-x-3">
            <NavbarMenuToggle
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              className="sm:hidden"
            />
            <NavbarBrand className="gap-x-1">
              <img src="/logo.svg" className="max-h-10" />
              <span className="text-2xl font-bold italic">Scouter</span>
            </NavbarBrand>
          </NavbarContent>

          <NavbarContent
            justify="end"
            className="hidden sm:flex"
          ></NavbarContent>

          <NavbarMenu className="max-h-[calc(100dvh-var(--navbar-height))]">
            <NavbarMenuItem className="mt-auto mx-auto mb-2 opacity-40 font-mono">
              {__COMMIT_HASH__}
            </NavbarMenuItem>
          </NavbarMenu>
        </Navbar>

        <div className="m-4">
          <Outlet />
        </div>
      </main>
    </NextUIProvider>
  );
}
