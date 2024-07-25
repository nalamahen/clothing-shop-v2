import { applyMiddleware, compose, createStore } from "redux";
import { rootReducer } from "./root-reducer";
import { logger } from "redux-logger";

const middlewares = [logger];

const composeEnhancers = compose(applyMiddleware(...middlewares));

export type AppDispatch = typeof store.dispatch;
export const store = createStore(rootReducer, undefined, composeEnhancers);
