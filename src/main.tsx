import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// Import the generated route tree
import { routeTree } from "./routeTree.gen";
import { auth } from "./utils/auth";
import { ThemeProvider } from "./components/theme-provider";
import "./index.css";
export const queryClient = new QueryClient();

import { Authenticator } from "@aws-amplify/ui-react";
import { Amplify } from "aws-amplify";
import outputs from "../amplify_outputs.json";
import "@aws-amplify/ui-react/styles.css";

Amplify.configure(outputs);

// Create a new router instance
const router = createRouter({
  routeTree,
  defaultErrorComponent: ({ error }) => {
    <div>{error.message}</div>;
  },
  context: {
    auth: undefined!,
    queryClient,
  },
});

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

// Render the app
const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  const root = createRoot(rootElement);
  root.render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <Authenticator>
            <RouterProvider router={router} context={{ auth }} />
          </Authenticator>
        </ThemeProvider>
      </QueryClientProvider>
    </StrictMode>
  );
}
