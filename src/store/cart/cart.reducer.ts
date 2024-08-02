import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Item, Product } from "../../types";

// Define the action interfaces
// export interface SetIsCartOpenAction {
//   type: typeof CART_ACTION_TYPES.SET_IS_CART_OPEN;
//   payload: boolean;
// }

// export interface SetCartItemsAction {
//   type: typeof CART_ACTION_TYPES.SET_CART_ITEMS;
//   payload: {
//     cartItems: Item[];
//   };
// }

// Define the state
export interface CartState {
  isCartOpen: boolean;
  cartItems: Item[];
}

// Define the action types
//export type CartAction = SetIsCartOpenAction | SetCartItemsAction;

const CART_INITIAL_STATE: CartState = {
  isCartOpen: false,
  cartItems: [],
};

const addCartItem = (cartItems: Item[], productToAdd: Product): Item[] => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id
  );

  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }

  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const removeCartItem = (cartItems: Item[], cartItemToRemove: Item) => {
  // find the cart item to remove
  const existingCartItem: Item | undefined = cartItems.find(
    (cartItem) => cartItem.id === cartItemToRemove.id
  );

  // check if quantity is equal to 1, if it is remove that item from the cart
  if (existingCartItem?.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
  }

  // return back cartitems with matching cart item with reduced quantity
  return cartItems.map((cartItem) =>
    cartItem.id === cartItemToRemove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};

const clearCartItem = (cartItems: Item[], cartItemToClear: Item) =>
  cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id);

export const cartSlice = createSlice({
  name: "cart",
  initialState: CART_INITIAL_STATE,
  reducers: {
    addItemToCart(state: CartState, action: PayloadAction<Product>) {
      state.cartItems = addCartItem(state.cartItems, action.payload);
    },
    removeItemFromCart(state: CartState, action: PayloadAction<Item>) {
      state.cartItems = removeCartItem(state.cartItems, action.payload);
    },
    clearItemFromCart(state: CartState, action: PayloadAction<Item>) {
      state.cartItems = clearCartItem(state.cartItems, action.payload);
    },
    setIsCartOpen(state: CartState, action: PayloadAction<boolean>) {
      state.isCartOpen = action.payload;
    },
  },
});

export const {
  addItemToCart,
  removeItemFromCart,
  clearItemFromCart,
  setIsCartOpen,
} = cartSlice.actions;

export const cartReducer = cartSlice.reducer;
