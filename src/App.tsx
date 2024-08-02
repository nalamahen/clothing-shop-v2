import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import Authentication from "./routes/authentication/Authentication";
import Checkout from "./routes/checkout/Checkout";
import Home from "./routes/home/Home";
import Navigation from "./routes/navigation/Navigation";
import Shop from "./routes/shop/Shop";

import { AppDispatch } from "./store/store"; // Import the AppDispatch type
import { setCurrentUser } from "./store/user/user.reducer";
import {
  createUserDocumentFromAuth,
  onAuthStateChangedListener,
} from "./utils/firebase";

function App() {
  const dispatch: AppDispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user: any) => {
      if (user) {
        createUserDocumentFromAuth(user);
      }
      const pickedUser =
        user &&
        (({ accessToken, email }: { accessToken: string; email: string }) => ({
          accessToken,
          email,
        }));
      dispatch(setCurrentUser(pickedUser));
    });

    // Clean up the listener when the component unmounts.
    return unsubscribe;
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="shop/*" element={<Shop />} />
        <Route path="auth" element={<Authentication />} />
        <Route path="checkout" element={<Checkout />} />
      </Route>
    </Routes>
  );
}

export default App;
