import * as React from "react";
import { useParams, Outlet } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchWatchlistById } from "@/utils/watchlists";

function WatchlistPage() {
  const params = useParams();
  const { watchlistId } = params;
  const { data, isLoading, isError, isPending } = useQuery({
    queryFn: () => fetchWatchlistById(watchlistId as string),
    queryKey: ["watchlists"],
  });

  if (isLoading || isPending) {
    return "Loading...";
  }
  if (isError) {
    return "error";
  }

  const watchlist = data?.watchlists[0];

  return <Outlet context={{ watchlist }} />;
}

export { WatchlistPage };
