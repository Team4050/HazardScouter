import "./globals.css";

import MantineProvider from "@/providers/Mantine";
import Router from "@/providers/Router";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "@mantine/core/styles.layer.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MantineProvider>
      <Router />
    </MantineProvider>
  </StrictMode>,
);
