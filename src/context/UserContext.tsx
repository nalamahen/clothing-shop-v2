import {
  createContext,
  useState,
  Dispatch,
  SetStateAction,
  ReactNode,
  useEffect,
} from "react";
import {
  createUserDocumentFromAuth,
  onAuthStateChangedListener,
} from "../utils/firebase";

type User = {
  uid: string | null;
  email: string | null;
  displayName: string | null;
};

// Update the context's type to expect a user object or null.
export const UserContext = createContext<{
  currentUser: User | null;
  setCurrentUser: Dispatch<SetStateAction<User | null>>;
}>({
  currentUser: null,
  setCurrentUser: () => {}, // This is just a placeholder to satisfy the initial context value requirement.
});

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const value = { currentUser, setCurrentUser };

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        createUserDocumentFromAuth(user);
      }
      setCurrentUser(user);
    });

    //  Clean up the listener when the component unmounts.
    return unsubscribe;
  }, []);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
