/* Types */
import { type CompleteWatchList } from "@/types/watchlist";

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

export const removeAuctionFromUserWatchlist = async (
  userId: string,
  auctionId: number | undefined
) => {
  const res = await fetch(`/api/watchlists/removeAuction`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userId, auctionId }),
  });
  if (!res.ok) {
    console.error(res.statusText);
  }
  const data = await res.json();
  return data;
};

export const addAuctionToUserWatchlist = async (
  userId: string,
  auctionId: number | undefined
) => {
  const res = await fetch(`/api/watchlists/addAuction`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userId: userId,
      auctionId: auctionId,
    }),
  });
  if (!res.ok) {
    console.error(res.statusText);
  }
  const data = await res.json();
  return data;
};
