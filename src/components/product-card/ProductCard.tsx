import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { Product } from "../../types";
import Button from "../button/Button";
import { Footer, Name, Price, ProductCartContainer } from "./StyledProductCard";
import { AppDispatch } from "../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart } from "../../store/cart/cart.action";
import { selectCartItems } from "../../store/cart/cart.selector";

export default function ProductCard({ product }: { product: Product }) {
  const dispatch: AppDispatch = useDispatch<AppDispatch>();

  const { name, price, imageUrl } = product;
  const cartItems = useSelector(selectCartItems);

  function handleAddItemToCart() {
    dispatch(addItemToCart(cartItems, product));
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
