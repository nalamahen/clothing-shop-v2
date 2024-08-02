//import { applyMiddleware, compose, createStore } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { rootReducer, RootState } from "./root-reducer";

import { logger } from "redux-logger";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import { persistStore } from "redux-persist";
import { thunk, ThunkAction, ThunkDispatch } from "redux-thunk";

// const persistConfig = {
//   key: "root",
//   storage,
//   whitelist: ["cart"],
// };

// const persistedReducer = persistReducer<RootState>(persistConfig, rootReducer);

const middlewares = [process.env.NODE_ENV === "development" && logger].filter(
  Boolean
);

// const composeEnhancer =
//   (process.env.NODE_ENV !== "production" &&
//     window &&
//     window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
//   compose;

// const composeEnhancers = composeEnhancer(applyMiddleware(...middlewares));

// export const store = createStore(persistedReducer, undefined, composeEnhancers);
// export const persistor = persistStore(store);
export type AppDispatch = ThunkDispatch<RootState, void, any>;
// export type AppThunk<ReturnType = void> = ThunkAction<
//   ReturnType,
//   RootState,
//   unknown,
//   any
// >;

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(middlewares),
});
