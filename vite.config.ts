import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
// https://vite.dev/config/
// import * as dotenv from "dotenv";
// dotenv.config();
// const isDev = process.env.DEV === "TRUE";
// const apiGatewayHost = isDev ? "localhost" : "api-gateway";
const apiGatewayHost = "localhost";
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
        target: `http://${apiGatewayHost}:42069`,
        changeOrigin: true,
      },
      "/api/bids": {
        target: `http://${apiGatewayHost}:42069`,
        changeOrigin: true,
      },
      "/api/watchlists": {
        target: `http://${apiGatewayHost}:42069`,
        changeOrigin: true,
      },
      "/api/categories": {
        target: `http://${apiGatewayHost}:42069`,
        changeOrigin: true,
      },
      "/api/notifications": {
        target: `http://${apiGatewayHost}:42069`,
        changeOrigin: true,
      },
      "/api/user": {
        target: `http://${apiGatewayHost}:42069`,
        changeOrigin: true,
      },
      "/api/cart": {
        target: `http://${apiGatewayHost}:8000`,
        changeOrigin: true,
      },
      "/api/checkout": {
        target: `http://${apiGatewayHost}:3001`,
        changeOrigin: true,
      },
      "/api/create-payment-intent": {
        target: `http://${apiGatewayHost}:4242`,
        changeOrigin: true,
      },
    },
  },
});
