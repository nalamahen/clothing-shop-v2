import { Route, Routes } from "react-router";
import { useDispatch } from "react-redux";
import CategoriesPreview from "../categories-preview/CategoriesPreview";
import Category from "../category/Category";
import { useEffect } from "react";
import { getCategoriesAndDocuments } from "../../utils/firebase";
import { setCategories } from "../../store/categories/category.action";
import { AppDispatch } from "../../store/store";
import { Category as CategoryType } from "../../types";

export default function Shop() {
  const dispatch: AppDispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const getCategoryMap = async () => {
      const categoriesArray = await getCategoriesAndDocuments();
      dispatch(setCategories(categoriesArray as CategoryType[]));
    };
    getCategoryMap();
  }, []);

  return (
    <Routes>
      <Route index element={<CategoriesPreview />} />
      <Route path=":category" element={<Category />} />
    </Routes>
  );
}
