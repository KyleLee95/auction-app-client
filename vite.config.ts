import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
// https://vite.dev/config/
export default defineConfig({
  plugins: [TanStackRouterVite(), react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      "/api/auctions": {
        target: "http://localhost:3000",
        changeOrigin: true,
      },
      "/api/bids": {
        target: "http://localhost:3000",
        changeOrigin: true,
      },
      "/api/watchlist": {
        target: "http://localhost:3000",
        changeOrigin: true,
      },
      "/api/category": {
        target: "http://localhost:3000",
        changeOrigin: true,
      },
    },
  },
});
