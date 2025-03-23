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
import { ArrowDown, ArrowUp, AlertTriangle, Bell } from 'lucide-react';
import { useDashboard } from '@/contexts/dashboard-context';

export const RecentAlerts: React.FC = () => {
  const { alerts } = useDashboard();
  const topAlerts = alerts.slice(0, 4);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Recent Alerts</CardTitle>
          <Button variant="link" size="sm" onClick={() => {}}>View all</Button>
        </div>
        <CardDescription>
          Important updates from your tracked products
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {topAlerts.map((alert) => (
            <div key={alert.id} className="flex items-start p-3 bg-white border border-gray-100 rounded-lg shadow-sm">
              <div className={`rounded-full p-2 mr-3 ${
                alert.type === 'price_drop' ? 'bg-green-100 text-green-600' : 
                alert.type === 'price_increase' ? 'bg-red-100 text-red-600' : 
                alert.type === 'out_of_stock' ? 'bg-gray-100 text-gray-600' : 
                alert.type === 'stock_change' ? 'bg-orange-100 text-orange-600' :
                'bg-blue-100 text-blue-600'
              }`}>
                {alert.type === 'price_drop' ? <ArrowDown className="h-4 w-4" /> : 
                 alert.type === 'price_increase' ? <ArrowUp className="h-4 w-4" /> : 
                 alert.type === 'out_of_stock' || alert.type === 'stock_change' ? <AlertTriangle className="h-4 w-4" /> : 
                 <Bell className="h-4 w-4" />}
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-medium">{alert.product}</h4>
                <div className="flex justify-between mt-1">
                  <span className="text-xs text-gray-500">
                    {alert.type === 'price_drop' ? 'Price decreased at ' : 
                     alert.type === 'price_increase' ? 'Price increased at ' : 
                     alert.type === 'out_of_stock' ? 'Out of stock at ' : 
                     alert.type === 'stock_change' ? 'Stock changed at ' :
                     'New promotion at '}
                    {alert.competitor}
                  </span>
                  <span className="text-xs">
                    {alert.type === 'price_drop' ? 
                      <span className="text-green-600 font-medium">{alert.change}</span> : 
                     alert.type === 'price_increase' ? 
                      <span className="text-red-600 font-medium">{alert.change}</span> : 
                      <span className="text-gray-600">{alert.change}</span>}
                  </span>
                </div>
                <div className="text-xs text-gray-400 mt-1">{alert.time}</div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}; 