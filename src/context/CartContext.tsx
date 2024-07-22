import { createContext, ReactNode, useState } from "react";

interface CartContextType {
  isCartOpen: boolean;
  setIsCartOpen: (value: boolean) => void;
}

export const CartContext = createContext<CartContextType>({
  isCartOpen: false,
  setIsCartOpen: () => {},
});

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const value: CartContextType = { isCartOpen, setIsCartOpen };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
