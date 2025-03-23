"use client";

import React from 'react';
import Image from 'next/image';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Product } from '@/contexts/dashboard-context';
import { Clock, DollarSign, TrendingUp, AlertTriangle } from 'lucide-react';

interface ProductDetailsProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product: Product;
}

export const ProductDetails: React.FC<ProductDetailsProps> = ({
  open,
  onOpenChange,
  product,
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Product Details</DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          <div className="flex items-start space-x-4">
            <div className="relative w-32 h-32">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="rounded-lg object-cover"
              />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-semibold">{product.name}</h3>
              <div className="flex items-center space-x-2">
                <Badge variant="secondary">{product.category}</Badge>
                <Badge
                  variant={product.isActive ? 'default' : 'secondary'}
                >
                  {product.isActive ? 'Active' : 'Inactive'}
                </Badge>
              </div>
              <div className="text-sm text-gray-500">{product.competitor}</div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
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
                  <div className="text-sm text-gray-500">Price Change</div>
                  <div className={`text-lg font-semibold ${
                    product.priceChange > 0 ? 'text-green-600' :
                    product.priceChange < 0 ? 'text-red-600' :
                    'text-gray-900'
                  }`}>
                    {product.priceChange > 0 ? '+' : ''}€{product.priceChange}
                    <span className="text-sm text-gray-500 ml-1">
                      ({product.priceChangePercentage}%)
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-medium">Price Range</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="text-sm text-gray-500">Lowest Price</div>
                <div className="text-lg font-semibold">€{product.lowestPrice}</div>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="text-sm text-gray-500">Highest Price</div>
                <div className="text-lg font-semibold">€{product.highestPrice}</div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-medium">Recent Alerts</h4>
            {product.alerts.length > 0 ? (
              <div className="space-y-2">
                {product.alerts.map((alert) => (
                  <div
                    key={alert.id}
                    className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg"
                  >
                    <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5" />
                    <div>
                      <div className="text-sm font-medium">{alert.message}</div>
                      <div className="flex items-center text-xs text-gray-500 mt-1">
                        <Clock className="h-3 w-3 mr-1" />
                        {alert.time}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-sm text-gray-500">No recent alerts</div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}; 