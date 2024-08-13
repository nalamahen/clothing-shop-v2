export type CategoryItem = {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
};

export type Category = {
  title: string;
  imageUrl: string;
  items: CategoryItem[];
};

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

export interface User {
  uid: string | null;
  email: string | null;
  displayName: string | null;
}
