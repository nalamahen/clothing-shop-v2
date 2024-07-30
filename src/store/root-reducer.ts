import { combineReducers } from "redux";
import { userReducer, UserState } from "./user/user.reducer";
import {
  CategoriesAction,
  categoriesReducer,
  CategoriesState,
  SetCategoriesAction,
} from "./categories/category.reducer";
import { CartAction, cartReducer, CartState } from "./cart/cart.reducer";
import { SetCurrentUserAction } from "./user/user.action";

// export interface RootState {
//   user: (
//     state: UserState | undefined,
//     action: SetCurrentUserAction
//   ) => UserState;
//   categories: (
//     state: CategoriesState | undefined,
//     action: CategoriesAction
//   ) => CategoriesState | { categories: CategoriesState };
//   //SetCategoriesAction: SetCategoriesAction;
//   cart: (state: CartState | undefined, action: CartAction) => CartState;
// }

//type RootAction = SetCategoriesAction | CartAction | SetCurrentUserAction;

// export interface RootState {
//   user: UserState;
//   categories: CategoriesState;
//   cart: CartState;
// }

export type RootState = ReturnType<typeof rootReducer>;

export const rootReducer = combineReducers({
  user: userReducer,
  categories: categoriesReducer,
  cart: cartReducer,
});
