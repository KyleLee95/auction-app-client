import * as z from "zod";
import {
  type CompleteUser,
  type CompleteAuction,
  RelatedUserModel,
  RelatedAuctionModel,
  AuctionModel,
  type IncludeAuction,
} from "./index";

export const BidModelInput = z.object({
  id: z.number().optional(),
  amount: z.number(),
  userId: z.string(),
  auctionId: z.number().int(),
});

export const BidModel = z.object({
  id: z.number().int(),
  amount: z.number(),
  userId: z.string(),
  auctionId: z.number().int(),
  placedAt: z.coerce.date(),
});

export const BidModelWithAuction = z.object({
  id: z.number().int(),
  amount: z.number(),
  userId: z.string(),
  auctionId: z.number().int(),
  placedAt: z.date(),
  auction: AuctionModel,
});

export interface IBidModelWithAuction
  extends z.infer<typeof BidModelWithAuction> {
  auction: IncludeAuction;
}

export interface CompleteBid extends z.infer<typeof BidModel> {
  bidder: CompleteUser;
  auction: CompleteAuction;
}

/**
 * RelatedBidModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedBidModel: z.ZodSchema<CompleteBid> = z.lazy(() =>
  BidModel.extend({
    bidder: RelatedUserModel,
    auction: RelatedAuctionModel,
  })
);
