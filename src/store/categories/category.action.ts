import { Action } from "redux";
import { getCategoriesAndDocuments } from "../../utils/firebase";
import {
  ActionWithPayload,
  createAction,
  withMatcher,
} from "../../utils/reducer";
import { CATEGORIES_ACTION_TYPES, Category } from "./category.types";

export type FetchCategoriesStart =
  Action<CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START>;

export type FetchCategoriesSuccess = ActionWithPayload<
  CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS,
  Category[]
>;

export type FetchCategoriesFailure = ActionWithPayload<
  CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILURE,
  Error
>;

export const fetchCategoriesStart = withMatcher(
  (): FetchCategoriesStart =>
    createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START)
);

export const fetchCategoriesSuccess = withMatcher(
  (categories: Category[]): FetchCategoriesSuccess =>
    createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS, categories)
);

export const fetchCategoriesFailure = withMatcher(
  (error: unknown): FetchCategoriesFailure =>
    createAction(
      CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILURE,
      error as Error
    )
);

export const fetchCategoriesAsync = () => {
  return async (dispatch: any) => {
    dispatch(fetchCategoriesStart());
    try {
      const categories = await getCategoriesAndDocuments();
      dispatch(fetchCategoriesSuccess(categories as Category[]));
    } catch (error) {
      dispatch(fetchCategoriesFailure(error));
    }
  };
};
