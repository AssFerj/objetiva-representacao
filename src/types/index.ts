export interface Brand {
  id: number;
  name: string;
  logo: string;
}

export interface Product {
  id: number;
  name: string;
  brand: string;
  image: string;
}