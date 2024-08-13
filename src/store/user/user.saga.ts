import { User } from "firebase/auth";
import { all, call, put, takeLatest } from "typed-redux-saga/macro";
import {
  AdditonalInformation,
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
  SignUpStart,
  SignUpSuccess,
} from "./user.action";
import { USER_ACTION_TYPES } from "./user.types";

export function* getSnapShotFromUserAuth(
  userAuth: User,
  additionalData?: AdditonalInformation
) {
  try {
    const userSnapshot = yield* call(
      createUserDocumentFromAuth,
      userAuth,
      additionalData
    );
    if (userSnapshot) {
      yield* put(
        signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() })
      );
    }
  } catch (error) {
    yield* put(signInFailure(error as Error));
  }
}

export function* signInWithGoogle() {
  try {
    const { user } = yield* call(signInWithGooglePopup);
    yield* call(getSnapShotFromUserAuth, user);
  } catch (error) {
    yield* put(signInFailure(error as Error));
  }
}

export function* signInWithEmail({
  payload: { email, password },
}: EmailSignInStart) {
  try {
    const data = yield* call(
      signInAuthUserWithEmailAndPassword,
      email,
      password
    );

    if (data) {
      const { user } = data;
      yield* call(getSnapShotFromUserAuth, user);
    }
  } catch (error) {
    yield put(signInFailure(error as Error));
  }
}

export function* isUserAuthenticated() {
  try {
    const userAuth: User | null = yield call(getCurrentUser);
    if (!userAuth) return;
    yield call(getSnapShotFromUserAuth, userAuth);
  } catch (error) {
    yield put(signInFailure(error as Error));
  }
}

export function* signUp({
  payload: { email, password, displayName },
}: SignUpStart) {
  try {
    const userCredential = yield* call(
      createAuthUserWithEmailAndPassword,
      email,
      password
    );

    if (userCredential) {
      const { user } = userCredential;
      yield* put(signUpSuccess(user, { displayName }));
    }
  } catch (error) {
    yield* put(signUpFailure(error as Error));
  }
}

export function* signOut() {
  try {
    yield* call(signOutUser);
    yield* put(signOutSuccess());
  } catch (error) {
    yield* put(signOutFailure(error as Error));
  }
}

export function* signInAfterSignUp({
  payload: { user, additionalData },
}: SignUpSuccess) {
  yield* call(getSnapShotFromUserAuth, user, additionalData);
}

export function* onGoogleSignInStart() {
  yield* takeLatest(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

export function* onCheckUserSession() {
  yield* takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* onEmailSignInStart() {
  yield* takeLatest(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, signInWithEmail);
}

export function* onSignUpStart() {
  yield* takeLatest(USER_ACTION_TYPES.SIGN_UP_START, signUp);
}

export function* onSignUpSuccess() {
  yield* takeLatest(USER_ACTION_TYPES.SIGN_UP_SUCCESS, signInAfterSignUp);
}

export function* signOutStart() {
  yield* takeLatest(USER_ACTION_TYPES.SIGN_OUT_START, signOut);
}

export function* userSagas() {
  yield* all([
    call(onCheckUserSession),
    call(onGoogleSignInStart),
    call(onEmailSignInStart),
    call(onSignUpStart),
    call(onSignUpSuccess),
    call(signOutStart),
  ]);
}
