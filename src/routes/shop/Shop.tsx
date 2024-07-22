import { useContext } from "react";
import { ProductsContext } from "../../context/ProductsContext";
import ProductCard from "../../components/product-card/ProductCard";
import { ShopContainer } from "./StyledShop";

export default function Shop() {
  const { products } = useContext(ProductsContext);

  return (
    <ShopContainer>
      {products &&
        products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
    </ShopContainer>
  );
}
