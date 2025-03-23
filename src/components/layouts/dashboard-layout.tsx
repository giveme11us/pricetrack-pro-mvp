"use client";

import React from 'react';
import { Sidebar } from '@/components/dashboard/sidebar';
import { Header } from '@/components/dashboard/header';
import { ProductTable } from '@/components/dashboard/product-table';
import { Competitors } from '@/components/dashboard/competitors';
import { Analytics } from '@/components/dashboard/analytics';
import { useDashboard } from '@/contexts/dashboard-context';

export const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { activeTab } = useDashboard();

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return children;
      case 'products':
        return <ProductTable />;
      case 'competitors':
        return <Competitors />;
      case 'analytics':
        return <Analytics />;
      default:
        return children;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}; 