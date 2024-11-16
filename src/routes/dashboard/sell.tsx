import { createFileRoute } from "@tanstack/react-router";
export const Route = createFileRoute("/dashboard/sell")({
  component: RouteComponent,
});

function RouteComponent() {
  return "Sell";
}
