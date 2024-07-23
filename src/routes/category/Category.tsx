import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import ProductCard from "../../components/product-card/ProductCard";
import { CategoriesContext } from "../../context/CategoriesContext";
import { Product } from "../../types";
import { CategoryContainer } from "./StyledCategory";

export default function Category() {
  const { category } = useParams() || {};
  const { categoriesMap } = useContext(CategoriesContext);
  const [products, setProducts] = useState([]);

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
