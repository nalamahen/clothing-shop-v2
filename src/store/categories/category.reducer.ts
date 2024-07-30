import { AnyAction } from "redux";
import { Category } from "../../types";

// Define the action types
export enum CATEGORIES_ACTION_TYPES {
  FETCH_CATEGORIES_SUCCESS = "category/FETCH_CATEGORIES_SUCCESS",
  FETCH_CATEGORIES_START = "category/FETCH_CATEGORIES_START",
  FETCH_CATEGORIES_FAILURE = "category/FETCH_CATEGORIES_FAILURE",
}

// Define the action interface
export interface SetCategoriesAction {
  type: typeof CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS;
  payload: CategoriesState;
}

// Define the state
export interface CategoriesState {
  categories: Category[];
  isLoading: boolean;
  error?: string | null;
}

// Union type for all possible actions
export type CategoriesAction = SetCategoriesAction;

export const CATEGORIES_INITIAL_STATE: CategoriesState = {
  categories: [],
  isLoading: false,
  error: null,
};

export const categoriesReducer = (
  state: CategoriesState = CATEGORIES_INITIAL_STATE,
  action: AnyAction //CategoriesAction
): CategoriesState => {
  switch (action.type) {
    case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START:
      return { ...state, isLoading: true };
    case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS:
      return { ...state, categories: action.payload, isLoading: false };
    case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILURE:
      return { ...state, error: action.payload, isLoading: false };
    default:
      return state;
  }
};
