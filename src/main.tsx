import { AppProvider } from "@/providers/AppState";
import MantineProvider from "@/providers/Mantine";
import Router from "@/providers/Router";
import * as Sentry from "@sentry/react";
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

Sentry.init({
  dsn: "https://055ca8caf4488f3cc1647425883ed0ad@o4508903100186624.ingest.us.sentry.io/4508903134789637",
});

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
