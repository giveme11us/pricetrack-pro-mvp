import { LucideIcon, ShoppingCart, AlertTriangle, Zap, Activity } from 'lucide-react';

export type Stat = {
  id: number;
  title: string;
  value: string;
  change: string;
  icon: LucideIcon;
};

export const stats = [
  { id: 1, title: 'Total Products', value: '85', change: '+12%', icon: ShoppingCart },
  { id: 2, title: 'Active Alerts', value: '24', change: '+5', icon: AlertTriangle },
  { id: 3, title: 'Turbo Mode', value: '12', change: '4 available', icon: Zap },
  { id: 4, title: 'Potential Savings', value: '€1,245', change: 'Last 30 days', icon: Activity },
]; 