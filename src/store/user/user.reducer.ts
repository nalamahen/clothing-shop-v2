import { AnyAction, createSlice } from "@reduxjs/toolkit";
import { User } from "../../types";

export interface UserState {
  currentUser: User | null;
  uid: string;
  email: string;
  displayName: string;
}

const INITIAL_STATE: UserState = {
  currentUser: null,
  uid: "",
  email: "",
  displayName: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState: INITIAL_STATE,
  reducers: {
    setCurrentUser: (state: UserState, action: AnyAction) => {
      state.currentUser = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setCurrentUser } = userSlice.actions;

// Reducer
export const userReducer = userSlice.reducer;
