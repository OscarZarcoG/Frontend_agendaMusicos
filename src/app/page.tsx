'use client';

import React from 'react';
import { useSystemStatus } from '@/hooks/useSystemStatus';
import { useDashboardStats } from '@/hooks/useDashboardStats';
import { ResponsiveDashboard } from '@/components/ui/ResponsiveDashboard';

export default function Home() {
  const { systemStatus, loading: systemLoading, refreshStatus } = useSystemStatus();
  const { stats, loading: statsLoading, error: statsError } = useDashboardStats();

  return (
    <ResponsiveDashboard
      stats={stats}
      systemStatus={systemStatus}
      statsLoading={statsLoading}
      systemLoading={systemLoading}
      statsError={statsError}
      refreshStatus={refreshStatus}
    />
  );
}
