"use client";

import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Product } from '@/contexts/dashboard-context';
import {
  DollarSign,
  TrendingUp,
  X,
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface PriceHistoryProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product: Product;
}

export const PriceHistory: React.FC<PriceHistoryProps> = ({
  open,
  onOpenChange,
  product,
}) => {
  // Generate mock price history data
  const generatePriceHistory = () => {
    const data = [];
    const currentDate = new Date();
    const currentPrice = product.currentPrice;
    
    // Generate 30 days of price history
    for (let i = 30; i >= 0; i--) {
      const date = new Date(currentDate);
      date.setDate(date.getDate() - i);
      
      // Generate a random price variation between -10% and +10%
      const variation = (Math.random() * 0.2 - 0.1) * currentPrice;
      const price = currentPrice + variation;
      
      data.push({
        date: date.toLocaleDateString(),
        price: Math.round(price * 100) / 100,
      });
    }
    
    return data;
  };

  const priceHistory = generatePriceHistory();
  const lowestPrice = Math.min(...priceHistory.map(d => d.price));
  const highestPrice = Math.max(...priceHistory.map(d => d.price));

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>Price History - {product.name}</DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          <div className="grid grid-cols-3 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-2">
                <DollarSign className="h-5 w-5 text-gray-500" />
                <div>
                  <div className="text-sm text-gray-500">Current Price</div>
                  <div className="text-lg font-semibold">€{product.currentPrice}</div>
                </div>
              </div>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-gray-500" />
                <div>
                  <div className="text-sm text-gray-500">Lowest Price</div>
                  <div className="text-lg font-semibold">€{lowestPrice}</div>
                </div>
              </div>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-gray-500" />
                <div>
                  <div className="text-sm text-gray-500">Highest Price</div>
                  <div className="text-lg font-semibold">€{highestPrice}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={priceHistory}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="price"
                  stroke="#8884d8"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-4">
            <h4 className="font-medium">Recent Price Changes</h4>
            <div className="space-y-2">
              {priceHistory.slice(-5).map((data, index) => {
                const previousPrice = priceHistory[priceHistory.length - 6 + index]?.price || data.price;
                const change = data.price - previousPrice;
                const changePercentage = ((change / previousPrice) * 100).toFixed(1);

                return (
                  <div
                    key={data.date}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center space-x-2">
                      <X className="h-4 w-4 text-gray-500" />
                      <span className="text-sm">{data.date}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium">€{data.price}</span>
                      <Badge
                        variant={change > 0 ? 'destructive' : 'default'}
                        className="text-xs"
                      >
                        {change > 0 ? '+' : ''}{changePercentage}%
                      </Badge>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}; 