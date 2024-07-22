import Button from "../button/Button";
import { CartDropdownContainer, CartItems } from "./StyledCartDropdown";

export default function CartDropdown() {
  return (
    <CartDropdownContainer>
      <CartItems />
      <Button>CHECKOUT</Button>
    </CartDropdownContainer>
  );
}
