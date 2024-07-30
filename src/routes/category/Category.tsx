import { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import ProductCard from "../../components/product-card/ProductCard";
import {
  selectCategoriesMap,
  selectIsCategoriesLoading,
} from "../../store/categories/category.selector";
import { Product } from "../../types";
import { CategoryContainer } from "./StyledCategory";
import Spinner from "../../components/spinner/Spinner";

export default function Category() {
  const { category } = useParams() || {};
  const categoriesMap = useSelector(selectCategoriesMap);
  const [products, setProducts] = useState<Product[]>([]);
  const isLoading = useSelector(selectIsCategoriesLoading);

  useEffect(() => {
    if (category) {
      setProducts(categoriesMap[category as keyof typeof categoriesMap]);
    }
  }, [category, categoriesMap]);

  return (
    <Fragment>
      <h2>{category?.toUpperCase()}</h2>
      {isLoading && <Spinner />}
      <CategoryContainer>
        {products.map((product) => (
          <ProductCard key={(product as Product).id} product={product} />
        ))}
      </CategoryContainer>
    </Fragment>
  );
}
