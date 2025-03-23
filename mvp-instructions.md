# Documentazione Tecnica per MVP PriceTrack Pro

## Panoramica del Progetto

Questa documentazione dettagliata descrive l'implementazione di un MVP (Minimum Viable Product) funzionale per PriceTrack Pro, una piattaforma SaaS di web scraping e monitoraggio prezzi. L'MVP sarà una dashboard web interattiva che simula le funzionalità principali del prodotto finale, utilizzando dati statici per dimostrare il concetto.

Utilizzeremo Next.js 14, React, Tailwind CSS e Shadcn/UI come stack tecnologico, e il deployment sarà effettuato su GitHub Pages per permettere la condivisione con il team e potenziali stakeholder.

## Architettura del Progetto

L'MVP avrà la seguente architettura:

```
PriceTrack Pro MVP
├── Frontend (Next.js + React)
│   ├── Componenti UI (Shadcn/UI + Tailwind)
│   ├── Gestione Stato (React Context/useState)
│   ├── Mock API (JSON statici)
│   └── Router (Next.js)
└── Deployment (GitHub Pages)
```

Non implementeremo un backend reale per l'MVP, ma utilizzeremo dati mock per simulare le API. L'enfasi sarà sulla UI funzionale e sull'esperienza utente.

## Tecnologie e Dipendenze

- **Framework**: Next.js 14
- **UI Library**: React 18
- **Styling**: Tailwind CSS
- **Componenti**: Shadcn/UI
- **Icone**: Lucide React
- **Grafici**: Recharts
- **Deployment**: GitHub Pages
- **Build Tool**: Vite (opzionale, se si preferisce invece di Next.js standard build)

### Package.json

```json
{
  "name": "pricetrack-pro-mvp",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "export": "next build && next export",
    "deploy": "touch out/.nojekyll && gh-pages -d out --dotfiles"
  },
  "dependencies": {
    "@radix-ui/react-avatar": "^1.0.3",
    "@radix-ui/react-dialog": "^1.0.4",
    "@radix-ui/react-dropdown-menu": "^2.0.5",
    "@radix-ui/react-label": "^2.0.2",
    "@radix-ui/react-scroll-area": "^1.0.4",
    "@radix-ui/react-select": "^1.2.2",
    "@radix-ui/react-separator": "^1.0.3",
    "@radix-ui/react-slot": "^1.0.2",
    "@radix-ui/react-tabs": "^1.0.4",
    "@radix-ui/react-toast": "^1.1.4",
    "class-variance-authority": "^0.6.1",
    "clsx": "^1.2.1",
    "date-fns": "^2.30.0",
    "lucide-react": "^0.258.0",
    "next": "14.0.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "recharts": "^2.7.2",
    "tailwind-merge": "^1.14.0",
    "tailwindcss-animate": "^1.0.6"
  },
  "devDependencies": {
    "@types/node": "^20.4.5",
    "@types/react": "^18.2.17",
    "@types/react-dom": "^18.2.7",
    "autoprefixer": "^10.4.14",
    "eslint": "^8.46.0",
    "eslint-config-next": "13.4.12",
    "gh-pages": "^5.0.0",
    "postcss": "^8.4.27",
    "tailwindcss": "^3.3.3",
    "typescript": "^5.1.6"
  }
}
```

## Setup del Progetto

Segui questi passaggi per configurare il progetto:

1. Inizializza un nuovo progetto Next.js:

```bash
npx create-next-app@latest pricetrack-pro-mvp
cd pricetrack-pro-mvp
```

2. Quando richiesto, seleziona le seguenti opzioni:
   - TypeScript: Sì
   - ESLint: Sì
   - Tailwind CSS: Sì
   - `src/` directory: Sì
   - App Router: Sì
   - Import alias: Sì (default `@/*`)

3. Installa i pacchetti necessari:

```bash
npm install lucide-react recharts
npm install @radix-ui/react-avatar @radix-ui/react-dialog @radix-ui/react-dropdown-menu @radix-ui/react-label @radix-ui/react-scroll-area @radix-ui/react-select @radix-ui/react-separator @radix-ui/react-slot @radix-ui/react-tabs @radix-ui/react-toast
npm install class-variance-authority clsx tailwind-merge tailwindcss-animate date-fns
npm install --save-dev gh-pages
```

4. Installa Shadcn UI CLI per facilitare l'aggiunta dei componenti:

