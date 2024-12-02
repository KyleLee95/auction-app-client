import * as z from "zod";
import { type CompleteAuction, RelatedAuctionModel } from "./auction";
import {
  type CompleteCategoriesOnWatchLists,
  RelatedCategoriesOnWatchListsModel,
} from "./categoriesonwatchlists";
export const CategoryModelInput = z.object({
  label: z.string(),
  value: z.string(),
});

export const CategoryModel = z.object({
  id: z.number().int(),
  label: z.string(),
  value: z.string(),
});

export interface IncludeCategory {
  id: number;
  label: string;
  value: string;
}

export interface CompleteCategory extends z.infer<typeof CategoryModel> {
  id: number;
  label: string;
  value: string;
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
