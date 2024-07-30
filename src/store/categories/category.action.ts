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

export const fetchCategoriesAsync = () => {
  return async (dispatch: any) => {
    dispatch(fetchCategoriesStart());
    try {
      const categories = await getCategoriesAndDocuments();
      dispatch(fetchCategoriesSuccess(categories as Category[]));
    } catch (error: any) {
      dispatch(fetchCategoriesFailure(error.message));
    }
  };
};