```bash
npx shadcn-ui@latest init
```

5. Quando richiesto durante l'inizializzazione di Shadcn UI, rispondi come segue:
   - Stile: Default
   - Base color: Slate
   - Global CSS location: app/globals.css
   - CSS variables: Sì
   - React Server Components: Sì
   - Components location: components
   - Utility functions location: lib/utils
   - Include configuration preset: Sì

6. Aggiungi i componenti Shadcn/UI necessari:

```bash
npx shadcn-ui@latest add button card tabs badge toast dialog avatar dropdown-menu select separator scroll-area
```

## Struttura delle Directory

Organizza il progetto secondo questa struttura:

```
pricetrack-pro-mvp/
├── .github/
│   └── workflows/                 # GitHub Actions per CI/CD
│       └── deploy.yml
├── app/
│   ├── favicon.ico
│   ├── globals.css                # Stili globali
│   ├── layout.tsx                 # Layout principale
│   └── page.tsx                   # Pagina principale (Dashboard)
├── components/
│   ├── ui/                        # Componenti Shadcn/UI
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   └── ...
│   ├── dashboard/                 # Componenti specifici della dashboard
│   │   ├── sidebar.tsx            # Sidebar navigation
│   │   ├── header.tsx             # Header con search e user menu
│   │   ├── stats-cards.tsx        # Cards statistiche
│   │   ├── price-chart.tsx        # Grafico prezzi
│   │   ├── product-table.tsx      # Tabella prodotti
│   │   ├── alerts-list.tsx        # Lista alerts
│   │   └── competitors-view.tsx   # Vista competitors
│   ├── icons/                     # Eventuali icone customizzate
│   └── layouts/                   # Layout components
│       └── dashboard-layout.tsx   # Layout per la dashboard
├── contexts/                      # React contexts
│   └── dashboard-context.tsx      # Context per lo stato della dashboard
├── data/                          # Dati mock
│   ├── products.ts
│   ├── alerts.ts
│   ├── competitors.ts
│   └── price-history.ts
├── hooks/                         # Custom hooks
│   └── use-mock-api.ts            # Hook per simulare chiamate API
├── lib/                           # Utility functions
│   └── utils.ts                   # Funzioni di utilità
├── public/                        # Asset statici
│   └── images/
│       ├── logo.svg
│       └── ...
├── styles/                        # Stili aggiuntivi
├── types/                         # TypeScript type definitions
│   ├── product.ts
│   ├── alert.ts
│   └── ...
├── .eslintrc.json
├── .gitignore
├── next.config.js
├── package.json
├── postcss.config.js
├── README.md
├── tailwind.config.js
└── tsconfig.json
```

## Configurazione per GitHub Pages

1. Crea un file `next.config.js` ottimizzato per GitHub Pages:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',  // Necessario per GitHub Pages
  images: {
    unoptimized: true,  // Necessario per l'export statico
  },
  basePath: process.env.NODE_ENV === 'production' ? '/pricetrack-pro-mvp' : '',  // Sostituisci con il nome del tuo repository
  assetPrefix: process.env.NODE_ENV === 'production' ? '/pricetrack-pro-mvp/' : '',  // Sostituisci con il nome del tuo repository
}

module.exports = nextConfig
```

2. Crea un workflow GitHub Actions per il deployment automatico. Crea il file `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Deploy
        uses: JamesIves/github-pages-deploy-action@v4
        with:
          folder: out
          branch: gh-pages
```

## Implementazione dei Dati Mock

Crea file separati per i dati mock nella directory `data/`:

### `data/products.ts`

```typescript
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
```

### `data/alerts.ts`

```typescript
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
```

### `data/price-history.ts`

```typescript
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
```

### `data/competitors.ts`

```typescript
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
```

### `data/stats.ts`

```typescript
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
```

## Implementazione dei Componenti Principali

### Context per la Dashboard

Crea un context per gestire lo stato della dashboard:

`contexts/dashboard-context.tsx`:

```typescript
import React, { createContext, useContext, useState } from 'react';
import { allProducts } from '@/data/products';
import { allAlerts } from '@/data/alerts';
import { competitors } from '@/data/competitors';
import { priceHistoryData } from '@/data/price-history';
import { stats } from '@/data/stats';

