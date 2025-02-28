import { AppProvider } from "@/providers/AppState";
import MantineProvider from "@/providers/Mantine";
import Router from "@/providers/Router";
import { StrictMode, lazy } from "react";
import { createRoot } from "react-dom/client";

import "@/styles/fonts.css";
import "@/styles/globals.css";

import "@mantine/code-highlight/styles.layer.css";
import "@mantine/core/styles.layer.css";
import "@mantine/dropzone/styles.layer.css";

const DevTools =
  process.env.NODE_ENV === "production"
    ? null
    : lazy(() => import("@/components/DevTools"));

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MantineProvider>
      <AppProvider>
        <Router />
        {DevTools ? <DevTools /> : null}
      </AppProvider>
    </MantineProvider>
  </StrictMode>,
);
