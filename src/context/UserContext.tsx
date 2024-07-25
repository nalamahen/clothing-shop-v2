import { createContext, ReactNode, useEffect, useReducer } from "react";
import {
  createUserDocumentFromAuth,
  onAuthStateChangedListener,
} from "../utils/firebase";
import { createAction } from "../utils/reducer";

type User = {
  uid: string | null;
  email: string | null;
  displayName: string | null;
};

interface UserState {
  currentUser: User | null;
}

interface UserContextType {
  currentUser: UserState; // Adjusted to UserState
  setCurrentUser: (user: User | null) => void;
}

const INITIAL_STATE = {
  currentUser: null,
};

// Update the context's type to expect a user object or null.
export const UserContext = createContext<UserContextType>({
  currentUser: INITIAL_STATE,
  setCurrentUser: () => {}, // This is just a placeholder to satisfy the initial context value requirement.
});

const USER_ACTION_TYPES = {
  SET_CURRENT_USER: "SET_CURRENT_USER",
};

const userReducer = (
  state: UserState,
  action: { type: string; payload: User | null }
): UserState => {
  const { type, payload } = action;
  switch (type) {
    case USER_ACTION_TYPES.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: payload,
      };
    default:
      throw new Error(`Unhandled action type: ${type}`);
  }
};

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, dispatch] = useReducer(userReducer, INITIAL_STATE);

  const setCurrentUser = (user: User | null) => {
    dispatch(createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user));
  };

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
