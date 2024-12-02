import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    TanStackRouterVite({
      quoteStyle: "double",
      semicolons: true,
      // routeToken: "layout",
    }),
    react(),
    VitePWA({
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg}"],
      },
      includeAssets: ["**/*"],
      manifest: {
        theme_color: "#16A34A",
        background_color: "#4B5563",
        display: "fullscreen",
        scope: "/",
        start_url: "/",
        short_name: "HazardScouter",
        description: "FRC Team Biohazard 4050 scouting app",
        name: "HazardScouter",
        icons: [
          {
            src: "pwa-64x64.png",
            sizes: "64x64",
            type: "image/png",
          },
          {
            src: "pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "maskable-icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
