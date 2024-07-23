import { Item } from "../../types";
import { CartItemContainer, ItemDetails } from "./StyledCartItem";

export default function CartItem({ cartItem }: { cartItem: Item }) {
  const { name, price, imageUrl, quantity } = cartItem;
  return (
    <CartItemContainer>
      <img src={imageUrl} alt="Item" />
      <ItemDetails>
        <span>{name}</span>
        <span>
          {quantity} x £{price}
        </span>
      </ItemDetails>
    </CartItemContainer>
  );
}
