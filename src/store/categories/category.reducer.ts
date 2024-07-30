import { AnyAction } from "redux";
import { Category } from "../../types";

// Define the action types
export enum CATEGORIES_ACTION_TYPES {
  SET_CATEGORIES = "SET_CATEGORIES",
}

// Define the action interface
export interface SetCategoriesAction {
  type: typeof CATEGORIES_ACTION_TYPES.SET_CATEGORIES;
  payload: CategoriesState;
}

// Define the state
export interface CategoriesState {
  categories: Category[];
}

// Union type for all possible actions
export type CategoriesAction = SetCategoriesAction;

export const CATEGORIES_INITIAL_STATE: CategoriesState = {
  categories: [],
};

export const categoriesReducer = (
  state: CategoriesState = CATEGORIES_INITIAL_STATE,
  action: AnyAction //CategoriesAction
): CategoriesState => {
  switch (action.type) {
    case CATEGORIES_ACTION_TYPES.SET_CATEGORIES:
      return { ...state, categories: action.payload };
    default:
      return state;
  }
};
