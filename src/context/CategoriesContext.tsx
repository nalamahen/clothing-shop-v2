import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { CategoryMap } from "../types";
import { getCategoriesAndDocuments } from "../utils/firebase";

//import PRODUCTS from "../data/shop-data.json";

export const CategoriesContext = createContext<{
  categoriesMap: CategoryMap[] | {};
  setProducts?: Dispatch<SetStateAction<CategoryMap[] | {}>>;
}>({
  categoriesMap: {},
  setProducts: () => {},
});

export const CategoriesProvider = ({ children }: { children: ReactNode }) => {
  const [categoriesMap, setCategoriesMap] = useState<CategoryMap[] | {}>({});
  const value = { categoriesMap };

  useEffect(() => {
    const getCategoryMap = async () => {
      const categoryMap = await getCategoriesAndDocuments();
      //console.log(categoryMap);
      setCategoriesMap(categoryMap);
    };
    getCategoryMap();
  }, []);

  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  );
};
