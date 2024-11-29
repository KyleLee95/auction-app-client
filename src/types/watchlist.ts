import * as z from "zod";
import { type CompleteUser, RelatedUserModel } from "./user";

import {
  RelatedCategoriesOnWatchListsModel,
  type CompleteCategoriesOnWatchLists,
} from "./categoriesonwatchlists";
import { AuctionModel, type IncludeAuction } from "./auction";

import {
  RelatedAuctionsOnWatchListsModel,
  type CompleteAuctionsOnWatchLists,
} from "./auctionsonwatchlists";

import { CategoryModel, type IncludeCategory } from "./category";

export const WatchListModelInput = z.object({
  id: z.number().int().optional(),
  userId: z.string(),
  name: z.string(),
  maxPrice: z.number(),
  keyword: z.string(),
});

export const WatchListModel = z.object({
  id: z.number().int(),
  name: z.string(),
  userId: z.string(),
  maxPrice: z.number(),
  keyword: z.string(),
});

export const WatchListModelWithAuctionAndCategory = z.object({
  id: z.number().int(),
  name: z.string(),
  userId: z.string(),
  auctions: z.array(
    z.object({
      watchlistId: z.number().int(),
      auctionId: z.number().int(),
      auction: AuctionModel,
    })
  ),
  categories: z.array(
    z.object({
      watchlistId: z.number().int(),
      categoryId: z.number().int(),
      category: CategoryModel,
    })
  ),
});

export interface IWatchListIncludeAuctionAndCategory {
  id: number;
  name: string;
  userId: string;
  auctions: {
    watchlistId: number;
    auctionId: number;
    auction: IncludeAuction;
  }[];
  categories: {
    watchlistId: number;
    auctionId: number;
    category: IncludeCategory[];
  };
}

export interface CompleteWatchList extends z.infer<typeof WatchListModel> {
  user: CompleteUser;
  auctions: CompleteAuctionsOnWatchLists[];
  categories: CompleteCategoriesOnWatchLists[];
}

/**
 * RelatedWatchListModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedWatchListModel: z.ZodSchema<CompleteWatchList> = z.lazy(
  () =>
    WatchListModel.extend({
      user: RelatedUserModel,
      auctions: RelatedAuctionsOnWatchListsModel.array(),
      categories: RelatedCategoriesOnWatchListsModel.array(),
    })
);
