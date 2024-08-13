import { AnyAction } from "redux";
import { UserData } from "../../utils/firebase";
import { USER_ACTION_TYPES } from "./user.types";
import {
  signInFailure,
  signInSuccess,
  signOutFailure,
  signOutSuccess,
  signUpFailure,
} from "./user.action";

export type UserState = {
  readonly currentUser: UserData | null;
  readonly isLoaded: boolean;
  readonly error: Error | null;
};

const INITIAL_STATE: UserState = {
  currentUser: null,
  isLoaded: false,
  error: null,
};

export function userReducer(
  state: UserState = INITIAL_STATE,
  action: AnyAction
): UserState {
  if (signInSuccess.match(action)) {
    return {
      ...state,
      currentUser: action.payload,
    };
  }

  if (signOutSuccess.match(action)) {
    return {
      ...state,
      currentUser: null,
    };
  }

  if (
    signInFailure.match(action) ||
    signUpFailure.match(action) ||
    signOutFailure.match(action)
  ) {
    return {
      ...state,
      error: action.payload,
    };
  }

  return state;
}
