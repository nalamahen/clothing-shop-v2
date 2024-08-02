import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router";
import { setCategories } from "../../store/categories/category.reducer";
import { AppDispatch } from "../../store/store";
import { getCategoriesAndDocuments } from "../../utils/firebase";
import CategoriesPreview from "../categories-preview/CategoriesPreview";
import Category from "../category/Category";

export default function Shop() {
  const dispatch: AppDispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const getCategoryMap = async () => {
      const categories = await getCategoriesAndDocuments("categories");
      dispatch(setCategories(categories));
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
