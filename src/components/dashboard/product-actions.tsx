"use client";

import React, { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, Eye, Bell, Pencil, Trash2, TrendingUp } from 'lucide-react';
import { Product } from '@/contexts/dashboard-context';
import { ProductDetails } from './product-details';
import { PriceHistory } from './price-history';
import { AlertDialog } from './alert-dialog';

interface ProductActionsProps {
  product: Product;
  onEdit: (product: Product) => void;
  onDelete: (productId: string) => void;
  onAddAlert: (productId: string, alert: Omit<Alert, 'id'>) => void;
  onDeleteAlert: (productId: string, alertId: string) => void;
}

export const ProductActions: React.FC<ProductActionsProps> = ({
  product,
  onEdit,
  onDelete,
  onAddAlert,
  onDeleteAlert,
}) => {
  const [showDetails, setShowDetails] = useState(false);
  const [showPriceHistory, setShowPriceHistory] = useState(false);
  const [showAlerts, setShowAlerts] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setShowDetails(true)}>
            <Eye className="h-4 w-4 mr-2" />
            View Details
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setShowPriceHistory(true)}>
            <TrendingUp className="h-4 w-4 mr-2" />
            Price History
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setShowAlerts(true)}>
            <Bell className="h-4 w-4 mr-2" />
            Manage Alerts
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onEdit(product)}>
            <Pencil className="h-4 w-4 mr-2" />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem
            className="text-red-600"
            onClick={() => onDelete(product.id)}
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <ProductDetails
        open={showDetails}
        onOpenChange={setShowDetails}
        product={product}
      />

      <PriceHistory
        open={showPriceHistory}
        onOpenChange={setShowPriceHistory}
        product={product}
      />

      <AlertDialog
        open={showAlerts}
        onOpenChange={setShowAlerts}
        product={product}
        onAddAlert={onAddAlert}
        onDeleteAlert={onDeleteAlert}
      />
    </>
  );
}; 