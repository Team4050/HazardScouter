import MantineProvider from "@/providers/Mantine";
import RecoilProvider from "@/providers/Recoil";
import Router from "@/providers/Router";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "@/styles/fonts.css";
import "@/styles/globals.css";

import "@mantine/core/styles.layer.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MantineProvider>
      <RecoilProvider>
        <Router />
      </RecoilProvider>
    </MantineProvider>
  </StrictMode>,
);
