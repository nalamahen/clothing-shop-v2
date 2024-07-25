import { UserAction } from "../store/user/user.action";
import { USER_ACTION_TYPES } from "../store/user/user.types";

export interface Category {
  title: string;
  items: Product[];
}

export interface FirebaseError {
  code: string;
  message: string;
}

export interface Product {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
}

export interface Item extends Product {
  quantity: number;
}

export interface CategoryMap {
  [key: string]: Product[];
}

export interface User {
  uid: string | null;
  email: string | null;
  displayName: string | null;
}

export type Action = {
  USER_ACTION_TYPES: UserAction;
};
