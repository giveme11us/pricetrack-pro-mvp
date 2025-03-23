export type PricePoint = {
  date: string;
  myPrice: number;
  amazon: number;
  ebay: number;
  googleShopping: number;
};

export const priceHistoryData: PricePoint[] = [
  { date: '1 Mar', myPrice: 89.99, amazon: 94.99, ebay: 92.50, googleShopping: 99.99 },
  { date: '2 Mar', myPrice: 89.99, amazon: 94.99, ebay: 92.50, googleShopping: 95.99 },
  { date: '3 Mar', myPrice: 89.99, amazon: 89.99, ebay: 92.50, googleShopping: 95.99 },
  { date: '4 Mar', myPrice: 85.99, amazon: 89.99, ebay: 92.50, googleShopping: 95.99 },
  { date: '5 Mar', myPrice: 85.99, amazon: 89.99, ebay: 89.99, googleShopping: 95.99 },
  { date: '6 Mar', myPrice: 85.99, amazon: 94.99, ebay: 89.99, googleShopping: 95.99 },
  { date: '7 Mar', myPrice: 89.99, amazon: 94.99, ebay: 89.99, googleShopping: 95.99 },
  { date: '8 Mar', myPrice: 89.99, amazon: 89.99, ebay: 89.99, googleShopping: 95.99 },
  { date: '9 Mar', myPrice: 89.99, amazon: 89.99, ebay: 92.50, googleShopping: 95.99 },
  { date: '10 Mar', myPrice: 89.99, amazon: 94.99, ebay: 92.50, googleShopping: 95.99 },
]; 