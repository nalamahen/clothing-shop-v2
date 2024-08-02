import { useDispatch, useSelector } from "react-redux";
import shopingIcon from "../../assets/shopping-bag.svg";
import { setIsCartOpen } from "../../store/cart/cart.reducer";
import {
  selectCartCount,
  selectIsCartOpen,
} from "../../store/cart/cart.selector";
import { AppDispatch } from "../../store/store";
import { CartIconContainer, ItemCount } from "./StyledCartIcon";

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
