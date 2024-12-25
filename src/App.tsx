import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { ProductGrid } from './components/ProductGrid';
import { CategoryFilter } from './components/CategoryFilter';
import { SortSelect } from './components/SortSelect';
import { Cart } from './components/cart/Cart';
import { products } from './data/products';
import { Product, CartItem } from './types';
import { getCartItemCount } from './utils/cart';
import { getUniqueCategories, sortProducts } from './utils/products';
import { AuthProvider } from './context/AuthContext';

function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>();
  const [sortBy, setSortBy] = useState('');

  const categories = getUniqueCategories(products);
  const sortedProducts = sortProducts(products, sortBy);

  const addToCart = (product: Product) => {
    setCartItems(items => {
      const existingItem = items.find(item => item.id === product.id);
      if (existingItem) {
        return items.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...items, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (id: string, quantity: number) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const removeItem = (id: string) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const handleCheckoutSuccess = () => {
    setCartItems([]);
  };

  return (
    <AuthProvider>
      <div className="min-h-screen bg-gray-50">
        <Navbar
          cartItemCount={getCartItemCount(cartItems)}
          onCartClick={() => setIsCartOpen(true)}
        />
        
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-4xl font-bold text-center mb-8">
            Welcome to Lokesh
          </h1>
          
          <div className="flex items-center mb-6">
            <CategoryFilter
              categories={categories}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
            />
            <SortSelect
              value={sortBy}
              onChange={setSortBy}
            />
          </div>

          <ProductGrid
            products={sortedProducts}
            category={selectedCategory}
            onAddToCart={addToCart}
          />
        </main>

        {isCartOpen && (
          <Cart
            items={cartItems}
            onClose={() => setIsCartOpen(false)}
            onUpdateQuantity={updateQuantity}
            onRemoveItem={removeItem}
            onCheckoutSuccess={handleCheckoutSuccess}
          />
        )}
      </div>
    </AuthProvider>
  );
}

export default App;