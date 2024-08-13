import { createSelector } from "reselect";
import { CategoryItem } from "../../types";
import { RootState } from "../store";

const selectCategoryReducer = (state: RootState) => state.categories;

export const selectCategories = createSelector(
  [selectCategoryReducer],
  (categoriesSlice) => categoriesSlice.categories
);

export const selectCategoriesMap = createSelector(
  [selectCategories],
  (categories) => {
    return categories.reduce(
      (acc: Record<string, CategoryItem[]>, category) => {
        const { title, items } = category;
        acc[title.toLowerCase()] = items;
        return acc;
      },
      {} as Record<string, CategoryItem[]>
    );
  }
);

export const selectIsCategoriesLoading = createSelector(
  [selectCategoryReducer],
  (categoriesSlice) => categoriesSlice.isLoading
);
