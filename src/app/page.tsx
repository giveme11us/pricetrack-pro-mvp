"use client";

import { DashboardLayout } from '@/components/layouts/dashboard-layout';
import { StatsCards } from '@/components/dashboard/stats-cards';
import { PriceChart } from '@/components/dashboard/price-chart';
import { RecentAlerts } from '@/components/dashboard/recent-alerts';
import { TrackedProducts } from '@/components/dashboard/tracked-products';
import { DashboardProvider } from '@/contexts/dashboard-context';

export default function Home() {
  return (
    <DashboardProvider>
      <DashboardLayout>
        <div className="space-y-6">
          <StatsCards />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <PriceChart />
            <RecentAlerts />
          </div>
          <TrackedProducts />
        </div>
      </DashboardLayout>
    </DashboardProvider>
  );
}
