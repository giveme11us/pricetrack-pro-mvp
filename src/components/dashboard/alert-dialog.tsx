"use client";

import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Product, Alert } from '@/contexts/dashboard-context';
import { Bell, Trash2 } from 'lucide-react';

interface AlertDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product: Product;
  onAddAlert: (productId: string, alert: Omit<Alert, 'id'>) => void;
  onDeleteAlert: (productId: string, alertId: string) => void;
}

export const AlertDialog: React.FC<AlertDialogProps> = ({
  open,
  onOpenChange,
  product,
  onAddAlert,
  onDeleteAlert,
}) => {
  const [priceThreshold, setPriceThreshold] = useState('');
  const [message, setMessage] = useState('');

  const handleAddAlert = () => {
    if (!priceThreshold || !message) return;

    onAddAlert(product.id, {
      type: 'price',
      message,
      threshold: parseFloat(priceThreshold),
      time: new Date().toLocaleString(),
    });

    setPriceThreshold('');
    setMessage('');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Manage Alerts</DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          <div className="space-y-4">
            <h4 className="font-medium">Current Alerts</h4>
            {product.alerts.length > 0 ? (
              <div className="space-y-2">
                {product.alerts.map((alert) => (
                  <div
                    key={alert.id}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div>
                      <div className="text-sm font-medium">{alert.message}</div>
                      <div className="text-xs text-gray-500">
                        Threshold: €{alert.threshold}
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onDeleteAlert(product.id, alert.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-sm text-gray-500">No alerts set</div>
            )}
          </div>

          <div className="space-y-4">
            <h4 className="font-medium">Add New Alert</h4>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="threshold">Price Threshold</Label>
                <Input
                  id="threshold"
                  type="number"
                  value={priceThreshold}
                  onChange={(e) => setPriceThreshold(e.target.value)}
                  placeholder="Enter price threshold"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Alert Message</Label>
                <Input
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Enter alert message"
                />
              </div>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleAddAlert}>
            <Bell className="h-4 w-4 mr-2" />
            Add Alert
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}; 