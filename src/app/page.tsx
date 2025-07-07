'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { useSystemStatus } from '@/hooks/useSystemStatus';
import { useDashboardStats } from '@/hooks/useDashboardStats';

export default function Home() {
  const { systemStatus, loading: systemLoading, refreshStatus } = useSystemStatus();
  const { stats, loading: statsLoading, error: statsError, refreshStats } = useDashboardStats();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected':
      case 'active':
      case 'online':
        return 'bg-green-500';
      case 'disconnected':
      case 'inactive':
      case 'offline':
        return 'bg-red-500';
      case 'checking':
      default:
        return 'bg-yellow-500';
    }
  };

  const getStatusTextColor = (status: string) => {
    switch (status) {
      case 'connected':
      case 'active':
      case 'online':
        return 'text-green-700 dark:text-green-400';
      case 'disconnected':
      case 'inactive':
      case 'offline':
        return 'text-red-700 dark:text-red-400';
      case 'checking':
      default:
        return 'text-yellow-600 dark:text-yellow-400';
    }
  };

  return (
    <>
      <div className="space-y-6">
          <div className="md:flex md:items-center md:justify-between">
            <div className="flex-1 min-w-0">
              <h2 className="text-2xl font-bold leading-7 text-gray-900 dark:text-gray-100 sm:text-3xl sm:truncate">
                Dashboard
              </h2>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Bienvenido al sistema de gestión para músicos
            </p>
          </div>
          <div className="mt-4 flex space-x-3 md:mt-0 md:ml-4">
            <Link href="/contratos/nuevo">
              <Button>
                Nuevo Contrato
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-900 dark:text-gray-100">
                Contratos Activos
              </CardTitle>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="h-4 w-4 text-gray-600 dark:text-gray-400"
              >
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {statsLoading ? '...' : stats.contratosActivos}
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Contratos confirmados
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-900 dark:text-gray-100">
                Eventos Este Mes
              </CardTitle>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="h-4 w-4 text-gray-600 dark:text-gray-400"
              >
                <rect width="20" height="14" x="2" y="5" rx="2" />
                <path d="M2 10h20" />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {statsLoading ? '...' : stats.eventosEsteMes}
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Eventos programados
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-900 dark:text-gray-100">
                Ingresos del Mes
              </CardTitle>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="h-4 w-4 text-gray-600 dark:text-gray-400"
              >
                <path d="M12 2v20m8-10H4" />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                ${statsLoading ? '...' : stats.ingresosMes.toLocaleString()}
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Total facturado
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-900 dark:text-gray-100">
                Clientes Totales
              </CardTitle>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="h-4 w-4 text-gray-600 dark:text-gray-400"
              >
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {statsLoading ? '...' : stats.clientesTotales}
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Clientes registrados
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="text-gray-900 dark:text-gray-100">Acciones Rápidas</CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-400">
                Accede rápidamente a las funciones más utilizadas
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Link href="/contratos/nuevo" className="block">
                <Button variant="outline" className="w-full justify-start bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 text-gray-900 dark:text-gray-100">
                  <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Crear Nuevo Contrato
                </Button>
              </Link>
              <Link href="/clientes/nuevo" className="block">
                <Button variant="outline" className="w-full justify-start bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 text-gray-900 dark:text-gray-100">
                  <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Agregar Cliente
                </Button>
              </Link>
              <Link href="/repertorio" className="block">
                <Button variant="outline" className="w-full justify-start bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 text-gray-900 dark:text-gray-100">
                  <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                  </svg>
                  Gestionar Repertorio
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center justify-between text-gray-900 dark:text-gray-100">
                Estado del Sistema
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={refreshStatus}
                  disabled={systemLoading}
                  className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 text-gray-900 dark:text-gray-100"
                >
                  {systemLoading ? 'Verificando...' : 'Actualizar'}
                </Button>
              </CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-400">
                Información sobre la conexión con el backend
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-900 dark:text-gray-100">API Backend</span>
                  <div className="flex items-center">
                    <div className={`w-2 h-2 ${getStatusColor(systemStatus.apiBackend.status)} rounded-full mr-2`}></div>
                    <span className={`text-sm ${getStatusTextColor(systemStatus.apiBackend.status)}`}>
                      {systemStatus.apiBackend.message}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-900 dark:text-gray-100">Base de Datos</span>
                  <div className="flex items-center">
                    <div className={`w-2 h-2 ${getStatusColor(systemStatus.database.status)} rounded-full mr-2`}></div>
                    <span className={`text-sm ${getStatusTextColor(systemStatus.database.status)}`}>
                      {systemStatus.database.message}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-900 dark:text-gray-100">Servidor</span>
                  <div className="flex items-center">
                    <div className={`w-2 h-2 ${getStatusColor(systemStatus.server.status)} rounded-full mr-2`}></div>
                    <span className={`text-sm ${getStatusTextColor(systemStatus.server.status)}`}>
                      {systemStatus.server.url.replace('http://', '').replace('/api', '')}
                    </span>
                  </div>
                </div>
              </div>
              {statsError && (
                <div className="mt-3 p-2 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded text-sm text-red-600 dark:text-red-400">
                  {statsError}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
