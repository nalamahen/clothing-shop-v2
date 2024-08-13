import { AnyAction } from "redux";
import { Category } from "../../types";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
//import { DocumentData } from "firebase/firestore";

// Define the action types
export enum CATEGORIES_ACTION_TYPES {
  FETCH_CATEGORIES_SUCCESS = "category/FETCH_CATEGORIES_SUCCESS",
  FETCH_CATEGORIES_START = "category/FETCH_CATEGORIES_START",
  FETCH_CATEGORIES_FAILURE = "category/FETCH_CATEGORIES_FAILURE",
}

export interface CategoriesState {
  categories: Category[];
  isLoading: boolean;
  error?: Error | null;
}

export const CATEGORIES_INITIAL_STATE: CategoriesState = {
  categories: [],
  isLoading: false,
  error: null,
};

export const categoriesSlice = createSlice({
  name: "categories",
  initialState: CATEGORIES_INITIAL_STATE,
  reducers: {
    setCategories(state: CategoriesState, action: AnyAction) {
      state.categories = action.payload;
    },
  },
});

export const { setCategories } = categoriesSlice.actions;

export const categoriesReducer = categoriesSlice.reducer;
