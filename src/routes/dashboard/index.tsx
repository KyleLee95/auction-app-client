import { createFileRoute } from "@tanstack/react-router";
export const Route = createFileRoute("/dashboard/")({
  component: RouteComponent,
});

function RouteComponent() {
  return "Hello /dashboard/idnex!";
}
