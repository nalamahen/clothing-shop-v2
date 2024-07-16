import { Outlet } from "react-router";
import {
  LogoContainer,
  NavigationContainer,
  NavLink,
  NavLinks,
} from "./StyledNavigation";
import shopLogo from "../../assets/crown.svg";
import { Fragment } from "react/jsx-runtime";

export default function Navigation() {
  return (
    <Fragment>
      <NavigationContainer>
        <LogoContainer to="/">
          <img src={shopLogo} alt="Clothing Shop Logo" />
        </LogoContainer>
        <NavLinks>
          <NavLink to="/shop">SHOP</NavLink>
          <NavLink to="/auth">SIGN IN</NavLink>

          {/* {currentUser ? (
          <NavLink as='span' onClick={signOutUser}>
            SIGN OUT
          </NavLink>
          ) : (
            <NavLink to='/auth'>SIGN IN</NavLink>
          )} */}
          {/* <CartIcon /> */}
        </NavLinks>
        {/* {isCartOpen && <CartDropdown />} */}
      </NavigationContainer>
      <Outlet />
    </Fragment>
  );
}
