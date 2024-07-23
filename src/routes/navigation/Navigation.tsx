import { useContext } from "react";
import { Outlet } from "react-router";
import { Fragment } from "react/jsx-runtime";
import shopLogo from "../../assets/crown.svg";
import CartDropdown from "../../components/cart-dropdown/CartDropdown";
import CartIcon from "../../components/cart-icon/CartIcon";
import { CartContext } from "../../context/CartContext";
import { UserContext } from "../../context/UserContext";
import { signOutUser } from "../../utils/firebase";
import {
  LogoContainer,
  NavigationContainer,
  NavLink,
  NavLinks,
} from "./StyledNavigation";

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
