import { CartIconContainer, ItemCount } from "./StyledCartIcon";
import shopingIcon from "../../assets/shopping-bag.svg";
import { useContext, useState } from "react";
import { CartContext } from "../../context/CartContext";
//import { ReactComponent as ShoppingIcon } from "../../assets/shopping-bag.svg";

export default function CartIcon() {
  const { isCartOpen, setIsCartOpen } = useContext(CartContext);

  const toggleCart = () => setIsCartOpen(!isCartOpen);

  return (
    <CartIconContainer onClick={toggleCart}>
      <img src={shopingIcon} alt="Shopping Cart Icon" />
      {/* <ShoppingIcon /> */}
      <ItemCount>0</ItemCount>
    </CartIconContainer>
  );
}
