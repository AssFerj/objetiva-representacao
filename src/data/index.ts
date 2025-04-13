import { Brand, Product } from '../types';

export const brands: Brand[] = [
  { id: 1, name: 'Limpemax', logo: '/assets/brands/limpemax.png' },
  { id: 2, name: 'Liz Embalagens', logo: '/assets/brands/liz.png' },
  { id: 3, name: 'Perfil Papéis', logo: '/assets/brands/perfil.png' },
  { id: 4, name: 'Petyan', logo: '/assets/brands/petyan.png' },
  { id: 5, name: 'Cristal', logo: '/assets/brands/cristal.png' },
];

export const products: Product[] = [
  { id: 1, name: 'Detergente Multiuso', brand: 'Limpemax', image: 'https://images.unsplash.com/photo-1585421514738-01798e348b17?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' },
  { id: 2, name: 'Desinfetante', brand: 'Liz Embalagens', image: 'https://images.unsplash.com/photo-1610557892470-55d587a6cd59?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' },
  { id: 3, name: 'Papel Toalha', brand: 'Perfil Papéis', image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' },
  { id: 4, name: 'Sabonete Líquido', brand: 'Petyan', image: 'https://images.unsplash.com/photo-1622503174772-02f41da39b3d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' },
  { id: 5, name: 'Alvejante', brand: 'Cristal', image: 'https://images.unsplash.com/photo-1585421514738-01798e348b17?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' },
  { id: 6, name: 'Limpador de Vidros', brand: 'Liz Embalagens', image: 'https://images.unsplash.com/photo-1584735174914-6b1272458e3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' },
];