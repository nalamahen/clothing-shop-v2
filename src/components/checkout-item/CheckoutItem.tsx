import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { Item } from "../../types";
import {
  Arrow,
  BaseSpan,
  CheckoutItemContainer,
  ImageContainer,
  Quantity,
  Value,
  RemoveButton,
} from "./StyledCheckoutItem";

export default function CheckoutItem({ cartItem }: { cartItem: Item }) {
  const { name, price, imageUrl, quantity } = cartItem;
  const { addItemToCart, removeItemFromCart } = useContext(CartContext);

  function handleRemoveItem() {
    removeItemFromCart(cartItem);
  }

  function handleAddItem() {
    addItemToCart(cartItem);
  }

  function handleDeleteItem() {
    removeItemFromCart(cartItem, true);
  }

  return (
    <CheckoutItemContainer>
      <ImageContainer>
        <img src={imageUrl} />
      </ImageContainer>
      <BaseSpan> {name} </BaseSpan>
      <Quantity>
        <Arrow onClick={handleRemoveItem}>&#10094;</Arrow>
        <Value>{quantity}</Value>
        <Arrow onClick={handleAddItem}>&#10095;</Arrow>
      </Quantity>
      <BaseSpan> £{price} </BaseSpan>
      <RemoveButton onClick={handleDeleteItem}>&#10005;</RemoveButton>
    </CheckoutItemContainer>
  );
}
