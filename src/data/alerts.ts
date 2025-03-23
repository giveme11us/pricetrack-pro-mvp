export type AlertType = 'price_drop' | 'price_increase' | 'out_of_stock' | 'stock_change' | 'new_promotion';

export type Alert = {
  id: number;
  product: string;
  type: AlertType;
  competitor: string;
  change: string;
  time: string;
};

export const topAlerts: Alert[] = [
  { id: 1, product: 'iPhone 13 Pro 128GB', type: 'price_drop', competitor: 'Amazon', change: '-15%', time: '2h ago' },
  { id: 2, product: 'Samsung 55" QLED TV', type: 'out_of_stock', competitor: 'eBay', change: 'N/A', time: '3h ago' },
  { id: 3, product: 'Sony WH-1000XM4', type: 'price_increase', competitor: 'Google Shopping', change: '+8%', time: '5h ago' },
  { id: 4, product: 'MacBook Air M2', type: 'new_promotion', competitor: 'Amazon', change: 'Bundle', time: '12h ago' },
];

export const allAlerts: Alert[] = [
  ...topAlerts,
  { id: 5, product: 'LG 34" Ultrawide Monitor', type: 'price_drop', competitor: 'Amazon', change: '-8%', time: '14h ago' },
  { id: 6, product: 'Bose QuietComfort 45', type: 'price_drop', competitor: 'eBay', change: '-10%', time: '18h ago' },
  { id: 7, product: 'Dell XPS 15', type: 'stock_change', competitor: 'Google Shopping', change: 'Low Stock', time: '1d ago' },
  { id: 8, product: 'LG 34" Ultrawide Monitor', type: 'price_increase', competitor: 'eBay', change: '+5%', time: '1d ago' },
  { id: 9, product: 'iPhone 13 Pro 128GB', type: 'price_increase', competitor: 'Google Shopping', change: '+3%', time: '2d ago' },
  { id: 10, product: 'Bose QuietComfort 45', type: 'new_promotion', competitor: 'Amazon', change: 'Free Shipping', time: '2d ago' },
  { id: 11, product: 'MacBook Air M2', type: 'price_drop', competitor: 'eBay', change: '-5%', time: '3d ago' },
  { id: 12, product: 'Samsung 55" QLED TV', type: 'price_drop', competitor: 'Amazon', change: '-12%', time: '4d ago' },
]; 