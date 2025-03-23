"use client";

import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Product, Alert } from '@/contexts/dashboard-context';
import {
  DollarSign,
  TrendingUp,
  AlertTriangle,
  ShoppingCart,
  Clock,
  X,
  Plus,
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts';

interface ProductViewProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product: Product;
  onAddAlert: (productId: string, alert: Omit<Alert, 'id'>) => void;
  onDeleteAlert: (productId: string, alertId: string) => void;
}

export const ProductView: React.FC<ProductViewProps> = ({
  open,
  onOpenChange,
  product,
  onAddAlert,
  onDeleteAlert,
}) => {
  const [showAddAlert, setShowAddAlert] = useState(false);
  const [newAlertPrice, setNewAlertPrice] = useState('');
  const [newAlertType, setNewAlertType] = useState<'above' | 'below'>('below');

  // Generate mock price history data
  const generatePriceHistory = () => {
    const data = [];
    const currentDate = new Date();
    const currentPrice = product.currentPrice;
    
    for (let i = 30; i >= 0; i--) {
      const date = new Date(currentDate);
      date.setDate(date.getDate() - i);
      
      const variation = (Math.random() * 0.2 - 0.1) * currentPrice;
      const price = currentPrice + variation;
      
      data.push({
        date: date.toLocaleDateString(),
        price: Math.round(price * 100) / 100,
      });
    }
    
    return data;
  };

  // Mock competitor prices
  const competitorPrices = [
    { name: 'Amazon', price: product.currentPrice + 5 },
    { name: 'eBay', price: product.currentPrice - 2 },
    { name: 'Google Shopping', price: product.currentPrice + 1 },
  ];

  const priceHistory = generatePriceHistory();
  const lowestPrice = Math.min(...priceHistory.map(d => d.price));
  const highestPrice = Math.max(...priceHistory.map(d => d.price));

  const handleAddAlert = () => {
    if (!newAlertPrice) return;
    
    onAddAlert(product.id, {
      price: parseFloat(newAlertPrice),
      type: newAlertType,
      isActive: true,
      createdAt: new Date().toISOString(),
    });
    
    setNewAlertPrice('');
    setShowAddAlert(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>Product Details</span>
            <Button variant="ghost" size="icon" onClick={() => onOpenChange(false)}>
              <X className="h-4 w-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Product Information */}
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <img
                src={product.image}
                alt={product.name}
                className="w-32 h-32 rounded-lg object-cover"
              />
              <div className="space-y-2">
                <h3 className="text-xl font-semibold">{product.name}</h3>
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary">{product.category}</Badge>
                  <Badge variant={product.isActive ? 'default' : 'secondary'}>
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
                      product.priceChange > 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {product.priceChange > 0 ? '+' : ''}€{product.priceChange}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Competitor Prices */}
            <div>
              <h4 className="font-medium mb-4">Competitor Prices</h4>
              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={competitorPrices}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="price" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Price History and Alerts */}
          <div className="space-y-6">
            {/* Price History */}
            <div>
              <h4 className="font-medium mb-4">Price History</h4>
              <div className="h-[200px]">
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
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-500">Lowest Price</div>
                  <div className="font-medium">€{lowestPrice}</div>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-500">Highest Price</div>
                  <div className="font-medium">€{highestPrice}</div>
                </div>
              </div>
            </div>

            {/* Alerts */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-medium">Price Alerts</h4>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowAddAlert(true)}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Alert
                </Button>
              </div>
              <div className="space-y-2">
                {product.alerts.map((alert) => (
                  <div
                    key={alert.id}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center space-x-2">
                      <AlertTriangle className="h-4 w-4 text-gray-500" />
                      <div>
                        <div className="text-sm">
                          Alert when price goes {alert.type} €{alert.price}
                        </div>
                        <div className="text-xs text-gray-500">
                          Created {new Date(alert.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onDeleteAlert(product.id, alert.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                {product.alerts.length === 0 && (
                  <div className="text-sm text-gray-500 text-center py-4">
                    No alerts set
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Add Alert Dialog */}
        {showAddAlert && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg w-96">
              <h4 className="font-medium mb-4">Add Price Alert</h4>
              <div className="space-y-4">
                <div>
                  <Label>Alert Type</Label>
                  <select
                    className="w-full border rounded-md px-2 py-1"
                    value={newAlertType}
                    onChange={(e) => setNewAlertType(e.target.value as 'above' | 'below')}
                  >
                    <option value="below">Below Price</option>
                    <option value="above">Above Price</option>
                  </select>
                </div>
                <div>
                  <Label>Price</Label>
                  <Input
                    type="number"
                    value={newAlertPrice}
                    onChange={(e) => setNewAlertPrice(e.target.value)}
                    placeholder="Enter price"
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <Button
                    variant="outline"
                    onClick={() => setShowAddAlert(false)}
                  >
                    Cancel
                  </Button>
                  <Button onClick={handleAddAlert}>Add Alert</Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}; 