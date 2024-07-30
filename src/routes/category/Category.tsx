import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import ProductCard from "../../components/product-card/ProductCard";
import { selectCategoriesMap } from "../../store/categories/category.selector";
import { Product } from "../../types";
import { CategoryContainer } from "./StyledCategory";

export default function Category() {
  const { category } = useParams() || {};
  const categoriesMap = useSelector(selectCategoriesMap);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (category) {
      setProducts(categoriesMap[category as keyof typeof categoriesMap]);
    }
  }, [category, categoriesMap]);

  return (
    <CategoryContainer>
      {products.map((product) => (
        <ProductCard key={(product as Product).id} product={product} />
      ))}
    </CategoryContainer>
  );
}
