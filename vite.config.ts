import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
// https://vite.dev/config/
const isDev = process.env.DEV === "true";
export default defineConfig({
  build: {
    sourcemap: false,
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      "/api/auctions": {
        target: "http://localhost:42069",
        changeOrigin: true,
      },
      "/api/bids": {
        target: "http://localhost:42069",
        changeOrigin: true,
      },
      "/api/watchlists": {
        target: "http://localhost:42069",
        changeOrigin: true,
      },
      "/api/categories": {
        target: "http://localhost:42069",
        changeOrigin: true,
      },
    },
  },
});
