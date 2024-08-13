//import { applyMiddleware, compose, createStore } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./root-reducer";

import { logger } from "redux-logger";
import { ThunkDispatch } from "redux-thunk";

export type RootState = ReturnType<typeof rootReducer>;

const middlewares = [process.env.NODE_ENV === "development" && logger].filter(
  Boolean
);

export type AppDispatch = ThunkDispatch<RootState, void, any>;

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(middlewares),
});
