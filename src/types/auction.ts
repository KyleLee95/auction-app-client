import * as z from "zod";
import { type CompleteUser, RelatedUserModel } from "./user";
import { RelatedCategoryModel, type CompleteCategory } from "./category";
import { RelatedBidModel, type CompleteBid } from "./bid";
import {
  type CompleteAuctionsOnWatchLists,
  RelatedAuctionsOnWatchListsModel,
} from "./auctionsonwatchlists";

import { type CompleteWatchList, RelatedWatchListModel } from "./watchlist";

export const AuctionModelInput = z.object({
  title: z.string(),
  description: z.string(),
  startPrice: z.coerce.number(), // Accepts number from client
  startTime: z.coerce.date(),
  endTime: z.coerce.date(),
  buyerId: z.string().nullish(),
  sellerId: z.string(),
  shippingPrice: z.number(),
  butItNowPrice: z.number(),
  isActive: z.coerce.boolean(),
  quantity: z.coerce.number().int(),
  buyItNowEnabled: z.coerce.boolean(),
  deleted: z.coerce.boolean(),
  flagged: z.coerce.boolean(),
  closedAt: z.coerce.string().optional().nullish(),
  createdAt: z.coerce.string(),
  updatedAt: z.coerce.string(),
  categories: z.array(z.any().optional()),
});

// Input schema for client input (expects `startPrice` as `number`)
export const AuctionModel = z.object({
  id: z.number().int().optional(),
  title: z.string(),
  description: z.string(),
  startPrice: z.number(),
  shippingPrice: z.number(),
  startTime: z.string(),
  endTime: z.string(),
  isActive: z.boolean(),
  buyerId: z.string().nullish().optional(),
  sellerId: z.string(),
  quantity: z.number().int(),
  buyItNowEnabled: z.boolean(),
  deleted: z.boolean(),
  flagged: z.boolean(),
  closedAt: z.string().optional().nullish(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

// CompleteAuction interface with explicit types
export interface CompleteAuction {
  id?: number;
  title: string;
  description: string;
  startPrice: number;
  shippingPrice: number;
  startTime: string;
  endTime: string;
  isActive: boolean;
  buyItNowEnabled: boolean;
  buyItNowPrice: number;
  deleted: boolean;
  flagged: boolean;
  sellerId: string;
  buyerId?: string | null;
  createdAt: string;
  updatedAt: string;
  closedAt?: string | null;
  seller: CompleteUser;
  bids: CompleteBid[];
  categories: CompleteCategory[];
  watchlist: CompleteWatchList[];
  cartQuantity?: number;
}

export interface IncludeAuction {
  id?: number;
  title: string;
  description: string;
  startPrice: number;
  shippingPrice: number;
  startTime: string;
  endTime: string;
  quantity: number;
  isActive: boolean;
  buyItNowEnabled: boolean;
  buyItNowPrice: number;
  deleted: boolean;
  flagged: boolean;
  sellerId: string;
  buyerId?: string | null;
  createdAt: string;
  updatedAt: string;
  closedAt?: string | null;
  seller: CompleteUser;
  bids: CompleteBid[];
}

export interface CompleteAuction extends z.infer<typeof AuctionModel> {
  seller: CompleteUser;
  buyer?: CompleteUser | null;
  bids: CompleteBid[];
  categories: CompleteCategory[];
  watchlist: CompleteWatchList[];
  AuctionsOnWatchLists: CompleteAuctionsOnWatchLists[];
}

/**
 * RelatedAuctionModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedAuctionModel: z.ZodSchema<CompleteAuction> = z.lazy(() =>
  AuctionModel.extend({
    seller: RelatedUserModel,
    buyer: RelatedUserModel.nullish(),
    bids: RelatedBidModel.array(),
    categories: RelatedCategoryModel.array(),
    watchlist: RelatedWatchListModel.array(),
    AuctionsOnWatchLists: RelatedAuctionsOnWatchListsModel.array(),
  })
);
