import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { setIsCartOpen } from "../../store/cart/cart.reducer";
import { selectCartItems } from "../../store/cart/cart.selector";
import { AppDispatch } from "../../store/store";
import Button from "../button/Button";
import CartItem from "../cart-item/CartItem";
import { CartDropdownContainer, CartItems } from "./StyledCartDropdown";

export default function CartDropdown() {
  const dispatch: AppDispatch = useDispatch<AppDispatch>();
  const cartItems = useSelector(selectCartItems);
  const navigate = useNavigate();

  function handleGoCheckout() {
    navigate("/checkout");
    dispatch(setIsCartOpen(false));
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
