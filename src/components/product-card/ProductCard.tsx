import { useDispatch } from "react-redux";
import { addItemToCart } from "../../store/cart/cart.reducer";
import { AppDispatch } from "../../store/store";
import { Product } from "../../types";
import Button from "../button/Button";
import { Footer, Name, Price, ProductCartContainer } from "./StyledProductCard";

export default function ProductCard({ product }: { product: Product }) {
  const dispatch: AppDispatch = useDispatch<AppDispatch>();

  const { name, price, imageUrl } = product;

  function handleAddItemToCart() {
    dispatch(addItemToCart(product));
  }

  return (
    <ProductCartContainer>
      <img src={imageUrl} alt={name} />
      <Footer>
        <Name>{name}</Name>
        <Price>£{price}</Price>
      </Footer>
      <Button buttonType="inverted" onClick={handleAddItemToCart}>
        Add to cart
      </Button>
    </ProductCartContainer>
  );
}
