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
