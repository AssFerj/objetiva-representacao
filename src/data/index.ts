import { Brand, Product } from '../types';

export const brands: Brand[] = [
  { id: 1, name: 'Omo Professional', logo: 'https://images.unsplash.com/photo-1598302936625-6075fbd98dd8?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=100&q=80' },
  { id: 2, name: 'Veja', logo: 'https://images.unsplash.com/photo-1585421514738-01798e348b17?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=100&q=80' },
  { id: 3, name: 'Brilhante', logo: 'https://images.unsplash.com/photo-1563453392212-326f5e854473?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=100&q=80' },
  { id: 4, name: 'Johnson', logo: 'https://images.unsplash.com/photo-1584735174914-6b1272458e3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=100&q=80' },
  { id: 5, name: 'Kimberly-Clark', logo: 'https://images.unsplash.com/photo-1616401784845-180882ba9ba8?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=100&q=80' },
];

export const products: Product[] = [
  { id: 1, name: 'Detergente Multiuso', brand: 'Omo Professional', image: 'https://images.unsplash.com/photo-1585421514738-01798e348b17?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' },
  { id: 2, name: 'Desinfetante', brand: 'Veja', image: 'https://images.unsplash.com/photo-1610557892470-55d587a6cd59?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' },
  { id: 3, name: 'Papel Toalha', brand: 'Kimberly-Clark', image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' },
  { id: 4, name: 'Sabonete Líquido', brand: 'Johnson', image: 'https://images.unsplash.com/photo-1622503174772-02f41da39b3d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' },
  { id: 5, name: 'Alvejante', brand: 'Brilhante', image: 'https://images.unsplash.com/photo-1585421514738-01798e348b17?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' },
  { id: 6, name: 'Limpador de Vidros', brand: 'Veja', image: 'https://images.unsplash.com/photo-1584735174914-6b1272458e3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' },
];