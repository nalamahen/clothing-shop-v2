import { Category } from "../../types";
import {
  CATEGORIES_ACTION_TYPES,
  SetCategoriesAction,
} from "./category.reducer";

export const setCategories = (categories: Category[]): SetCategoriesAction => ({
  type: CATEGORIES_ACTION_TYPES.SET_CATEGORIES,
  payload: categories,
});
