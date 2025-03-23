"use client";

import React from 'react';
import {
  Card,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowDown, ArrowUp, AlertTriangle, Bell, Filter } from 'lucide-react';
import { useDashboard } from '@/contexts/dashboard-context';

export const AlertsList: React.FC = () => {
  const { alerts } = useDashboard();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">All Alerts</h2>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <select className="border border-gray-300 rounded-md px-2 py-1 text-sm">
            <option>All time</option>
            <option>Last 24 hours</option>
            <option>Last 7 days</option>
            <option>Last 30 days</option>
          </select>
        </div>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            {alerts.map((alert) => (
              <div key={alert.id} className="flex items-start p-4 bg-white border border-gray-100 rounded-lg shadow-sm hover:bg-gray-50">
                <div className={`rounded-full p-2 mr-4 ${
                  alert.type === 'price_drop' ? 'bg-green-100 text-green-600' : 
                  alert.type === 'price_increase' ? 'bg-red-100 text-red-600' : 
                  alert.type === 'out_of_stock' ? 'bg-gray-100 text-gray-600' :
                  alert.type === 'stock_change' ? 'bg-orange-100 text-orange-600' : 
                  'bg-blue-100 text-blue-600'
                }`}>
                  {alert.type === 'price_drop' ? <ArrowDown className="h-5 w-5" /> : 
                   alert.type === 'price_increase' ? <ArrowUp className="h-5 w-5" /> : 
                   alert.type === 'out_of_stock' ? <AlertTriangle className="h-5 w-5" /> :
                   alert.type === 'stock_change' ? <AlertTriangle className="h-5 w-5" /> :
                   <Bell className="h-5 w-5" />}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <h4 className="text-base font-medium">{alert.product}</h4>
                    <span className="text-sm text-gray-500">{alert.time}</span>
                  </div>
                  <div className="mt-1">
                    <span className="text-sm">
                      {alert.type === 'price_drop' ? 'Price decreased at ' : 
                       alert.type === 'price_increase' ? 'Price increased at ' : 
                       alert.type === 'out_of_stock' ? 'Out of stock at ' :
                       alert.type === 'stock_change' ? 'Stock changed at ' :
                       'New promotion at '}
                      <span className="font-medium">{alert.competitor}</span>
                      {alert.type === 'price_drop' || alert.type === 'price_increase' ? 
                        <span className={`ml-1 ${alert.type === 'price_drop' ? 'text-green-600' : 'text-red-600'} font-medium`}>
                          {alert.change}
                        </span> : 
                        alert.type === 'out_of_stock' || alert.type === 'stock_change' ? 
                        <span className="ml-1 text-orange-600 font-medium">{alert.change}</span> :
                        <span className="ml-1 text-blue-600 font-medium">{alert.change}</span>
                      }
                    </span>
                  </div>
                  <div className="flex mt-3 space-x-2">
                    <Button variant="outline" size="sm">View Details</Button>
                    <Button variant="outline" size="sm">Dismiss</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex items-center justify-between border-t px-6 py-3">
          <div className="text-sm text-gray-500">Showing <strong>12</strong> of <strong>24</strong> alerts</div>
          <div className="flex space-x-1">
            <Button variant="outline" size="sm" disabled>Previous</Button>
            <Button variant="outline" size="sm" className="bg-blue-50">1</Button>
            <Button variant="outline" size="sm">2</Button>
            <Button variant="outline" size="sm">Next</Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}; 