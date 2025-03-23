export type Product = {
  id: number;
  name: string;
  category: string;
  myPrice: number;
  lowestPrice: number;
  competitors: number;
  alerts: number;
};

export const trackedProducts: Product[] = [
  { id: 1, name: 'iPhone 13 Pro 128GB', category: 'Electronics', myPrice: 899.99, lowestPrice: 849.99, competitors: 3, alerts: 2 },
  { id: 2, name: 'Samsung 55" QLED TV', category: 'Electronics', myPrice: 799.99, lowestPrice: 799.99, competitors: 3, alerts: 1 },
  { id: 3, name: 'Sony WH-1000XM4', category: 'Audio', myPrice: 279.99, lowestPrice: 249.99, competitors: 3, alerts: 1 },
  { id: 4, name: 'MacBook Air M2', category: 'Electronics', myPrice: 1199.99, lowestPrice: 1149.99, competitors: 3, alerts: 1 },
  { id: 5, name: 'Dyson V11 Vacuum', category: 'Home', myPrice: 499.99, lowestPrice: 489.99, competitors: 3, alerts: 0 },
];

export const allProducts: Product[] = [
  ...trackedProducts,
  { id: 6, name: 'Nintendo Switch OLED', category: 'Gaming', myPrice: 349.99, lowestPrice: 329.99, competitors: 3, alerts: 0 },
  { id: 7, name: 'LG 34" Ultrawide Monitor', category: 'Electronics', myPrice: 449.99, lowestPrice: 429.99, competitors: 3, alerts: 2 },
  { id: 8, name: 'Bose QuietComfort 45', category: 'Audio', myPrice: 329.99, lowestPrice: 299.99, competitors: 3, alerts: 1 },
  { id: 9, name: 'Samsung Galaxy S22', category: 'Electronics', myPrice: 799.99, lowestPrice: 769.99, competitors: 3, alerts: 0 },
  { id: 10, name: 'iPad Pro 12.9"', category: 'Electronics', myPrice: 1099.99, lowestPrice: 1049.99, competitors: 3, alerts: 0 },
  { id: 11, name: 'Dell XPS 15', category: 'Electronics', myPrice: 1899.99, lowestPrice: 1799.99, competitors: 3, alerts: 1 },
  { id: 12, name: 'Logitech MX Master 3', category: 'Accessories', myPrice: 99.99, lowestPrice: 89.99, competitors: 3, alerts: 0 },
]; 