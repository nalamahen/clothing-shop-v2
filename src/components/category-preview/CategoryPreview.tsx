import ProductCard from "../product-card/ProductCard";
import {
  CategoryPreviewContainer,
  Preview,
  Title,
} from "./StyledCategoryPreview";

interface CategoryPreviewProps {
  title: string;
  products: any[];
}

export default function CategoryPreview({
  title,
  products,
}: CategoryPreviewProps) {
  return (
    <CategoryPreviewContainer>
      <Title to={`/shop/${title.toLowerCase()}`}>{title.toUpperCase()}</Title>
      <Preview>
        {products.slice(0, 4).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </Preview>
    </CategoryPreviewContainer>
  );
}
