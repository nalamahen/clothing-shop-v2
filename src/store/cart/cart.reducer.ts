import { AnyAction } from "redux";
import { Item } from "../../types";
import { CART_ACTION_TYPES } from "./cart.types";

// Define the action interfaces
export interface SetIsCartOpenAction {
  type: typeof CART_ACTION_TYPES.SET_IS_CART_OPEN;
  payload: boolean;
}

export interface SetCartItemsAction {
  type: typeof CART_ACTION_TYPES.SET_CART_ITEMS;
  payload: {
    cartItems: Item[];
  };
}

// Define the state
export interface CartState {
  isCartOpen: boolean;
  cartItems: Item[];
}

// Define the action types
export type CartAction = SetIsCartOpenAction | SetCartItemsAction;

const CART_INITIAL_STATE: CartState = {
  isCartOpen: false,
  cartItems: [],
};

export const cartReducer = (
  state: CartState = CART_INITIAL_STATE,
  action: AnyAction //CartAction
): CartState => {
  switch (action.type) {
    case CART_ACTION_TYPES.SET_IS_CART_OPEN:
      return {
        ...state,
        isCartOpen: action.payload as boolean,
      };
    case CART_ACTION_TYPES.SET_CART_ITEMS:
      const { cartItems } = action.payload as {
        cartItems: Item[];
      };
      return {
        ...state,
        cartItems: cartItems,
      };
    default:
      return state;
  }
};
