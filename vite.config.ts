import { sentryVitePlugin } from "@sentry/vite-plugin";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react";
import { execSync } from "node:child_process";
import path from "node:path";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

const commitHash = execSync("git rev-parse --short HEAD").toString().trim();
// const commitCount = execSync("git rev-list --count HEAD").toString().trim();

export default defineConfig({
  define: {
    __COMMIT_HASH__: JSON.stringify(commitHash),
    // __COMMIT_COUNT__: JSON.stringify(commitCount),
  },
  plugins: [
    // legacy({
    //   targets: ["chrome >= 108"],
    //   modernTargets: ["chrome >= 109"],
    //   polyfills: ["es.object.has-own", "es.array.at"],
    //   modernPolyfills: true,
    // }),
    TanStackRouterVite({
      quoteStyle: "double",
      semicolons: true,
    }),
    react(),
    VitePWA({
      registerType: "autoUpdate",
      devOptions: {
        enabled: false,
      },
      workbox: {
        // Files to cache for offline functionality
        globPatterns: ["**/*.{js,css,html,ico,png,svg,woff2,ttf}"],
        // Remove old service worker caches
        cleanupOutdatedCaches: true,
        // Take control of all pages immediately
        clientsClaim: true,
        // Activate new service worker immediately
        skipWaiting: true,
        runtimeCaching: [
          {
            urlPattern: /\/$/, // Matches root path
            handler: "NetworkFirst",
            options: {
              networkTimeoutSeconds: 5,
            },
          },
        ],
      },
      includeAssets: ["**/*"],
      manifest: {
        theme_color: "#16A34A",
        background_color: "#4B5563",
        display: "standalone",
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
    sentryVitePlugin({
      org: "seesexyz",
      project: "hazard-scouter",
      release: {
        name: commitHash,
      },
    }),
  ],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@tabler/icons-react": "@tabler/icons-react/dist/esm/icons/index.mjs",
    },
  },

  build: {
    sourcemap: true,
  },
});
