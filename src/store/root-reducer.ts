import { combineReducers } from "@reduxjs/toolkit";
import { cartReducer } from "./cart/cart.reducer";
import { categoriesReducer } from "./categories/category.reducer";
import { userReducer } from "./user/user.reducer";

export type RootState = ReturnType<typeof rootReducer>;

export const rootReducer = combineReducers({
  user: userReducer,
  categories: categoriesReducer,
  cart: cartReducer,
});
