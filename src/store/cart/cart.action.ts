import { Item, Product } from "../../types";
import { CartAction } from "./cart.reducer";
import { CART_ACTION_TYPES } from "./cart.types";

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

export const addItemToCart = (
  cartItems: Item[],
  productToAdd: Product
): CartAction => {
  const newCartItems = addCartItem(cartItems, productToAdd);
  return {
    type: CART_ACTION_TYPES.SET_CART_ITEMS,
    payload: { cartItems: newCartItems },
  };
};

export const removeItemFromCart = (
  cartItems: Item[],
  cartItemToRemove: Item
): CartAction => {
  const newCartItems = removeCartItem(cartItems, cartItemToRemove);
  return {
    type: CART_ACTION_TYPES.SET_CART_ITEMS,
    payload: { cartItems: newCartItems },
  };
};

export const clearItemFromCart = (
  cartItems: Item[],
  cartItemToClear: Item
): CartAction => {
  const newCartItems = clearCartItem(cartItems, cartItemToClear);
  return {
    type: CART_ACTION_TYPES.SET_CART_ITEMS,
    payload: { cartItems: newCartItems },
  };
};

export const setIsCartOpen = (isCartOpen: boolean) => ({
  type: CART_ACTION_TYPES.SET_IS_CART_OPEN,
  payload: isCartOpen,
});
