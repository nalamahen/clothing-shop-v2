import { User } from "firebase/auth";
import { all, call, put, takeLatest } from "redux-saga/effects";
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
  getCurrentUser,
  signInAuthUserWithEmailAndPassword,
  signInWithGooglePopup,
  signOutUser,
} from "../../utils/firebase";
import {
  EmailSignInStart,
  signInFailure,
  signInSuccess,
  signUpFailure,
  signUpSuccess,
  signOutSuccess,
  signOutFailure,
} from "./user.action";
import { USER_ACTION_TYPES } from "./user.types";

export function* getSnapShotFromUserAuth(
  userAuth: User,
  additionalData?: any
): Generator<any, void, any> {
  try {
    const userSnapshot = yield call(
      createUserDocumentFromAuth,
      userAuth,
      additionalData
    );
    yield put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }));
  } catch (error: Error | any) {
    yield put(signInFailure(error.message));
  }
}

export function* signInWithGoogle() {
  try {
    const { user } = yield call(signInWithGooglePopup);
    yield call(getSnapShotFromUserAuth, user);
  } catch (error: Error | any) {
    yield put(signInFailure(error.message));
  }
}

export function* signInWithEmail({
  payload: { email, password },
}: EmailSignInStart): Generator<any, void, any> {
  try {
    const data = yield call(
      signInAuthUserWithEmailAndPassword,
      email,
      password
    );

    if (data) {
      const { user } = data;
      yield call(getSnapShotFromUserAuth, user);
    }
  } catch (error: Error | any) {
    yield put(signInFailure(error));
  }
}

export function* isUserAuthenticated() {
  try {
    const userAuth: User | null = yield call(getCurrentUser);
    if (!userAuth) return;
    yield call(getSnapShotFromUserAuth, userAuth);
  } catch (error: Error | any) {
    yield put(signInFailure(error.message));
  }
}

export function* signUp({
  payload: { email, password, displayName },
}: any): Generator<any, void, any> {
  try {
    const { user } = yield call(
      createAuthUserWithEmailAndPassword,
      email,
      password
    );
    yield put(signUpSuccess(user, { displayName }));
  } catch (error: Error | any) {
    yield put(signUpFailure(error.message));
  }
}

export function* signOut() {
  try {
    yield call(signOutUser);
    yield put(signOutSuccess());
  } catch (error: Error | any) {
    yield put(signOutFailure(error.message));
  }
}

export function* signInAfterSignUp({
  payload: { user, additionalDetails },
}: any): Generator<any, void, any> {
  yield call(getSnapShotFromUserAuth, user, additionalDetails);
}

export function* onGoogleSignInStart() {
  yield takeLatest(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

export function* onCheckUserSession() {
  yield takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* onEmailSignInStart() {
  yield takeLatest(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, signInWithEmail);
}

export function* onSignUpStart() {
  yield takeLatest(USER_ACTION_TYPES.SIGN_UP_START, signUp);
}

export function* onSignUpSuccess() {
  yield takeLatest(USER_ACTION_TYPES.SIGN_UP_SUCCESS, signInAfterSignUp);
}

export function* signOutStart() {
  yield takeLatest(USER_ACTION_TYPES.SIGN_OUT_START, signOut);
}

export function* userSagas() {
  yield all([
    call(onCheckUserSession),
    call(onGoogleSignInStart),
    call(onEmailSignInStart),
    call(onSignUpStart),
    call(onSignUpSuccess),
    call(signOutStart),
  ]);
}
