import { sentryVitePlugin } from "@sentry/vite-plugin";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import legacy from "@vitejs/plugin-legacy";
import react from "@vitejs/plugin-react";
import path from "node:path";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    legacy({
      targets: ["chrome >= 108"],
      modernTargets: ["chrome >= 109"],
      polyfills: ["es.object.has-own", "es.array.at"],
      modernPolyfills: true,
    }),
    TanStackRouterVite({
      quoteStyle: "double",
      semicolons: true,
    }),
    react(),
    VitePWA({
      registerType: "prompt",
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
        // Don't fallback on document root index.html
        navigateFallback: null,
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
