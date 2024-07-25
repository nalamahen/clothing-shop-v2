import { User } from "firebase/auth";
import { createAction } from "../../utils/reducer";
import { USER_ACTION_TYPES } from "./user.types";

export type SetCurrentUserAction = {
  type: typeof USER_ACTION_TYPES.SET_CURRENT_USER;
  payload: User | null;
};

export type UserAction = SetCurrentUserAction;

export const setCurrentUser = (user: User | null): UserAction =>
  createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user);
