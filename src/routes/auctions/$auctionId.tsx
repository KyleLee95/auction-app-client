import { createFileRoute, Outlet } from "@tanstack/react-router";
import { auctionQueryOptions } from "../../utils/queryOptions";

export const Route = createFileRoute("/auctions/$auctionId")({
  params: {},
  loader: (opts) => {
    opts.context.queryClient.ensureQueryData(
      auctionQueryOptions(opts.params.auctionId),
    );
  },
  component: RouteComponent,
});

function RouteComponent() {
  return <Outlet />;
}
