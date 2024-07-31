import { AnyAction } from "redux";
import { User } from "../../types";
import { USER_ACTION_TYPES } from "./user.types";

export interface UserState {
  currentUser?: User | null;
  isLoading?: boolean;
  error?: string | null;
  email?: string;
  password?: string;
  displayName?: string;
}

const INITIAL_STATE: UserState = {
  currentUser: null,
  isLoading: false,
  error: null,
};

export function userReducer(
  state: UserState = INITIAL_STATE,
  action: AnyAction //UserAction
): UserState {
  const { type, payload } = action;
  switch (type) {
    case USER_ACTION_TYPES.SIGN_IN_SUCCESS:
      return {
        ...state,
        currentUser: payload,
      };
    case USER_ACTION_TYPES.SIGN_OUT_SUCCESS:
      return {
        ...state,
        currentUser: null,
      };
    case USER_ACTION_TYPES.SIGN_IN_FAILURE:
    case USER_ACTION_TYPES.SIGN_OUT_FAILURE:
    case USER_ACTION_TYPES.SIGN_UP_FAILURE:
      return {
        ...state,
        error: payload,
      };
    default:
      return state;
  }
}
