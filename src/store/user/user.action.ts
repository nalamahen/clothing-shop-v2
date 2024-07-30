import { User } from "firebase/auth";

import { UserState } from "./user.reducer";
import { USER_ACTION_TYPES } from "./user.types";

export type SetCurrentUserAction = {
  type: typeof USER_ACTION_TYPES.SET_CURRENT_USER;
  payload: UserState;
};

export type UserAction = SetCurrentUserAction;

export const setCurrentUser = (user: User | null): UserAction => {
  return {
    type: USER_ACTION_TYPES.SET_CURRENT_USER,
    payload: { currentUser: user },
  };
};
