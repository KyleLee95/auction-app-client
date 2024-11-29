/* Types */
import { type CompleteWatchList } from "../types";

export async function fetchUserWatchlists(userId: string): Promise<{
  watchlists: CompleteWatchList[];
}> {
  const res = await fetch(`/api/watchlists?userId=${userId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) {
    console.error("fetch auctions error", res.statusText);
  }
  const { watchlists } = await res.json();
  return { watchlists: watchlists };
}

export async function fetchWatchlistById(watchlistId: string): Promise<{
  watchlists: CompleteWatchList[];
}> {
  const res = await fetch(`/api/watchlists/${watchlistId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) {
    console.error("fetch auctions error", res.statusText);
  }
  const data = await res.json();
  return data;
}
