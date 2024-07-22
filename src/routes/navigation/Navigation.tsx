import { Outlet } from "react-router";
import {
  LogoContainer,
  NavigationContainer,
  NavLink,
  NavLinks,
} from "./StyledNavigation";
import shopLogo from "../../assets/crown.svg";
import { Fragment } from "react/jsx-runtime";
import { UserContext } from "../../context/UserContext";
import { useContext, useState } from "react";
import { signOutUser } from "../../utils/firebase";
import CartIcon from "../../components/cart-icon/CartIcon";
import CartDropdown from "../../components/cart-dropdown/CartDropdown";
import { CartContext } from "../../context/CartContext";

export default function Navigation() {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const { isCartOpen } = useContext(CartContext);

  async function handleSignOut() {
    await signOutUser();
    setCurrentUser(null);
  }

  return (
    <Fragment>
      <NavigationContainer>
        <LogoContainer to="/">
          <img src={shopLogo} alt="Clothing Shop Logo" />
        </LogoContainer>
        <NavLinks>
          <NavLink to="/shop">SHOP</NavLink>

          {currentUser ? (
            // <NavLink as="span" onClick={signOutUser}>
            //   SIGN OUT
            // </NavLink>
            <span
              onClick={handleSignOut}
              style={{ cursor: "pointer", padding: "10px 15px" }}
            >
              SIGN OUT
            </span>
          ) : (
            <NavLink to="/auth">SIGN IN</NavLink>
          )}
          <CartIcon />
        </NavLinks>
        {isCartOpen && <CartDropdown />}
      </NavigationContainer>
      <Outlet />
    </Fragment>
  );
}
