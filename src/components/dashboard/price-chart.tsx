"use client";

import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Filter } from 'lucide-react';
import dynamic from 'next/dynamic';
import { useDashboard } from '@/contexts/dashboard-context';

const Chart = dynamic(() => import('recharts').then(mod => {
  const { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } = mod;
  return function Chart({ data }) {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis domain={['dataMin - 5', 'dataMax + 5']} />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="myPrice" stroke="#2563EB" strokeWidth={2} name="Your Price" />
          <Line type="monotone" dataKey="amazon" stroke="#EF4444" strokeWidth={1.5} name="Amazon" />
          <Line type="monotone" dataKey="ebay" stroke="#10B981" strokeWidth={1.5} name="eBay" />
          <Line type="monotone" dataKey="googleShopping" stroke="#F59E0B" strokeWidth={1.5} name="Google Shopping" />
        </LineChart>
      </ResponsiveContainer>
    );
  };
}), { ssr: false });

export const PriceChart: React.FC = () => {
  const { priceHistory } = useDashboard();

  return (
    <Card className="mb-6">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Price Comparison</CardTitle>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <select className="border border-gray-300 rounded-md px-2 py-1 text-sm">
              <option>Last 10 days</option>
              <option>Last 30 days</option>
              <option>Last 90 days</option>
            </select>
          </div>
        </div>
        <CardDescription>
          Compare your prices with top competitors
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <Chart data={priceHistory} />
        </div>
      </CardContent>
    </Card>
  );
}; 