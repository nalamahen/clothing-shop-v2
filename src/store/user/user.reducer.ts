import { Action, User } from "../../types";
import { UserAction } from "./user.action";
import { USER_ACTION_TYPES } from "./user.types";

export interface UserState {
  currentUser: User | null;
}

const INITIAL_STATE: UserState = {
  currentUser: null,
};

export function userReducer(
  state: UserState = INITIAL_STATE,
  action: UserAction
): UserState {
  const { type, payload } = action;
  switch (type) {
    case USER_ACTION_TYPES.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: payload,
      };
    default:
      return state;
  }
}
