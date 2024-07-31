import { Category } from "../../types";
import { getCategoriesAndDocuments } from "../../utils/firebase";
import {
  CATEGORIES_ACTION_TYPES,
  SetCategoriesAction,
} from "./category.reducer";

export const fetchCategoriesStart = () => ({
  type: CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START,
});

export const fetchCategoriesSuccess = (categories: Category[]) => ({
  type: CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS,
  payload: categories,
});

export const fetchCategoriesFailure = (error: string) => ({
  type: CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILURE,
  payload: error,
});
