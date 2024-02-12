import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NextUIProvider,
} from "@nextui-org/react";
import clsx from "clsx";
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import {
  Outlet,
  RouterProvider,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { createBrowserRouter } from "react-router-dom";

import ModeSwitch from "./components/ModeSwitch";
import Home from "./pages/home";
import Scanning from "./pages/scanning";
import Scouting from "./pages/scouting";
import { useMetaStore } from "./store/useDataStore";
import "./styles/fonts.css";
import "./styles/tailwind.css";

const router = createBrowserRouter([
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

export default function RootLayout(): JSX.Element {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { scanOnly } = useMetaStore();

  return (
    <NextUIProvider navigate={navigate} className="fixed h-screen w-screen">
      <main
        className={clsx(
          "text-foreground bg-background h-full bg-gradient-to-tr",
          pathname === "/scanning"
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

          {!scanOnly &&
          (pathname.startsWith("/scanning") ||
            pathname.startsWith("/scouting")) ? (
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
  </StrictMode>,
);