type DashboardContextType = {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  products: typeof allProducts;
  alerts: typeof allAlerts;
  competitors: typeof competitors;
  priceHistory: typeof priceHistoryData;
  stats: typeof stats;
};

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export const DashboardProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState('overview');

  const value = {
    activeTab,
    setActiveTab,
    products: allProducts,
    alerts: allAlerts,
    competitors,
    priceHistory: priceHistoryData,
    stats,
  };

  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (context === undefined) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
};
```

### Layout della Dashboard

`components/layouts/dashboard-layout.tsx`:

```typescript
import React from 'react';
import { Sidebar } from '@/components/dashboard/sidebar';
import { Header } from '@/components/dashboard/header';
import { DashboardProvider } from '@/contexts/dashboard-context';

export const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <DashboardProvider>
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Header />
          <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
            {children}
          </main>
        </div>
      </div>
    </DashboardProvider>
  );
};
```

### Sidebar Navigation

`components/dashboard/sidebar.tsx`:

```typescript
import React from 'react';
import { Bell, Settings, Home, Search, PieChart, Users, ShoppingCart, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useDashboard } from '@/contexts/dashboard-context';

export const Sidebar: React.FC = () => {
  const { activeTab, setActiveTab } = useDashboard();

  const navItems = [
    { name: 'Dashboard', icon: Home, value: 'overview' },
    { name: 'Products', icon: ShoppingCart, value: 'products' },
    { name: 'Competitors', icon: Users, value: 'competitors' },
    { name: 'Analytics', icon: PieChart, value: 'analytics' },
  ];

  const advancedItems = [
    { name: 'Turbo Mode', icon: Zap, value: 'turbo' },
    { name: 'Settings', icon: Settings, value: 'settings' },
  ];

  return (
    <div className="w-64 bg-white border-r border-gray-200 hidden md:block">
      <div className="p-6">
        <div className="flex items-center space-x-2">
          <Zap className="h-6 w-6 text-blue-600" />
          <span className="text-xl font-bold">PriceTrack Pro</span>
        </div>
      </div>
      <nav className="mt-6">
        <div className="px-4 py-2">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Main</p>
        </div>
        {navItems.map((item) => (
          <a
            key={item.value}
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setActiveTab(item.value);
            }}
            className={cn(
              "flex items-center px-6 py-3 text-gray-500 hover:bg-gray-50",
              activeTab === item.value && "text-gray-900 bg-blue-50 border-r-4 border-blue-600"
            )}
          >
            <item.icon className={cn("h-5 w-5 mr-3", activeTab === item.value ? "text-blue-600" : "text-gray-400")} />
            <span className={activeTab === item.value ? "font-medium" : ""}>{item.name}</span>
          </a>
        ))}
        
        <div className="px-4 py-2 mt-8">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Advanced</p>
        </div>
        {advancedItems.map((item) => (
          <a
            key={item.value}
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setActiveTab(item.value);
            }}
            className={cn(
              "flex items-center px-6 py-3 text-gray-500 hover:bg-gray-50",
              activeTab === item.value && "text-gray-900 bg-blue-50 border-r-4 border-blue-600"
            )}
          >
            <item.icon className={cn("h-5 w-5 mr-3", activeTab === item.value ? "text-blue-600" : "text-gray-400")} />
            <span className={activeTab === item.value ? "font-medium" : ""}>{item.name}</span>
          </a>
        ))}
      </nav>
    </div>
  );
};
```

### Header

`components/dashboard/header.tsx`:

```typescript
import React from 'react';
import { Bell, Search, ChevronDown } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="bg-white border-b border-gray-200 py-4 px-6 flex items-center justify-between">
      <div className="flex items-center md:w-72">
        <div className="relative md:w-full">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            className="pl-8 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        <button className="relative text-gray-400 hover:text-gray-500">
          <Bell className="h-6 w-6" />
          <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
        </button>
        <div className="flex items-center">
          <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-medium">
            JS
          </div>
          <span className="ml-2 hidden md:block">Ivan Sposato</span>
          <ChevronDown className="ml-1 h-4 w-4 text-gray-400" />
        </div>
      </div>
    </header>
  );
};
```

### Implementazione delle Tab Content

#### Stats Cards

`components/dashboard/stats-cards.tsx`:

```typescript
import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useDashboard } from '@/contexts/dashboard-context';

