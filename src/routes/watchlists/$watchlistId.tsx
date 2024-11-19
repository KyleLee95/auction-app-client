import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/watchlists/$watchlistId")({
  component: RouteComponent,
});

function RouteComponent() {
  return "Hello /watchlists/$watchlistId!";
}
