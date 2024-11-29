import * as z from "zod";
import { type CompleteAuction, RelatedAuctionModel } from "./auction";
import { type CompleteWatchList, RelatedWatchListModel } from "./watchlist";
export const AuctionsOnWatchListsModel = z.object({
  watchlistId: z.number().int(),
  auctionId: z.number().int(),
});

export interface CompleteAuctionsOnWatchLists
  extends z.infer<typeof AuctionsOnWatchListsModel> {
  watchlist: CompleteWatchList;
  auction: CompleteAuction;
}

/**
 * RelatedAuctionsOnWatchListsModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedAuctionsOnWatchListsModel: z.ZodSchema<CompleteAuctionsOnWatchLists> =
  z.lazy(() =>
    AuctionsOnWatchListsModel.extend({
      watchlist: RelatedWatchListModel,
      auction: RelatedAuctionModel,
    })
  );
