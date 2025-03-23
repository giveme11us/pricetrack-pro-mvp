"use client";

import React, { createContext, useContext, useState } from 'react';
import { allProducts } from '@/data/products';
import { TrendingUp, DollarSign, AlertTriangle, ShoppingCart } from 'lucide-react';

export interface Product {
  id: string;
  name: string;
  category: string;
  currentPrice: number;
  lowestPrice: number;
  highestPrice: number;
  priceChange: number;
  priceChangePercentage: number;
  competitor: string;
  image: string;
  alerts: Alert[];
  isActive: boolean;
}

export interface Alert {
  id: string;
  type: 'price' | 'stock' | 'availability';
  message: string;
  threshold: number;
  time: string;
}

export interface Competitor {
  id: string;
  name: string;
  url: string;
  logo: string;
  products: number;
  lastChecked: string;
}

interface Analytics {
  priceChanges: number;
  priceChangePercentage: number;
  averagePrice: number;
  activeAlerts: number;
  productsTracked: number;
  priceDistribution: Array<{ name: string; value: number }>;
  competitorAnalysis: Array<{ name: string; value: number }>;
}

interface Stat {
  id: string;
  title: string;
  value: string | number;
  change: string;
  icon: React.ElementType;
}

interface DashboardContextType {
  products: Product[];
  alerts: Alert[];
  competitors: Competitor[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  toggleProductStatus: (id: string) => void;
  addAlert: (productId: string, alert: Omit<Alert, 'id'>) => void;
  deleteAlert: (productId: string, alertId: string) => void;
  priceHistory: Array<{
    date: string;
    myPrice: number;
    amazon: number;
    ebay: number;
    googleShopping: number;
  }>;
  analytics: Analytics;
  stats: Stat[];
}

const mockStats: Stat[] = [
  {
    id: '1',
    title: 'Total Products',
    value: 150,
    change: '+12% from last month',
    icon: ShoppingCart,
  },
  {
    id: '2',
    title: 'Average Price',
    value: '€99.99',
    change: '+5% from last month',
    icon: DollarSign,
  },
  {
    id: '3',
    title: 'Price Changes',
    value: 45,
    change: '+8% from last month',
    icon: TrendingUp,
  },
  {
    id: '4',
    title: 'Active Alerts',
    value: 8,
    change: '-2 from yesterday',
    icon: AlertTriangle,
  },
];

const mockCompetitors: Competitor[] = [
  {
    id: '1',
    name: 'Amazon',
    url: 'https://amazon.com',
    logo: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=500&h=500&fit=crop',
    products: 12,
    lastChecked: '5 minutes ago',
  },
  {
    id: '2',
    name: 'eBay',
    url: 'https://ebay.com',
    logo: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=500&h=500&fit=crop',
    products: 10,
    lastChecked: '3 minutes ago',
  },
  {
    id: '3',
    name: 'Google Shopping',
    url: 'https://shopping.google.com',
    logo: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=500&h=500&fit=crop',
    products: 8,
    lastChecked: '2 minutes ago',
  },
];

const mockAnalytics: Analytics = {
  priceChanges: 45,
  priceChangePercentage: 12,
  averagePrice: 99.99,
  activeAlerts: 8,
  productsTracked: 370,
  priceDistribution: [
    { name: '€0-50', value: 120 },
    { name: '€51-100', value: 150 },
    { name: '€101-200', value: 80 },
    { name: '€201+', value: 20 },
  ],
  competitorAnalysis: [
    { name: 'Amazon', value: 150 },
    { name: 'eBay', value: 120 },
    { name: 'Google Shopping', value: 100 },
  ],
};

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export const DashboardProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [products, setProducts] = useState<Product[]>([
    {
      id: '1',
      name: 'iPhone 13 Pro',
      category: 'Electronics',
      competitor: 'Amazon',
      image: 'https://images.unsplash.com/photo-1632661675196-85450a83c131',
      currentPrice: 999,
      lowestPrice: 899,
      highestPrice: 1099,
      priceChange: -50,
      priceChangePercentage: -4.8,
      isActive: true,
      alerts: [
        {
          id: '1',
          type: 'price',
          message: 'Price dropped below €900',
          threshold: 900,
          time: '2024-03-20 14:30',
        },
      ],
    },
    {
      id: '2',
      name: 'MacBook Pro M1',
      category: 'Electronics',
      competitor: 'Best Buy',
      image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8',
      currentPrice: 1299,
      lowestPrice: 1199,
      highestPrice: 1399,
      priceChange: 100,
      priceChangePercentage: 8.3,
      isActive: true,
      alerts: [],
    },
  ]);

  const [alerts, setAlerts] = useState<Alert[]>([
    {
      id: '1',
      type: 'price',
      message: 'Price dropped below €900',
      threshold: 900,
      time: '2024-03-20 14:30',
    },
  ]);

  const [competitors, setCompetitors] = useState<Competitor[]>([
    {
      id: '1',
      name: 'Amazon',
      url: 'https://amazon.com',
      logo: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=500&h=500&fit=crop',
      products: 12,
      lastChecked: '5 minutes ago',
    },
  ]);

  const [priceHistory] = useState([
    {
      date: '2024-03-01',
      myPrice: 100,
      amazon: 95,
      ebay: 105,
      googleShopping: 98,
    },
    {
      date: '2024-03-02',
      myPrice: 100,
      amazon: 92,
      ebay: 102,
      googleShopping: 95,
    },
    {
      date: '2024-03-03',
      myPrice: 100,
      amazon: 90,
      ebay: 100,
      googleShopping: 92,
    },
  ]);

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

  const toggleProductStatus = (id: string) => {
    setProducts(products.map(product =>
      product.id === id ? { ...product, isActive: !product.isActive } : product
    ));
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
        alerts,
        competitors,
        activeTab,
        setActiveTab,
        addProduct,
        updateProduct,
        deleteProduct,
        toggleProductStatus,
        addAlert,
        deleteAlert,
        priceHistory,
        analytics: mockAnalytics,
        stats: mockStats,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
}; 