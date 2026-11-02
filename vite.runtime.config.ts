import { localIconPlugin } from "./scripts/local-icon-plugin";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
export default defineConfig(({ command }) => ({
  base: "./",
  optimizeDeps: { entries: ["index.html"] },
  plugins: [
    localIconPlugin(command),
    react(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "捡手机",
        short_name: "捡手机",
        display: "standalone",
        background_color: "#000000",
        theme_color: "#000000",
        icons: [{ src: "icon.svg", sizes: "any", type: "image/svg+xml" }],
      },
      workbox: {
        clientsClaim: true,
        globPatterns: ["**/*.{js,css,html,svg,json,txt,png,jpg}"],
        // Story files are fetched network-first so published updates show up
        // on the next load; the cached copy is only used when offline.
        globIgnores: [
          "**/work.json",
          "**/test-work.json",
          "**/blank-work.json",
        ],
        runtimeCaching: [
          {
            urlPattern: /\/(work|test-work|blank-work)\.json(\?.*)?$/,
            handler: "NetworkFirst",
            options: {
              cacheName: "story-files",
              networkTimeoutSeconds: 5,
              expiration: { maxEntries: 5 },
            },
          },
        ],
        maximumFileSizeToCacheInBytes: 4000000,
      },
    }),
  ],
}));
