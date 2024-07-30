import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router";
import { fetchCategoriesAsync } from "../../store/categories/category.action";
import { AppDispatch } from "../../store/store";
import CategoriesPreview from "../categories-preview/CategoriesPreview";
import Category from "../category/Category";

export default function Shop() {
  const dispatch: AppDispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const getCategoryMap = async () => {
      dispatch(fetchCategoriesAsync());
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
