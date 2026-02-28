import { lazy, StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "sonner";
import { AppProvider } from "@/providers/AppState";
import Router, { router } from "@/providers/Router";
import { ErrorBoundary, initSentry } from "@/sentry";

import "@/styles/fonts.css";
import "@/styles/globals.css";

const DevTools =
  process.env.NODE_ENV === "production"
    ? null
    : lazy(() => import("@/components/DevTools"));

initSentry(router);

// biome-ignore lint/style/noNonNullAssertion: Root element must exist
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary>
      <AppProvider>
        <Router />
        <Toaster theme="dark" richColors />
        {DevTools ? <DevTools /> : null}
      </AppProvider>
    </ErrorBoundary>
  </StrictMode>,
);
