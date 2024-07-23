import { useContext } from "react";
import shopingIcon from "../../assets/shopping-bag.svg";
import { CartContext } from "../../context/CartContext";
import { CartIconContainer, ItemCount } from "./StyledCartIcon";

export default function CartIcon() {
  const { isCartOpen, setIsCartOpen, cartCount } = useContext(CartContext);

  const toggleCart = () => setIsCartOpen(!isCartOpen);

  return (
    <CartIconContainer onClick={toggleCart}>
      <img src={shopingIcon} alt="Shopping Cart Icon" />
      <ItemCount>{cartCount}</ItemCount>
    </CartIconContainer>
  );
}
