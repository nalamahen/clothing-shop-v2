export interface Category {
  id: number;
  title: string;
  imageUrl: string;
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
