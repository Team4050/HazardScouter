import * as Sentry from "@sentry/react";
import { lazy, StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "sonner";
import { AppProvider } from "@/providers/AppState";
import Router from "@/providers/Router";

import "@/styles/fonts.css";
import "@/styles/globals.css";

const DevTools =
  process.env.NODE_ENV === "production"
    ? null
    : lazy(() => import("@/components/DevTools"));

Sentry.init({
  dsn: "https://055ca8caf4488f3cc1647425883ed0ad@o4508903100186624.ingest.us.sentry.io/4508903134789637",
  integrations: [
    Sentry.captureConsoleIntegration({ levels: ["error", "warn"] }),
  ],
  release: __COMMIT_HASH__,
  denyUrls: ["localhost"],
});

// biome-ignore lint/style/noNonNullAssertion: Root element must exist
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppProvider>
      <Router />
      <Toaster theme="dark" richColors />
      {DevTools ? <DevTools /> : null}
    </AppProvider>
  </StrictMode>,
);
