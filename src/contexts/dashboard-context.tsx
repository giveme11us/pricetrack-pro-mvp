"use client";

import React, { createContext, useContext, useState } from 'react';

export interface Product {
  id: string;
  name: string;
  category: string;
  competitor: string;
  currentPrice: number;
  priceChange: number;
  priceChangePercentage: number;
  lowestPrice: number;
  highestPrice: number;
  image: string;
  isActive: boolean;
  alerts: Alert[];
}

export interface Alert {
  id: string;
  type: 'price' | 'stock' | 'availability';
  isActive: boolean;
  message: string;
  time: string;
}

interface DashboardContextType {
  products: Product[];
  competitors: string[];
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  addAlert: (productId: string, alert: Omit<Alert, 'id'>) => void;
  deleteAlert: (productId: string, alertId: string) => void;
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export const DashboardProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [competitors] = useState<string[]>(['Amazon', 'eBay', 'Google Shopping']);

  const addProduct = (product: Omit<Product, 'id'>) => {
    const newProduct: Product = {
      ...product,
      id: Math.random().toString(36).substr(2, 9),
    };
    setProducts((prev) => [...prev, newProduct]);
  };

  const updateProduct = (id: string, product: Partial<Product>) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...product } : p))
    );
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const addAlert = (productId: string, alert: Omit<Alert, 'id'>) => {
    const newAlert: Alert = {
      ...alert,
      id: Math.random().toString(36).substr(2, 9),
    };
    setProducts((prev) =>
      prev.map((p) =>
        p.id === productId
          ? { ...p, alerts: [...p.alerts, newAlert] }
          : p
      )
    );
  };

  const deleteAlert = (productId: string, alertId: string) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === productId
          ? {
              ...p,
              alerts: p.alerts.filter((a) => a.id !== alertId),
            }
          : p
      )
    );
  };

  return (
    <DashboardContext.Provider
      value={{
        products,
        competitors,
        addProduct,
        updateProduct,
        deleteProduct,
        addAlert,
        deleteAlert,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (context === undefined) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
}; 