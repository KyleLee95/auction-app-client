/* Types */
import { type CompleteWatchList } from "@/types";

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
  watchlistId: number,
  auctionId: number
) => {
  const res = await fetch(
    `/api/watchlists/${watchlistId}/auction/${auctionId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  if (!res.ok) {
    console.error(res.statusText);
  }
  const data = await res.json();
  return data;
};

export const addAuctionToUserWatchlist = async (
  userId: string,
  auctionId: number
) => {
  const res = await fetch(
    `/api/watchlists/addAuction?userId=${userId}&auctionId=${auctionId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  if (!res.ok) {
    console.error(res.statusText);
  }
  const data = await res.json();
  return data;
};