export const StatsCards: React.FC = () => {
  const { stats } = useDashboard();

  return (
    <div className="flex flex-row space-x-4 mb-6 overflow-x-auto">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.id} className="flex-1 min-w-[180px]">
            <CardHeader className="flex flex-row items-center justify-between py-2 px-4">
              <CardTitle className="text-xs font-medium text-gray-500">
                {stat.title}
              </CardTitle>
              <Icon className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent className="py-2 px-4">
              <div className="text-xl font-bold">{stat.value}</div>
              <p className="text-xs text-gray-500">{stat.change}</p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};
```

#### Price Chart

`components/dashboard/price-chart.tsx`:

```typescript
import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Filter } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useDashboard } from '@/contexts/dashboard-context';

export const PriceChart: React.FC = () => {
  const { priceHistory } = useDashboard();

  return (
    <Card className="mb-6">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Price Comparison</CardTitle>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <select className="border border-gray-300 rounded-md px-2 py-1 text-sm">
              <option>Last 10 days</option>
              <option>Last 30 days</option>
              <option>Last 90 days</option>
            </select>
          </div>
        </div>
        <CardDescription>
          Compare your prices with top competitors
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={priceHistory}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis domain={['dataMin - 5', 'dataMax + 5']} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="myPrice" stroke="#2563EB" strokeWidth={2} name="Your Price" />
              <Line type="monotone" dataKey="amazon" stroke="#EF4444" strokeWidth={1.5} name="Amazon" />
              <Line type="monotone" dataKey="ebay" stroke="#10B981" strokeWidth={1.5} name="eBay" />
              <Line type="monotone" dataKey="googleShopping" stroke="#F59E0B" strokeWidth={1.5} name="Google Shopping" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
```

#### Recent Alerts

`components/dashboard/recent-alerts.tsx`:

```typescript
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
```

#### Tracked Products

`components/dashboard/tracked-products.tsx`:

```typescript
import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChevronDown, ShoppingCart } from 'lucide-react';
import { useDashboard } from '@/contexts/dashboard-context';

export const TrackedProducts: React.FC = () => {
  const { products } = useDashboard();
  const trackedProducts = products.slice(0, 5);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Tracked Products</CardTitle>
          <Button variant="link" size="sm" onClick={() => {}}>View all</Button>
        </div>
        <CardDescription>
          Your most important products
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {trackedProducts.map((product) => (
            <div key={product.id} className="flex justify-between items-center p-3 bg-white border border-gray-100 rounded-lg shadow-sm hover:bg-gray-50">
              <div className="flex-1">
                <div className="flex items-center">
                  <h4 className="text-sm font-medium">{product.name}</h4>
                  {product.alerts > 0 && (
                    <Badge variant="destructive" className="ml-2 text-xs">
                      {product.alerts} {product.alerts === 1 ? 'alert' : 'alerts'}
                    </Badge>
                  )}
                </div>
                <div className="flex space-x-4 mt-1">
                  <span className="text-xs text-gray-500">Your price: <span className="font-medium">€{product.myPrice}</span></span>
                  <span className="text-xs text-gray-500">Lowest: <span className={`font-medium ${product.myPrice > product.lowestPrice ? 'text-red-600' : 'text-green-600'}`}>€{product.lowestPrice}</span></span>
                  <span className="text-xs text-gray-500">{product.competitors} competitors</span>
                </div>
              </div>
              <Button variant="ghost" size="sm">
                <ChevronDown className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="border-t border-gray-100 px-6 py-3">
        <Button variant="outline" className="w-full">
          <ShoppingCart className="h-4 w-4 mr-2" />
          Add New Product
        </Button>
      </CardFooter>
    </Card>
  );
};
```

### Implementazione delle Tab Pages

#### Product Table

`components/dashboard/product-table.tsx`:

```typescript
import React from 'react';
import {
  Card,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, ShoppingCart, ChevronDown } from 'lucide-react';
import { useDashboard } from '@/contexts/dashboard-context';

export const ProductTable: React.FC = () => {
  const { products } = useDashboard();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">All Products</h2>
        <div className="flex space-x-2">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              className="pl-8 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button>
            <ShoppingCart className="h-4 w-4 mr-2" />
            Add Product
          </Button>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4 font-medium text-gray-500">Product</th>
                <th className="text-left py-3 px-4 font-medium text-gray-500">Category</th>
                <th className="text-right py-3 px-4 font-medium text-gray-500">Your Price</th>
                <th className="text-right py-3 px-4 font-medium text-gray-500">Lowest Price</th>
                <th className="text-center py-3 px-4 font-medium text-gray-500">Alerts</th>
                <th className="text-center py-3 px-4 font-medium text-gray-500">Monitoring</th>
                <th className="text-center py-3 px-4 font-medium text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center mr-3">
                        <ShoppingCart className="h-4 w-4 text-gray-500" />
                      </div>
                      <span className="font-medium">{product.name}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-gray-500">{product.category}</td>
                  <td className="py-3 px-4 text-right font-medium">€{product.myPrice}</td>
                  <td className="py-3 px-4 text-right">
                    <span className={`font-medium ${product.myPrice > product.lowestPrice ? 'text-red-600' : 'text-green-600'}`}>
                      €{product.lowestPrice}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    {product.alerts > 0 ? (
                      <Badge className="bg-red-100 text-red-800 hover:bg-red-200">{product.alerts}</Badge>
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">All Competitors</Badge>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
        <CardFooter className="flex items-center justify-between border-t px-6 py-3">
          <div className="text-sm text-gray-500">Showing <strong>12</strong> of <strong>85</strong> products</div>
          <div className="flex space-x-1">
            <Button variant="outline" size="sm" disabled>Previous</Button>
            <Button variant="outline" size="sm" className="bg-blue-50">1</Button>
            <Button variant="outline" size="sm">2</Button>
            <Button variant="outline" size="sm">3</Button>
            <Button variant="outline" size="sm">Next</Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};
```

#### Alerts List

`components/dashboard/alerts-list.tsx`:

```typescript
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
```

#### Competitors View

`components/dashboard/competitors-view.tsx`:

```typescript
import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users } from 'lucide-react';
import { useDashboard } from '@/contexts/dashboard-context';

export const CompetitorsView: React.FC = () => {
  const { competitors } = useDashboard();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Competitors</h2>
        <Button>
          <Users className="h-4 w-4 mr-2" />
          Add Competitor
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {competitors.map((competitor) => (
          <Card key={competitor.id}>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>{competitor.name}</CardTitle>
                  <CardDescription>Last updated {competitor.lastUpdate}</CardDescription>
                </div>
                <Badge className={competitor.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                  {competitor.status === 'active' ? 'Active' : 'Inactive'}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-500 mb-1">Products Tracked</div>
                  <div className="text-2xl font-bold">{competitor.productsTracked}</div>
                </div>
                
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-500 mb-1">Average Price Difference</div>
                  <div className={`text-2xl font-bold ${competitor.averagePriceDiff.startsWith('-') ? 'text-green-600' : 'text-red-600'}`}>
                    {competitor.averagePriceDiff}
                  </div>
                </div>
                
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-500 mb-1">Price Comparison</div>
                  <div className="flex items-center space-x-2 mt-2">
                    <div className="flex-1 bg-red-100 rounded-full h-2">
                      <div 
                        className="bg-red-500 h-2 rounded-full" 
                        style={{ width: `${competitor.priceStats.higher / (competitor.priceStats.higher + competitor.priceStats.same + competitor.priceStats.lower) * 100}%` }}
                      ></div>
                    </div>
                    <div className="text-sm text-red-600 font-medium">{competitor.priceStats.higher}</div>
                  </div>
                  <div className="flex items-center space-x-2 mt-1">
                    <div className="flex-1 bg-gray-100 rounded-full h-2">
                      <div 
                        className="bg-gray-500 h-2 rounded-full" 
                        style={{ width: `${competitor.priceStats.same / (competitor.priceStats.higher + competitor.priceStats.same + competitor.priceStats.lower) * 100}%` }}
                      ></div>
                    </div>
                    <div className="text-sm text-gray-600 font-medium">{competitor.priceStats.same}</div>
                  </div>
                  <div className="flex items-center space-x-2 mt-1">
                    <div className="flex-1 bg-green-100 rounded-full h-2">
                      <div 
                        className="bg-green-500 h-2 rounded-full" 
                        style={{ width: `${competitor.priceStats.lower / (competitor.priceStats.higher + competitor.priceStats.same + competitor.priceStats.lower) * 100}%` }}
                      ></div>
                    </div>
                    <div className="text-sm text-green-600 font-medium">{competitor.priceStats.lower}</div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>Higher</span>
                    <span>Same</span>
                    <span>Lower</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 flex flex-wrap gap-2">
                {competitor.commonCategories.map((category, index) => (
                  <Badge key={index} variant="outline" className="bg-blue-50">
                    {category}
                  </Badge>
                ))}
              </div>
            </CardContent>
            <CardFooter className="border-t pt-4 flex justify-between">
              <div className="text-sm text-gray-500">Response time: <span className="font-medium">{competitor.responseTime}</span></div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">View Products</Button>
                <Button variant="outline" size="sm">Settings</Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};
```

### Main Dashboard Page

`app/page.tsx`:

```typescript
'use client'

import React from 'react';
import { DashboardLayout } from '@/components/layouts/dashboard-layout';
import { StatsCards } from '@/components/dashboard/stats-cards';
import { PriceChart } from '@/components/dashboard/price-chart';
import { RecentAlerts } from '@/components/dashboard/recent-alerts';
import { TrackedProducts } from '@/components/dashboard/tracked-products';
import { ProductTable } from '@/components/dashboard/product-table';
import { AlertsList } from '@/components/dashboard/alerts-list';
import { CompetitorsView } from '@/components/dashboard/competitors-view';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useDashboard } from '@/contexts/dashboard-context';

export default function Home() {
  const { activeTab, setActiveTab } = useDashboard();

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500">Monitor your products and competitors in real-time</p>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="alerts">Alerts</TabsTrigger>
          <TabsTrigger value="competitors">Competitors</TabsTrigger>
        </TabsList>
      </Tabs>
      
      {activeTab === "overview" && (
        <>
          <StatsCards />
          <PriceChart />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <RecentAlerts />
            <TrackedProducts />
          </div>
        </>
      )}

      {activeTab === "products" && <ProductTable />}
      {activeTab === "alerts" && <AlertsList />}
      {activeTab === "competitors" && <CompetitorsView />}
    </DashboardLayout>
  );
}
```

## Test e Ottimizzazione

### Testing manuale

1. Verifica che la navigazione tra le schede funzioni correttamente
2. Controlla che i grafici vengano renderizzati correttamente
3. Assicurati che la dashboard sia responsive su diverse dimensioni dello schermo
4. Verifica che tutti i componenti si integrino correttamente

### Ottimizzazione delle prestazioni

1. Utilizza `React.memo()` per componenti che non cambiano frequentemente
2. Ottimizza le immagini
3. Implementa il lazy loading per i componenti pesanti
4. Assicurati che il codice sia ben organizzato e segua le best practice React

## Build e Deploy

### Build del progetto

Esegui il comando di build:

```bash
npm run build
```

### Deploy su GitHub Pages

1. Crea un repository GitHub per il progetto
2. Inizializza Git e collega il repository remoto:

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/yourusername/pricetrack-pro-mvp.git
git push -u origin main
```

3. Esegui il deploy su GitHub Pages:

```bash
npm run deploy
```

4. Configura GitHub Pages nelle impostazioni del repository per utilizzare il branch `gh-pages`

## Considerazioni finali e sviluppi futuri

### Funzionalità per la versione successiva

1. **Autenticazione utente**: Implementare login e registrazione
2. **Funzionalità di reprice**: Aggiungere la possibilità di aggiornare i prezzi
3. **Notifiche in tempo reale**: Implementare un sistema di notifiche push
4. **Integrazione con API reali**: Sostituire i dati mock con chiamate API reali
5. **Personalizzazione dashboard**: Permettere agli utenti di personalizzare la dashboard
6. **Analytics avanzate**: Aggiungere visualizzazioni e analisi più avanzate

### Suggerimenti per l'integrazione futura

1. Implementare un backend reale con Node.js o Python/FastAPI
2. Aggiungere un database per la persistenza dei dati
3. Sviluppare un sistema di scraping reale
4. Implementare un sistema di monitoraggio proattivo
5. Aggiungere funzionalità di machine learning per predizioni di prezzo

## Conclusione

Questo MVP fornisce una base solida per dimostrare il concetto di PriceTrack Pro. Anche se utilizza dati simulati, l'interfaccia utente completa permette di visualizzare efficacemente come funzionerebbe il prodotto finale.

La struttura modulare del codice facilita l'aggiunta di funzionalità reali in futuro, rendendo questo MVP un punto di partenza ideale per lo sviluppo completo della piattaforma.
