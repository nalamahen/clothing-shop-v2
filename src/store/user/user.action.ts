import { User } from "firebase/auth";
import { USER_ACTION_TYPES } from "./user.types";
import { Action } from "redux";
import {
  ActionWithPayload,
  createAction,
  withMatcher,
} from "../../utils/reducer";
import { AdditonalInformation, UserData } from "../../utils/firebase";

export type CheckUserSession = Action<USER_ACTION_TYPES.CHECK_USER_SESSION>;

export type SetCurrentUser = ActionWithPayload<
  USER_ACTION_TYPES.SET_CURRENT_USER,
  UserData
>;

export type GoogleSignInStart = Action<USER_ACTION_TYPES.GOOGLE_SIGN_IN_START>;

export type EmailSignInStart = ActionWithPayload<
  USER_ACTION_TYPES.EMAIL_SIGN_IN_START,
  { email: string; password: string }
>;

export type SignUpStart = ActionWithPayload<
  USER_ACTION_TYPES.SIGN_UP_START,
  { email: string; password: string; displayName: string }
>;

export type SignOutStart = Action<USER_ACTION_TYPES.SIGN_OUT_START>;

export type SignInSuccess = ActionWithPayload<
  USER_ACTION_TYPES.SIGN_IN_SUCCESS,
  UserData
>;

export type SignInFailure = ActionWithPayload<
  USER_ACTION_TYPES.SIGN_IN_FAILURE,
  Error
>;

export type SignUpSuccess = ActionWithPayload<
  USER_ACTION_TYPES.SIGN_UP_SUCCESS,
  { user: UserData; additionalData: AdditonalInformation }
>;

export type SignUpFailure = ActionWithPayload<
  USER_ACTION_TYPES.SIGN_UP_FAILURE,
  Error
>;

export type SignOutSuccess = Action<USER_ACTION_TYPES.SIGN_OUT_SUCCESS>;

export type SignOutFailure = ActionWithPayload<
  USER_ACTION_TYPES.SIGN_OUT_FAILURE,
  Error
>;

export const checkUserSession = withMatcher((): CheckUserSession => {
  return {
    type: USER_ACTION_TYPES.CHECK_USER_SESSION,
  };
});

export const setCurrentUser = withMatcher((user: UserData): SetCurrentUser => {
  return createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user);
});

export const googleSignInStart = withMatcher((): GoogleSignInStart => {
  return createAction(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START);
});

export const emailSignInStart = withMatcher(
  (email: string, password: string): EmailSignInStart => {
    return createAction(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, {
      email,
      password,
    });
  }
);

export const signInSuccess = withMatcher((user: UserData): SignInSuccess => {
  return createAction(USER_ACTION_TYPES.SIGN_IN_SUCCESS, user);
});

export const signInFailure = withMatcher((error: Error): SignInFailure => {
  return createAction(USER_ACTION_TYPES.SIGN_IN_FAILURE, error);
});

export const signUpStart = withMatcher(
  (email: string, password: string, displayName: string): SignUpStart => {
    return createAction(USER_ACTION_TYPES.SIGN_UP_START, {
      email,
      password,
      displayName,
    });
  }
);

export const signUpSuccess = withMatcher(
  (user: UserData, additionalData: AdditonalInformation): SignUpSuccess => {
    return createAction(USER_ACTION_TYPES.SIGN_UP_SUCCESS, {
      user,
      additionalData,
    });
  }
);

export const signUpFailure = withMatcher((error: Error): SignUpFailure => {
  return createAction(USER_ACTION_TYPES.SIGN_UP_FAILURE, error);
});

export const signOutStart = withMatcher((): SignOutStart => {
  return createAction(USER_ACTION_TYPES.SIGN_OUT_START);
});

export const signOutSuccess = withMatcher((): SignOutSuccess => {
  return createAction(USER_ACTION_TYPES.SIGN_OUT_SUCCESS);
});

export const signOutFailure = withMatcher((error: Error): SignOutFailure => {
  return createAction(USER_ACTION_TYPES.SIGN_OUT_FAILURE, error);
});
