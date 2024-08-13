import { Middleware } from "redux";
import { RootState } from "../store/store";

export const loggerMiddleware: Middleware<{}, RootState> =
  (store) => (next) => (action: any) => {
    if (!action.type) {
      return next(action);
    }

    console.log("type:", action.type);
    console.log("payload:", action.payload);
    console.log("state:", store.getState());

    next(action);

    console.log("new state:", store.getState());
  };
