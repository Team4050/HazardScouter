import { TanStackRouterVite } from "@tanstack/router-vite-plugin";
import react from "@vitejs/plugin-react";
import { execSync } from "child_process";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

const commitHash = execSync("git rev-parse --short HEAD").toString();

export default defineConfig({
  server: {
    port: 4050,
  },
  define: {
    __COMMIT_HASH__: JSON.stringify(commitHash),
  },
  plugins: [
    TanStackRouterVite({ routesDirectory: "src/pages", quoteStyle: "double" }),
    // basicSsl(),
    react(),
    VitePWA({
      devOptions: {
        enabled: true,
      },
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
});
