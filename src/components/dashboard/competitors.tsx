"use client";

import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DollarSign,
  TrendingUp,
  Package,
  Clock,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

export const Competitors: React.FC = () => {
  // Mock competitor data
  const competitors = [
    {
      id: '1',
      name: 'Amazon',
      products: 150,
      averagePrice: 99.99,
      priceChanges: 45,
      lastChecked: '5 minutes ago',
    },
    {
      id: '2',
      name: 'eBay',
      products: 120,
      averagePrice: 89.99,
      priceChanges: 38,
      lastChecked: '10 minutes ago',
    },
    {
      id: '3',
      name: 'Google Shopping',
      products: 100,
      averagePrice: 94.99,
      priceChanges: 42,
      lastChecked: '15 minutes ago',
    },
  ];

  // Mock price comparison data
  const priceComparison = [
    { name: 'Amazon', price: 99.99 },
    { name: 'eBay', price: 89.99 },
    { name: 'Google Shopping', price: 94.99 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Competitors</h2>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Competitor
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {competitors.map((competitor) => (
          <Card key={competitor.id}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>{competitor.name}</span>
                <Badge variant="secondary">
                  {competitor.lastChecked}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <ShoppingCart className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-500">Products</span>
                  </div>
                  <span className="font-medium">{competitor.products}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <DollarSign className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-500">Avg. Price</span>
                  </div>
                  <span className="font-medium">€{competitor.averagePrice}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-500">Price Changes</span>
                  </div>
                  <span className="font-medium">{competitor.priceChanges}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Price Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={priceComparison}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="price" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}; 