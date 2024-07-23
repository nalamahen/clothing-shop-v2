import { createContext, ReactNode, useEffect, useState } from "react";
import { Item, Product } from "../types";

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
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [cartItems, setCartItems] = useState<Item[]>([]);
  const [cartCount, setCartCount] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    // Calculate total number items in cart
    const count = cartItems.reduce((total, item) => total + item.quantity, 0);
    setCartCount(count);

    // Calculate total price
    const total = cartItems.reduce(
      (total, item) => total + item.quantity * item.price,
      0
    );
    setTotal(total);
  }, [cartItems]);

  const value: CartContextType = {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    addItemToCart: (item: Product) => {
      const updatedCartItems = addCartItem(cartItems, item);
      setCartItems(updatedCartItems);
    },
    cartCount,
    removeItemFromCart: (item: Product, deleteFromCart?: boolean) => {
      const updatedCartItems = removeCartItem(cartItems, item, deleteFromCart);
      setCartItems(updatedCartItems);
    },
    total,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
