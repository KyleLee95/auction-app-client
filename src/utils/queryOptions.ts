import {
  queryOptions,
  // useMutation
} from "@tanstack/react-query";
import {
  fetchUserAuctions,
  fetchAuctionById,
  // fetchauctionById,
} from "./auctions";

// import { queryClient } from "../main";

export const auctionsQueryOptions = (userId: string) =>
  queryOptions({
    queryKey: ["auctions", userId],
    queryFn: () => fetchUserAuctions(userId),
  });
export const auctionQueryOptions = (auctionId: string) =>
  queryOptions({
    queryKey: ["auctions", auctionId],
    queryFn: () => fetchAuctionById(auctionId),
  });
//
// export const usersQueryOptions = (opts: {
//   filterBy?: string;
//   sortBy?: "name" | "id" | "email";
// }) =>
//   queryOptions({
//     queryKey: ["users", opts],
//     queryFn: () => fetchUsers(opts),
//   });
//
// export const userQueryOptions = (userId: number) =>
//   queryOptions({
//     queryKey: ["users", userId],
//     queryFn: () => fetchUserById(userId),
//   });
//
// export const useCreateauctionMutation = () => {
//   return useMutation({
//     // mutationKey: ['auctions', 'create'],
//     mutationFn: postauction,
//     onSuccess: () => queryClient.invalidateQueries(),
//   });
// };
//
// export const useUpdateauctionMutation = (auctionId: number) => {
//   return useMutation({
//     mutationKey: ["auctions", "update", auctionId],
//     mutationFn: patchauction,
//     onSuccess: () => queryClient.invalidateQueries(),
//     gcTime: 1000 * 10,
//   });
// };
