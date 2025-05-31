export interface Brand {
  id: number;
  name: string;
  logo: string;
}

import { Timestamp } from 'firebase/firestore';

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
  userId: string;
  value: string;
  initialKm: string;
  finalKm: string;
  initialKmUrl?: string;
  finalKmUrl?: string;
  date: Timestamp;
  createdAt: Timestamp;
}