import { CATEGORIES_ACTION_TYPES } from "../store/categories/category.reducer";
import { USER_ACTION_TYPES } from "../store/user/user.types";
import { CART_ACTION_TYPES } from "../store/cart/cart.types";

export const createAction = <T>(
  type: USER_ACTION_TYPES | CATEGORIES_ACTION_TYPES | CART_ACTION_TYPES,
  payload?: T
) => ({
  type,
  payload,
});

export type ActionWithPayload<T, P> = {
  type: T;
  payload: P;
};
