import * as z from "zod";
import { type CompleteCategory, RelatedCategoryModel } from "./category";
import { type CompleteWatchList, RelatedWatchListModel } from "./watchlist";
export const CategoriesOnWatchListsModel = z.object({
  watchlistId: z.number().int(),
  categoryId: z.number().int(),
});

export interface CompleteCategoriesOnWatchLists
  extends z.infer<typeof CategoriesOnWatchListsModel> {
  watchlist: CompleteWatchList;
  category: CompleteCategory;
}

/**
 * RelatedCategoriesOnWatchListsModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedCategoriesOnWatchListsModel: z.ZodSchema<CompleteCategoriesOnWatchLists> =
  z.lazy(() =>
    CategoriesOnWatchListsModel.extend({
      watchlist: RelatedWatchListModel,
      category: RelatedCategoryModel,
    })
  );
