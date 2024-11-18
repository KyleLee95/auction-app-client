import { createFileRoute, Outlet } from "@tanstack/react-router";
import { auctionQueryOptions } from "../../utils/queryOptions";
import { useSuspenseQuery } from "@tanstack/react-query";

export const Route = createFileRoute("/auctions/$auctionId")({
  component: RouteComponent,
});

function RouteComponent() {
  return <Outlet />;
}
