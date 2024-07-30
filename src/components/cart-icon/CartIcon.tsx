import { useContext } from "react";
import shopingIcon from "../../assets/shopping-bag.svg";
import { CartContext } from "../../context/CartContext";
import { CartIconContainer, ItemCount } from "./StyledCartIcon";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCartCount,
  selectIsCartOpen,
} from "../../store/cart/cart.selector";
import { setIsCartOpen } from "../../store/cart/cart.action";
import { AppDispatch } from "../../store/store";

export default function CartIcon() {
  const dispatch: AppDispatch = useDispatch<AppDispatch>();
  const isCartOpen = useSelector(selectIsCartOpen);
  const cartCount = useSelector(selectCartCount);

  const toggleCart = () => dispatch(setIsCartOpen(!isCartOpen));

  return (
    <CartIconContainer onClick={toggleCart}>
      <img src={shopingIcon} alt="Shopping Cart Icon" />
      <ItemCount>{cartCount}</ItemCount>
    </CartIconContainer>
  );
}
