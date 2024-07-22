import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { Product } from "../types";

import PRODUCTS from "../data/shop-data.json";

export const ProductsContext = createContext<{
  products: Product[] | null;
  setProducts: Dispatch<SetStateAction<Product[] | null>>;
}>({
  products: null,
  setProducts: () => {},
});

export const ProductsProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[] | null>(PRODUCTS);
  const value = { products, setProducts };

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
};
