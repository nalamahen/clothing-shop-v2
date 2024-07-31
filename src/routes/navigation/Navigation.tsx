import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router";
import { Fragment } from "react/jsx-runtime";
import shopLogo from "../../assets/crown.svg";
import CartDropdown from "../../components/cart-dropdown/CartDropdown";
import CartIcon from "../../components/cart-icon/CartIcon";
import { selectIsCartOpen } from "../../store/cart/cart.selector";
import { signOutStart } from "../../store/user/user.action";
import { selectCurrentUser } from "../../store/user/user.selector";
import {
  LogoContainer,
  NavigationContainer,
  NavLink,
  NavLinks,
} from "./StyledNavigation";

export default function Navigation() {
  const dispatch = useDispatch();
  const isCartOpen = useSelector(selectIsCartOpen);
  const currentUser = useSelector(selectCurrentUser);

  const signOutUser = () => dispatch(signOutStart());

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
