import { User } from "firebase/auth";

import { UserState } from "./user.reducer";
import { USER_ACTION_TYPES } from "./user.types";
import { ActionWithPayload, createAction } from "../../utils/reducer";

export type SetCurrentUserAction = {
  type: any;
  payload?: UserState;
};

export type UserAction = SetCurrentUserAction;

export const setCurrentUser = (user: User | null): UserAction => {
  return {
    type: USER_ACTION_TYPES.SET_CURRENT_USER,
    payload: { currentUser: user },
  };
};

export type EmailSignInStart = ActionWithPayload<
  USER_ACTION_TYPES.EMAIL_SIGN_IN_START,
  { email: string; password: string }
>;

export const checkUserSession = (): UserAction =>
  createAction(USER_ACTION_TYPES.CHECK_USER_SESSION);

export const googleSignInStart = (): UserAction =>
  createAction(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START);
export const emailSignInStart = (email: string, password: string): UserAction =>
  createAction(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, {
    email,
    password,
    currentUser: null,
  });

export const signInSuccess = (user: User): UserAction => {
  return createAction(USER_ACTION_TYPES.SIGN_IN_SUCCESS, {
    currentUser: user,
  });
};

export const signInFailure = (error: string): UserAction => {
  return createAction(USER_ACTION_TYPES.SIGN_IN_FAILURE, {
    currentUser: null,
    error,
  });
};

export const signUpStart = (
  email: string,
  password: string,
  displayName: string
): UserAction => {
  return {
    type: USER_ACTION_TYPES.SIGN_UP_START,
    payload: { email, password, displayName },
  };
};

export const signUpSuccess = (
  user: User,
  additionalDetails: any
): UserAction => {
  return createAction(USER_ACTION_TYPES.SIGN_UP_SUCCESS, {
    currentUser: user,
    additionalDetails,
  });
};

export const signUpFailure = (error: string): UserAction => {
  return createAction(USER_ACTION_TYPES.SIGN_UP_FAILURE, {
    currentUser: null,
    error,
  });
};

export const signOutStart = (): UserAction => {
  return createAction(USER_ACTION_TYPES.SIGN_OUT_START);
};

export const signOutSuccess = (): UserAction => {
  return createAction(USER_ACTION_TYPES.SIGN_OUT_SUCCESS);
};

export const signOutFailure = (error: string): UserAction => {
  return createAction(USER_ACTION_TYPES.SIGN_OUT_FAILURE, {
    error,
  });
};
