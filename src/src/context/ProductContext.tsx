
import React, { createContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import productsData from './products.json';

interface Product {
  id: string;
  image: string;
  name: string;
  price: number;
  details: string;
  nutrition: string;
  review: string;
  rating: number;
  quantity: number;
}

interface ProductContextType {
  products: { [key: string]: Product[] };
  basket: Product[];
  updateQuantity: (category: string, itemId: string, change: number) => void;
  addToBasket: (item: Product) => Promise<void>;
}

export const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [basket, setBasket] = useState<Product[]>([]);
  const [products, setProducts] = useState<{ [key: string]: Product[] }>(productsData);

  useEffect(() => {
    loadBasket();
  }, []);

  const loadBasket = async () => {
    const savedBasket = await AsyncStorage.getItem('basket');
    if (savedBasket) setBasket(JSON.parse(savedBasket));
  };

  const updateQuantity = (category: string, itemId: string, change: number) => {
    const updatedProducts = { ...products };
    updatedProducts[category] = updatedProducts[category].map(item =>
      item.id === itemId ? { ...item, quantity: Math.max(0, item.quantity + change) } : item
    );
    setProducts(updatedProducts);
  };

  const addToBasket = async (item: Product) => {
    try {
      const updatedBasket = [...basket];
      const existingItem = updatedBasket.find(i => i.id === item.id);
      if (existingItem) {
        existingItem.quantity = item.quantity;
      } else if (item.quantity > 0) {
        updatedBasket.push({ ...item });
      }
      setBasket(updatedBasket);
      await AsyncStorage.setItem('basket', JSON.stringify(updatedBasket));
    } catch (error) {
      console.error('Error adding to basket:', error);
    }
  };

  return (
    <ProductContext.Provider value={{ products, basket, updateQuantity, addToBasket }}>
      {children}
    </ProductContext.Provider>
  );
};