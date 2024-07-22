import { Product } from "../../types";
import Button from "../button/Button";
import { Footer, Name, Price, ProductCartContainer } from "./StyledProductCard";

export default function ProductCard({ product }: { product: Product }) {
  const { name, price, imageUrl } = product;

  return (
    <ProductCartContainer>
      <img src={imageUrl} alt={name} />
      <Footer>
        <Name>{name}</Name>
        <Price>£{price}</Price>
      </Footer>
      <Button buttonType="inverted">Add to cart</Button>
    </ProductCartContainer>
  );
}
