import { Fragment } from "react/jsx-runtime";
import CategoryPreview from "../../components/category-preview/CategoryPreview";
import { CategoriesContext } from "../../context/CategoriesContext";
import { useContext } from "react";

export default function CategoriesPreview() {
  const { categoriesMap } = useContext(CategoriesContext);

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
