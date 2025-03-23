"use client";

import React from 'react';
import { useDashboard } from '@/contexts/dashboard-context';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  Package,
  Users,
  BarChart3,
  Settings,
  LogOut,
} from 'lucide-react';

const navigation = [
  { name: 'Overview', href: 'overview', icon: LayoutDashboard },
  { name: 'Products', href: 'products', icon: Package },
  { name: 'Competitors', href: 'competitors', icon: Users },
  { name: 'Analytics', href: 'analytics', icon: BarChart3 },
];

export const Sidebar: React.FC = () => {
  const { activeTab, setActiveTab } = useDashboard();

  return (
    <div className="flex flex-col w-64 bg-white border-r">
      <div className="flex items-center h-16 px-4 border-b">
        <h1 className="text-xl font-bold">PriceTrack Pro</h1>
      </div>
      <nav className="flex-1 p-4 space-y-1">
        {navigation.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.href;
          return (
            <button
              key={item.name}
              onClick={() => setActiveTab(item.href)}
              className={cn(
                'flex items-center w-full px-4 py-2 text-sm font-medium rounded-md',
                isActive
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-gray-700 hover:bg-gray-50'
              )}
            >
              <Icon className="w-5 h-5 mr-3" />
              {item.name}
            </button>
          );
        })}
      </nav>
      <div className="p-4 border-t">
        <button className="flex items-center w-full px-4 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-50">
          <Settings className="w-5 h-5 mr-3" />
          Settings
        </button>
        <button className="flex items-center w-full px-4 py-2 mt-2 text-sm font-medium text-red-600 rounded-md hover:bg-red-50">
          <LogOut className="w-5 h-5 mr-3" />
          Logout
        </button>
      </div>
    </div>
  );
}; 