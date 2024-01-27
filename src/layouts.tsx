import {
  Button,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NextUIProvider,
  Tab,
  Tabs,
} from "@nextui-org/react";
import { ReactNode } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import ModeSwitch from "./components/ModeSwitch";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";

export function RootLayout(): ReactNode {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <NextUIProvider navigate={navigate} className="h-screen w-screen">
      <main
        className={clsx(
          "text-foreground bg-background h-full",
          pathname.includes("scanning") ? "scanning" : "bio"
        )}
      >
        <Navbar position="static" isBordered>
          <NavbarBrand>Biohazard</NavbarBrand>
          {pathname !== "/" ? (
            <NavbarContent justify="end">
              <NavbarItem>
                <ModeSwitch />
              </NavbarItem>
            </NavbarContent>
          ) : null}
        </Navbar>

        <Outlet />
      </main>
    </NextUIProvider>
  );
}

export function ScoutingLayout(): ReactNode {
  const { pathname } = useLocation();

  return (
    <>
      <div className="fixed z-10 bottom-0 w-full flex flex-row mb-4 px-4 justify-between">
        <Button isIconOnly>
          <ArrowLeftIcon className="w-8" />
        </Button>
        <Tabs
          color="primary"
          variant="bordered"
          selectedKey={pathname}
          className="w-fit"
        >
          <Tab
            key="/scouting"
            href="/scouting"
            title={
              <div className="flex items-center space-x-2">
                <span>Pre-Match</span>
              </div>
            }
          />
          <Tab
            key="/scouting/auto"
            href="/scouting/auto"
            title={
              <div className="flex items-center space-x-2">
                <span>Autonomous</span>
              </div>
            }
          />
          <Tab
            key="/scouting/teleop"
            href="/scouting/teleop"
            title={
              <div className="flex items-center space-x-2">
                <span>Teleop</span>
              </div>
            }
          />
          <Tab
            key="/scouting/endgame"
            href="/scouting/endgame"
            title={
              <div className="flex items-center space-x-2">
                <span>End Game</span>
              </div>
            }
          />
          <Tab
            key="/scouting/postmatch"
            href="/scouting/postmatch"
            title={
              <div className="flex items-center space-x-2">
                <span>Post-Match</span>
              </div>
            }
          />
        </Tabs>
        <Button isIconOnly>
          <ArrowRightIcon className="w-8" />
        </Button>
      </div>

      <Outlet />
    </>
  );
}
