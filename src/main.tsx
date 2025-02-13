import { DevTools } from "@/components/DevTools";
import { PWAUpdatePrompt } from "@/components/PWAUpdatePrompt";
import MantineProvider from "@/providers/Mantine";
import Router from "@/providers/Router";
import { Notifications } from "@mantine/notifications";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "@/styles/fonts.css";
import "@/styles/globals.css";

import "@mantine/code-highlight/styles.layer.css";
import "@mantine/core/styles.layer.css";
import "@mantine/dropzone/styles.layer.css";
import "@mantine/notifications/styles.layer.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MantineProvider>
      <Notifications />
      <Router />
      <PWAUpdatePrompt />
      <DevTools />
    </MantineProvider>
  </StrictMode>,
);
