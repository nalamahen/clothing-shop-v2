import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import Button from "../button/Button";
import { CartDropdownContainer, CartItems } from "./StyledCartDropdown";
import CartItem from "../cart-item/CartItem";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { selectCartItems } from "../../store/cart/cart.selector";
import { AppDispatch } from "../../store/store";
import { setIsCartOpen } from "../../store/cart/cart.action";

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
