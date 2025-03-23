export type Competitor = {
  id: number;
  name: string;
  productsTracked: number;
  averagePriceDiff: string;
  lastUpdate: string;
  status: 'active' | 'inactive';
  priceStats: {
    lower: number;
    same: number;
    higher: number;
  };
  responseTime: string;
  commonCategories: string[];
};

export const competitors: Competitor[] = [
  { 
    id: 1, 
    name: 'Amazon', 
    productsTracked: 85, 
    averagePriceDiff: '-2.4%',
    lastUpdate: '15 min ago',
    status: 'active',
    priceStats: { lower: 38, same: 12, higher: 35 },
    responseTime: '0.8s',
    commonCategories: ['Electronics', 'Home', 'Audio']
  },
  { 
    id: 2, 
    name: 'eBay', 
    productsTracked: 72, 
    averagePriceDiff: '-3.8%',
    lastUpdate: '32 min ago',
    status: 'active',
    priceStats: { lower: 45, same: 8, higher: 19 },
    responseTime: '1.2s',
    commonCategories: ['Electronics', 'Collectibles', 'Fashion']
  },
  { 
    id: 3, 
    name: 'Google Shopping', 
    productsTracked: 85, 
    averagePriceDiff: '+1.2%',
    lastUpdate: '10 min ago',
    status: 'active',
    priceStats: { lower: 22, same: 15, higher: 48 },
    responseTime: '0.5s',
    commonCategories: ['Electronics', 'Home', 'Office']
  }
]; 