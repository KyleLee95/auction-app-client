import { createFileRoute } from "@tanstack/react-router";
export const Route = createFileRoute("/dashboard/summary")({
  component: DashboardSummary,
});

function DashboardSummary() {
  return "asdfa";
}
