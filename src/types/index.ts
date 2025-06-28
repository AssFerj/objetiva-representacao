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

export interface Receipt {
  id: string;
  location: string;
  userName: string;
  userEmail: string;
  userId: string;
  value: number;
  initialKm: number;
  finalKm: number;
  initialKmUrl?: string;
  finalKmUrl?: string | null;
  status: string;
  createdAt: string;
}