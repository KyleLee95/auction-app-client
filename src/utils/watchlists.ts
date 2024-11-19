// import { produce } from "immer";

// type PickAsRequired<TValue, TKey extends keyof TValue> = Omit<TValue, TKey> &
//   Required<Pick<TValue, TKey>>;

/* Types */
import { type CompleteWatchList } from "../types";
// export interface Auction {
//   _id: string;
//   title: string;
//   user_id: string;
//   start_time: Date;
//   end_time: Date;
//   description: string;
//   category: Category[];
//   starting_price: number;
// }
//
// export interface Bid {
//   auction_id: string;
//   user_id: string;
//   amount: number;
//   id: string;
//   timestamp: Date;
// }
//
// export interface Category {
//   id: number;
//   name: string;
//   description: string;
//   created_at: Date;
//   updated_at: Date;
// }
//
// export interface User {
//   id: string;
//   name: string;
//   username: string;
//   email: string;
//   phone: string;
//   website: string;
// }

// let users: Array<User> = null!;
//
// let auctionsPromise: Promise<void> | undefined = undefined;
// let usersPromise: Promise<void> | undefined = undefined;

// export type AuctionsSortBy = "" | "" | "";

export async function fetchUserWatchlists(userId: string): Promise<{
  watchlists: CompleteWatchList[];
}> {
  // {
  //   filterBy,
  //   sortBy,
  // }: { filterBy?: string; sortBy: AuctionsSortBy } = {}
  const res = await fetch(`/api/watchlist?userId=${userId}`, {
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
  const res = await fetch(`/api/watchlist/${watchlistId}`, {
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
