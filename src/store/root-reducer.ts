import { combineReducers } from "redux";
import { userReducer, UserState } from "./user/user.reducer";
import {
  categoriesReducer,
  CategoriesState,
  SetCategoriesAction,
} from "./categories/category.reducer";
import { cartReducer, CartState } from "./cart/cart.reducer";

export interface RootState {
  user: UserState;
  categories: CategoriesState;
  SetCategoriesAction: SetCategoriesAction;
  cart: CartState;
}

export const rootReducer = combineReducers({
  user: userReducer,
  categories: categoriesReducer,
  cart: cartReducer,
});
