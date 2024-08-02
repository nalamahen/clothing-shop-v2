import { AnyAction } from "redux";
import { Category } from "../../types";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DocumentData } from "firebase/firestore";

// Define the action types
export enum CATEGORIES_ACTION_TYPES {
  FETCH_CATEGORIES_SUCCESS = "category/FETCH_CATEGORIES_SUCCESS",
  FETCH_CATEGORIES_START = "category/FETCH_CATEGORIES_START",
  FETCH_CATEGORIES_FAILURE = "category/FETCH_CATEGORIES_FAILURE",
}

// Define the action interface
export interface SetCategoriesAction {
  type: CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS;
  payload: CategoriesState;
}

// Define the state
export interface CategoriesState {
  categories: DocumentData[];
}

// Union type for all possible actions
export type CategoriesAction = SetCategoriesAction;

export const CATEGORIES_INITIAL_STATE: CategoriesState = {
  categories: [],
};

export const categoriesSlice = createSlice({
  name: "categories",
  initialState: CATEGORIES_INITIAL_STATE,
  reducers: {
    setCategories(
      state: CategoriesState,
      action: PayloadAction<DocumentData[]>
    ) {
      state.categories = action.payload;
    },
  },
});

export const { setCategories } = categoriesSlice.actions;

export const categoriesReducer = categoriesSlice.reducer;
