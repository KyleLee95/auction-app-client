import { Outlet, createFileRoute } from "@tanstack/react-router";
import { watchlistsQueryOptions } from "../../utils/queryOptions";
import { useSuspenseQuery } from "@tanstack/react-query";

export const Route = createFileRoute("/dashboard/watchlists")({
  loader: (opts) =>
    opts.context.queryClient.ensureQueryData(
      watchlistsQueryOptions("c1eb0520-90a1-7030-7847-c8ca5bfbe65e")
    ),
  component: RouteComponent,
});

function RouteComponent() {
  const watchlistsQuery = useSuspenseQuery(
    watchlistsQueryOptions("c1eb0520-90a1-7030-7847-c8ca5bfbe65e")
  );
  console.log(watchlistsQuery.data);

  return <Outlet />;
}
