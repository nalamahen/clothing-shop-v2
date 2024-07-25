import { createContext, ReactNode, useReducer } from "react";
import { Item, Product } from "../types";
import { createAction } from "../utils/reducer";

interface CartState {
  isCartOpen: boolean;
  cartItems: Item[];
  cartCount: number;
  total: number;
}

interface CartContextType {
  isCartOpen: boolean;
  setIsCartOpen: (value: boolean) => void;
  cartItems: Item[];
  addItemToCart: (item: Product) => void;
  cartCount: number;
  removeItemFromCart: (item: Product, deleteFromCart?: boolean) => void;
  total: number;
}

function addCartItem(cartItems: Item[], item: Product) {
  const updatedCartItems = cartItems.map((cartItem) =>
    cartItem.id === item.id
      ? { ...cartItem, quantity: cartItem.quantity + 1 }
      : cartItem
  );

  const itemNotExists = !cartItems.some((cartItem) => cartItem.id === item.id);
  if (itemNotExists) {
    updatedCartItems.push({ ...item, quantity: 1 });
  }

  return updatedCartItems;
}

function removeCartItem(
  cartItems: Item[],
  item: Product,
  deleteFromCart?: boolean
) {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === item.id
  );

  // If deleteFromCart is true or item quantity is 1, remove the item completely.
  if (deleteFromCart || existingCartItem?.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== item.id);
  }

  // Otherwise, reduce the item's quantity by 1.
  return cartItems.map((cartItem) =>
    cartItem.id === item.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
}

const INITIAL_STATE = {
  isCartOpen: false,
  cartItems: [],
  cartCount: 0,
  total: 0,
};

const CART_ACTION_TYPES = {
  SET_IS_CART_OPEN: "SET_IS_CART_OPEN",
  SET_CART_ITEMS: "SET_CART_ITEMS",
};

const cartReducer = (
  state: CartState,
  action: { type: string; payload?: any }
): CartState => {
  const { type, payload } = action;
  switch (type) {
    case CART_ACTION_TYPES.SET_CART_ITEMS:
      return {
        ...state,
        ...payload,
      };
    case CART_ACTION_TYPES.SET_IS_CART_OPEN:
      return {
        ...state,
        isCartOpen: payload,
      };
    default:
      throw new Error(`Unhandled action type: ${type}`);
  }
};

export const CartContext = createContext<CartContextType>({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  cartCount: 0,
  removeItemFromCart: () => {},
  total: 0,
});

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [{ isCartOpen, cartItems, cartCount, total }, dispatch] = useReducer(
    cartReducer,
    INITIAL_STATE
  );

  const setIsCartOpen = (value: boolean) => {
    dispatch(createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, value));
  };

  const updateCartItemReducer = (newCartItems: Item[]) => {
    const newCartCount = newCartItems.reduce(
      (total, item) => total + item.quantity,
      0
    );

    const newCartTotal = newCartItems.reduce(
      (total, item) => total + item.quantity * item.price,
      0
    );

    dispatch(
      createAction(CART_ACTION_TYPES.SET_CART_ITEMS, {
        cartItems: newCartItems,
        cartCount: newCartCount,
        total: newCartTotal,
      })
    );
  };

  const addItemToCart = (item: Product) => {
    const updatedCartItems = addCartItem(cartItems, item);
    updateCartItemReducer(updatedCartItems);
  };

  const removeItemFromCart = (item: Product, deleteFromCart?: boolean) => {
    const updatedCartItems = removeCartItem(cartItems, item, deleteFromCart);
    updateCartItemReducer(updatedCartItems);
  };

  const value: CartContextType = {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    addItemToCart,
    cartCount,
    removeItemFromCart,
    total,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
