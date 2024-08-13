import { AnyAction, createSlice } from "@reduxjs/toolkit";
import { UserData } from "../../utils/firebase";

export type UserState = {
  currentUser: UserData | null;
  isLoaded: boolean;
  error: Error | null;
};

const INITIAL_STATE: UserState = {
  currentUser: null,
  isLoaded: false,
  error: null,
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
