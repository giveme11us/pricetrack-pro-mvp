"use client";

import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChevronDown, ShoppingCart } from 'lucide-react';
import { useDashboard } from '@/contexts/dashboard-context';

export const TrackedProducts: React.FC = () => {
  const { products } = useDashboard();
  const trackedProducts = products.slice(0, 5);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Tracked Products</CardTitle>
          <Button variant="link" size="sm" onClick={() => {}}>View all</Button>
        </div>
        <CardDescription>
          Your most important products
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {trackedProducts.map((product) => (
            <div key={product.id} className="flex justify-between items-center p-3 bg-white border border-gray-100 rounded-lg shadow-sm hover:bg-gray-50">
              <div className="flex-1">
                <div className="flex items-center">
                  <h4 className="text-sm font-medium">{product.name}</h4>
                  {product.alerts > 0 && (
                    <Badge variant="destructive" className="ml-2 text-xs">
                      {product.alerts} {product.alerts === 1 ? 'alert' : 'alerts'}
                    </Badge>
                  )}
                </div>
                <div className="flex space-x-4 mt-1">
                  <span className="text-xs text-gray-500">Your price: <span className="font-medium">€{product.myPrice}</span></span>
                  <span className="text-xs text-gray-500">Lowest: <span className={`font-medium ${product.myPrice > product.lowestPrice ? 'text-red-600' : 'text-green-600'}`}>€{product.lowestPrice}</span></span>
                  <span className="text-xs text-gray-500">{product.competitors} competitors</span>
                </div>
              </div>
              <Button variant="ghost" size="sm">
                <ChevronDown className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="border-t border-gray-100 px-6 py-3">
        <Button variant="outline" className="w-full">
          <ShoppingCart className="h-4 w-4 mr-2" />
          Add New Product
        </Button>
      </CardFooter>
    </Card>
  );
}; 