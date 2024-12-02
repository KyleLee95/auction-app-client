import { queryOptions } from "@tanstack/react-query";
import { fetchUserAuctions, fetchAuctionById } from "./auctions";
import { fetchUserWatchlists, fetchWatchlistById } from "./watchlists";

export const auctionsQueryOptions = (userId: string, includeBidOn: boolean) =>
  queryOptions({
    queryKey: ["auctions", userId],
    queryFn: () => fetchUserAuctions(userId, includeBidOn),
  });

export const auctionQueryOptions = (auctionId: string) =>
  queryOptions({
    queryKey: ["auctions", auctionId],
    queryFn: () => fetchAuctionById(auctionId),
  });

//get all of a user's watchlists
export const watchlistsQueryOptions = (userId: string) =>
  queryOptions({
    queryKey: ["watchlists", userId],
    queryFn: () => fetchUserWatchlists(userId),
  });

//get a watchlist by id
export const watchlistQueryOptions = (watchlistId: string) =>
  queryOptions({
    queryKey: ["watchlists", watchlistId],
    queryFn: () => fetchWatchlistById(watchlistId),
  });
