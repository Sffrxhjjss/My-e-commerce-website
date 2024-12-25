import React from 'react';
import { ProductCard } from './ProductCard';
import { Product } from '../types';

interface ProductGridProps {
  products: Product[];
  category?: string;
  onAddToCart: (product: Product) => void;
}

export function ProductGrid({ products, category, onAddToCart }: ProductGridProps) {
  const filteredProducts = category
    ? products.filter(product => product.category === category)
    : products;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {filteredProducts.map(product => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={onAddToCart}
        />
      ))}
    </div>
  );
}