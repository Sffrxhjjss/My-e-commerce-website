import { Product } from '../types';

export const getUniqueCategories = (products: Product[]): string[] => {
  const categories = new Set(products.map(product => product.category));
  return Array.from(categories);
};

export const sortProducts = (products: Product[], sortBy: string): Product[] => {
  return [...products].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'name':
        return a.name.localeCompare(b.name);
      default:
        return 0;
    }
  });
};