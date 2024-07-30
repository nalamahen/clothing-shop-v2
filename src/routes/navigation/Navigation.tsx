import { useContext } from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router";
import { Fragment } from "react/jsx-runtime";
import shopLogo from "../../assets/crown.svg";
import CartDropdown from "../../components/cart-dropdown/CartDropdown";
import CartIcon from "../../components/cart-icon/CartIcon";
import { CartContext } from "../../context/CartContext";
import { signOutUser } from "../../utils/firebase";
import {
  LogoContainer,
  NavigationContainer,
  NavLink,
  NavLinks,
} from "./StyledNavigation";
import { RootState } from "../../store/root-reducer";
import { selectCurrentUser } from "../../store/user/user.selector";
import { selectIsCartOpen } from "../../store/cart/cart.selector";

export default function Navigation() {
  //const { isCartOpen } = useContext(CartContext);
  const isCartOpen = useSelector(selectIsCartOpen);
  const currentUser = useSelector(selectCurrentUser);

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
              onClick={signOutUser}
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
