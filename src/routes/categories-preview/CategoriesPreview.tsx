import { useSelector } from "react-redux";
import { Fragment } from "react/jsx-runtime";
import CategoryPreview from "../../components/category-preview/CategoryPreview";
import { selectCategoriesMap } from "../../store/categories/category.selector";

export default function CategoriesPreview() {
  const categoriesMap = useSelector(selectCategoriesMap);

  return (
    <Fragment>
      {Object.keys(categoriesMap).map((title) => {
        const products = categoriesMap[title as keyof typeof categoriesMap];
        return (
          <CategoryPreview key={title} title={title} products={products} />
        );
      })}
    </Fragment>
  );
}
