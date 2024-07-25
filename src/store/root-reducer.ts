import { combineReducers } from "redux";
import { userReducer } from "./user/user.reducer";
import { UserState } from "./user/user.reducer";

export interface RootState {
  user: UserState;
}

export const rootReducer = combineReducers({
  // all the reducers
  user: userReducer,
});
