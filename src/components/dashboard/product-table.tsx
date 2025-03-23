"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Product, Alert } from '@/contexts/dashboard-context';
import { Search, Plus, ChevronLeft, ChevronRight } from 'lucide-react';
import { ProductActions } from './product-actions';
import { ProductDialog } from './product-dialog';
import { ProductView } from './product-view';
import { useDashboard } from '@/contexts/dashboard-context';

export const ProductTable: React.FC = () => {
  const { products, addProduct, updateProduct, deleteProduct, addAlert, deleteAlert } = useDashboard();
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'inactive'>('all');
  const [filterCategory, setFilterCategory] = useState<string>('all');

  // Get unique categories
  const categories = Array.from(new Set(products.map(p => p.category)));

  // Filter products based on search query and filters
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.competitor.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || 
                         (filterStatus === 'active' && product.isActive) ||
                         (filterStatus === 'inactive' && !product.isActive);
    
    const matchesCategory = filterCategory === 'all' || product.category === filterCategory;
    
    return matchesSearch && matchesStatus && matchesCategory;
  });

  // Calculate pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
  };

  const handleDelete = (productId: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      deleteProduct(productId);
    }
  };

  const handleAddAlert = (productId: string, alert: Omit<Alert, 'id'>) => {
    addAlert(productId, alert);
  };

  const handleDeleteAlert = (productId: string, alertId: string) => {
    deleteAlert(productId, alertId);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle>Products</CardTitle>
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8"
            />
          </div>
          <select
            className="border rounded-md px-2 py-1 text-sm"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as 'all' | 'active' | 'inactive')}
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
          <select
            className="border rounded-md px-2 py-1 text-sm"
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            <option value="all">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          <Button onClick={() => setShowAddDialog(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Product
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-gray-50">
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">
                  Product
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">
                  Category
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">
                  Price
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">
                  Alerts
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">
                  Status
                </th>
                <th className="px-4 py-2 text-right text-sm font-medium text-gray-500">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedProducts.map((product) => (
                <tr key={product.id} className="border-b hover:bg-gray-50 cursor-pointer" onClick={() => setSelectedProduct(product)}>
                  <td className="px-4 py-2">
                    <div className="flex items-center space-x-2">
                      <div className="relative h-8 w-8">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="rounded object-cover"
                        />
                      </div>
                      <div>
                        <div className="font-medium">{product.name}</div>
                        <div className="text-sm text-gray-500">
                          {product.competitor}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-2">
                    <Badge variant="secondary">{product.category}</Badge>
                  </td>
                  <td className="px-4 py-2">
                    <div className="font-medium">€{product.currentPrice}</div>
                    <div
                      className={`text-sm ${
                        product.priceChange > 0
                          ? 'text-green-600'
                          : product.priceChange < 0
                          ? 'text-red-600'
                          : 'text-gray-500'
                      }`}
                    >
                      {product.priceChange > 0 ? '+' : ''}€{product.priceChange} (
                      {product.priceChangePercentage}%)
                    </div>
                  </td>
                  <td className="px-4 py-2">
                    {product.alerts.length > 0 ? (
                      <Badge variant="destructive">
                        {product.alerts.length} alerts
                      </Badge>
                    ) : (
                      <span className="text-sm text-gray-500">No alerts</span>
                    )}
                  </td>
                  <td className="px-4 py-2">
                    <Badge
                      variant={product.isActive ? 'default' : 'secondary'}
                    >
                      {product.isActive ? 'Active' : 'Inactive'}
                    </Badge>
                  </td>
                  <td className="px-4 py-2 text-right">
                    <ProductActions
                      product={product}
                      onEdit={handleEdit}
                      onDelete={handleDelete}
                      onAddAlert={handleAddAlert}
                      onDeleteAlert={handleDeleteAlert}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex items-center justify-between w-full">
          <div className="text-sm text-gray-500">
            Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredProducts.length)} of {filteredProducts.length} products
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardFooter>

      <ProductDialog
        open={showAddDialog}
        onOpenChange={setShowAddDialog}
        onSubmit={addProduct}
      />

      {editingProduct && (
        <ProductDialog
          open={!!editingProduct}
          onOpenChange={(open) => !open && setEditingProduct(null)}
          onSubmit={updateProduct}
          product={editingProduct}
        />
      )}

      {selectedProduct && (
        <ProductView
          open={!!selectedProduct}
          onOpenChange={(open) => !open && setSelectedProduct(null)}
          product={selectedProduct}
          onAddAlert={handleAddAlert}
          onDeleteAlert={handleDeleteAlert}
        />
      )}
    </Card>
  );
}; 