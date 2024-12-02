import * as React from "react";
import { useParams, Outlet } from "react-router-dom";
import { useQueries } from "@tanstack/react-query";
import { fetchWatchlistById } from "@/utils/watchlists";

async function fetchAllCategories() {
  const res = await fetch("/api/categories");
  if (!res.ok) {
    console.error(res.statusText);
  }
  const data = await res.json();
  return data;
}
function WatchlistPage() {
  const params = useParams();
  const { watchlistId } = params;

  const queryResults = useQueries({
    queries: [
      {
        queryKey: ["categories"],
        queryFn: () => fetchAllCategories(),
      },
      {
        queryKey: ["watchlists", watchlistId],
        queryFn: () => fetchWatchlistById(watchlistId as string),
      },
    ],

    combine: (results) => {
      return {
        data: results.map((result) => result.data),
        loading: results.map((result) => result.isLoading),
        error: results.map((result) => result.isError),
        pending: results.some((result) => result.isPending),
      };
    },
  });

  const isLoading = queryResults.loading.some((result) => {
    result === true;
  });

  const isError = queryResults.error.some((result) => {
    result === true;
  });
  const isPending = queryResults.pending;

  if (isError) {
    return "Error";
  }

  if (isPending || isLoading) {
    return "Loading...";
  }

  const categories = queryResults?.data[0]?.categories;
  const watchlist = queryResults?.data[1]?.watchlists[0];

  return <Outlet context={{ watchlist, categories }} />;
}

export { WatchlistPage };
