import * as z from "zod";
import {
  type CompleteAuction,
  type CompleteCategoriesOnWatchLists,
  RelatedAuctionModel,
  RelatedCategoriesOnWatchListsModel,
} from "./index";

export const CategoryModelInput = z.object({
  name: z.string(),
});

export const CategoryModel = z.object({
  id: z.number().int(),
  name: z.string(),
});

export interface IncludeCategory {
  id: number;
  name: string;
}

export interface CompleteCategory extends z.infer<typeof CategoryModel> {
  auctions: CompleteAuction[];
  watchlists: CompleteCategoriesOnWatchLists[];
}

/**
 * RelatedCategoryModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedCategoryModel: z.ZodSchema<CompleteCategory> = z.lazy(() =>
  CategoryModel.extend({
    auctions: RelatedAuctionModel.array(),
    watchlists: RelatedCategoriesOnWatchListsModel.array(),
  })
);
