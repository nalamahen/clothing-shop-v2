import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import Button from "../button/Button";
import { CartDropdownContainer, CartItems } from "./StyledCartDropdown";
import CartItem from "../cart-item/CartItem";
import { useNavigate } from "react-router";

export default function CartDropdown() {
  const { cartItems, setIsCartOpen } = useContext(CartContext);
  const navigate = useNavigate();

  function handleGoCheckout() {
    navigate("/checkout");
    setIsCartOpen(false);
  }

  return (
    <CartDropdownContainer>
      <CartItems>
        {cartItems.length ? (
          cartItems.map((item) => <CartItem key={item.id} cartItem={item} />)
        ) : (
          <span>Your cart is empty</span>
        )}
      </CartItems>

      <Button onClick={handleGoCheckout}>CHECKOUT</Button>
    </CartDropdownContainer>
  );
}
