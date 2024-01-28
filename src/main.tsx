import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import "./styles/tailwind.css";
import "./styles/fonts.css";
import {
  Outlet,
  RouterProvider,
  useLocation,
  useNavigate,
} from "react-router-dom";

import Scouting from "./pages/scouting";
import Home from "./pages/home";
import { createBrowserRouter } from "react-router-dom";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NextUIProvider,
} from "@nextui-org/react";
import clsx from "clsx";
import ModeSwitch from "./components/ModeSwitch";
import { useMediaQuery } from "usehooks-ts";
import Scanning from "./pages/scanning";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/scanning",
        element: <Scanning />,
      },
      {
        path: "/scouting",
        element: <Scouting />,
      },
    ],
  },
]);

function RootLayout(): JSX.Element {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isPhone = useMediaQuery("(max-width: 640px)");

  return (
    <NextUIProvider navigate={navigate} className="fixed h-screen w-screen">
      <main
        className={clsx(
          "text-foreground bg-background h-full bg-gradient-to-tr",
          pathname === "/scanning"
            ? "orange from-green-800 to-orange-700"
            : "green from-red-600 to-blue-800"
        )}
      >
        <Navbar position="static" isBordered className="font-heading">
          <NavbarContent justify={isPhone ? "center" : "start"}>
            <NavbarBrand className="space-x-2">
              <img src="/logo.svg" className="max-h-10" />
              <span className="text-2xl">Hazard Scouter</span>
            </NavbarBrand>
          </NavbarContent>

          {pathname.startsWith("/scanning") ||
          pathname.startsWith("/scouting") ? (
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
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
