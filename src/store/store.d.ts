// src/store/store.d.ts
import { Store, Dispatch } from "redux";
import { Persistor } from "redux-persist";
import { RootState } from "./root-reducer";

declare module "../../store/store" {
  export const store: Store<RootState>;
  export const persistor: Persistor;
  export type AppDispatch = Dispatch;
}
