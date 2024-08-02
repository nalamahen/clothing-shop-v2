import { useDispatch } from "react-redux";
import {
  addItemToCart,
  removeItemFromCart,
} from "../../store/cart/cart.reducer";
import { AppDispatch } from "../../store/store";
import { Item } from "../../types";
import {
  Arrow,
  BaseSpan,
  CheckoutItemContainer,
  ImageContainer,
  Quantity,
  RemoveButton,
  Value,
} from "./StyledCheckoutItem";

export default function CheckoutItem({ cartItem }: { cartItem: Item }) {
  const dispatch: AppDispatch = useDispatch<AppDispatch>();

  const { name, price, imageUrl, quantity } = cartItem;

  function handleRemoveItem() {
    dispatch(removeItemFromCart(cartItem));
  }

  function handleAddItem() {
    dispatch(addItemToCart(cartItem));
  }

  function handleDeleteItem() {
    dispatch(removeItemFromCart(cartItem));
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
