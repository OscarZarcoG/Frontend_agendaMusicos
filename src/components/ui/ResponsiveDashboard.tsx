'use client';

import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Music, 
  Calendar, 
  DollarSign, 
  Users, 
  Plus, 
  UserPlus, 
  Library, 
  RefreshCw,
  Server,
  Database,
  Wifi,
  TrendingUp,
  Activity
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { AnimatedStatCard, AnimatedBarChart, AnimatedDoughnutChart, AnimatedLineChart } from '@/components/ui/Charts';
import { ThreeBackground, FloatingNotes } from '@/components/ui/ThreeBackground';
import { useGSAP, useTextAnimation } from '@/hooks/useGSAP';

interface DashboardProps {
  stats: any;
  systemStatus: any;
  statsLoading: boolean;
  systemLoading: boolean;
  statsError: string | null;
  refreshStatus: () => void;
}

export const ResponsiveDashboard: React.FC<DashboardProps> = ({
  stats,
  systemStatus,
  statsLoading,
  systemLoading,
  statsError,
  refreshStatus
}) => {
  const { staggerIn } = useGSAP();
  const { typeWriter } = useTextAnimation();
  const titleRef = useRef<HTMLHeadingElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (titleRef.current && typeWriter) {
        try {
          typeWriter(titleRef.current, { delay: 0.5 });
        } catch (error) {
          console.warn('Error en typeWriter animation:', error);
        }
      }
      if (statsRef.current && staggerIn) {
        try {
          const cards = statsRef.current.querySelectorAll('.stat-card');
           if (cards.length > 0) {
             staggerIn(Array.from(cards) as HTMLElement[], { delay: 1 });
           }
        } catch (error) {
          console.warn('Error en staggerIn animation:', error);
        }
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [staggerIn, typeWriter]);

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

  // Datos para gráficos
  const monthlyRevenueData = {
    labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Ingresos Mensuales',
        data: [12000, 19000, 15000, 25000, 22000, 30000],
        backgroundColor: 'rgba(139, 92, 246, 0.8)',
        borderColor: 'rgba(139, 92, 246, 1)',
        borderWidth: 2,
        borderRadius: 8,
      },
    ],
  };

  const contractsDistributionData = {
    labels: ['Bodas', 'Cumpleaños', 'Corporativos', 'Otros'],
    datasets: [
      {
        data: [35, 25, 25, 15],
        backgroundColor: [
          'rgba(239, 68, 68, 0.8)',
          'rgba(59, 130, 246, 0.8)',
          'rgba(16, 185, 129, 0.8)',
          'rgba(245, 158, 11, 0.8)',
        ],
        borderWidth: 0,
      },
    ],
  };

  const performanceData = {
    labels: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'],
    datasets: [
      {
        label: 'Eventos por día',
        data: [2, 3, 1, 4, 2, 6, 5],
        borderColor: 'rgba(16, 185, 129, 1)',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        tension: 0.4,
        fill: true,
      },
    ],
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Fondo animado - Solo en desktop */}
      <div className="hidden lg:block">
        <ThreeBackground className="fixed inset-0" />
      </div>
      
      {/* Contenido principal */}
      <div className="relative z-10 space-y-4 sm:space-y-6 lg:space-y-8 p-3 sm:p-4 lg:p-6">
        {/* Header responsivo */}
        <motion.div 
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 via-blue-600/20 to-emerald-600/20 rounded-2xl lg:rounded-3xl blur-xl" />
          <div className="relative bg-white/10 dark:bg-gray-900/10 backdrop-blur-lg rounded-2xl lg:rounded-3xl p-4 sm:p-6 lg:p-8 border border-white/20">
            <div className="flex flex-col space-y-4 lg:flex-row lg:items-center lg:justify-between lg:space-y-0">
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-3 lg:space-x-4">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="p-2 lg:p-3 bg-gradient-to-br from-purple-500 to-blue-600 rounded-xl lg:rounded-2xl"
                  >
                    <Music className="h-6 w-6 lg:h-8 lg:w-8 text-white" />
                  </motion.div>
                  <div>
                    <h1 
                      ref={titleRef}
                      className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-emerald-600 bg-clip-text text-transparent"
                    >
                      Dashboard Musical
                    </h1>
                    <motion.p 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.5, duration: 0.8 }}
                      className="mt-1 lg:mt-2 text-sm sm:text-base lg:text-lg text-gray-600 dark:text-gray-300"
                    >
                      Gestión profesional para músicos modernos
                    </motion.p>
                  </div>
                </div>
              </div>
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1, duration: 0.6 }}
                className="w-full lg:w-auto"
              >
                <Link href="/contratos/nuevo" className="block">
                  <Button className="w-full lg:w-auto group relative overflow-hidden bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-4 sm:px-6 lg:px-8 py-3 lg:py-4 rounded-xl lg:rounded-2xl text-sm sm:text-base lg:text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
                    <span className="relative z-10 flex items-center justify-center space-x-2">
                      <Plus className="h-4 w-4 lg:h-5 lg:w-5" />
                      <span>Nuevo Contrato</span>
                    </span>
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                      initial={{ x: '-100%' }}
                      whileHover={{ x: '100%' }}
                      transition={{ duration: 0.6 }}
                    />
                  </Button>
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Stats Cards Responsivas */}
        <div ref={statsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
          <div className="stat-card">
            <AnimatedStatCard
              title="Contratos Activos"
              value={statsLoading ? '...' : stats.contratosActivos}
              change="+12% vs mes anterior"
              icon={<Music className="h-6 w-6 lg:h-8 lg:w-8" />}
              gradient="bg-gradient-to-br from-purple-500 via-purple-600 to-indigo-600"
              delay={0.1}
            />
          </div>
          
          <div className="stat-card">
            <AnimatedStatCard
              title="Eventos Este Mes"
              value={statsLoading ? '...' : stats.eventosEsteMes}
              change="+8% vs mes anterior"
              icon={<Calendar className="h-6 w-6 lg:h-8 lg:w-8" />}
              gradient="bg-gradient-to-br from-blue-500 via-blue-600 to-cyan-600"
              delay={0.2}
            />
          </div>
          
          <div className="stat-card">
            <AnimatedStatCard
              title="Ingresos del Mes"
              value={statsLoading ? '...' : `$${stats.ingresosMes.toLocaleString()}`}
              change="+25% vs mes anterior"
              icon={<DollarSign className="h-6 w-6 lg:h-8 lg:w-8" />}
              gradient="bg-gradient-to-br from-emerald-500 via-green-600 to-teal-600"
              delay={0.3}
            />
          </div>
          
          <div className="stat-card">
            <AnimatedStatCard
              title="Clientes Totales"
              value={statsLoading ? '...' : stats.clientesTotales}
              change="+5% vs mes anterior"
              icon={<Users className="h-6 w-6 lg:h-8 lg:w-8" />}
              gradient="bg-gradient-to-br from-orange-500 via-red-500 to-pink-600"
              delay={0.4}
            />
          </div>
        </div>

        {/* Gráficos responsivos */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8"
        >
          {/* Gráfico de Ingresos */}
          <div className="xl:col-span-2">
            <div className="relative bg-white/10 dark:bg-gray-900/10 backdrop-blur-lg rounded-2xl lg:rounded-3xl p-4 sm:p-6 border border-white/20">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 space-y-2 sm:space-y-0">
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">Ingresos Mensuales</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Evolución de ingresos por mes</p>
                </div>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  className="p-2 bg-gradient-to-br from-purple-500 to-blue-600 rounded-xl self-start sm:self-auto"
                >
                  <TrendingUp className="h-5 w-5 lg:h-6 lg:w-6 text-white" />
                </motion.div>
              </div>
              <div className="h-64 sm:h-72 lg:h-80">
                <AnimatedBarChart data={monthlyRevenueData} className="h-full" />
              </div>
            </div>
          </div>

          {/* Distribución de Contratos */}
          <div>
            <div className="relative bg-white/10 dark:bg-gray-900/10 backdrop-blur-lg rounded-2xl lg:rounded-3xl p-4 sm:p-6 border border-white/20 h-full">
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">Tipos de Eventos</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Distribución por categoría</p>
                </div>
                <div className="hidden lg:block">
                  <FloatingNotes className="w-10 h-10 lg:w-12 lg:h-12" />
                </div>
              </div>
              <div className="h-48 sm:h-56 lg:h-64">
                <AnimatedDoughnutChart data={contractsDistributionData} className="h-full" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Performance y Acciones Rápidas */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8"
        >
          {/* Performance Semanal */}
          <div className="relative bg-white/10 dark:bg-gray-900/10 backdrop-blur-lg rounded-2xl lg:rounded-3xl p-4 sm:p-6 border border-white/20">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 space-y-2 sm:space-y-0">
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">Performance Semanal</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">Eventos por día de la semana</p>
              </div>
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="p-2 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl self-start sm:self-auto"
              >
                <Activity className="h-5 w-5 lg:h-6 lg:w-6 text-white" />
              </motion.div>
            </div>
            <div className="h-48 sm:h-56 lg:h-64">
              <AnimatedLineChart data={performanceData} className="h-full" />
            </div>
          </div>

          {/* Acciones Rápidas Responsivas */}
          <div className="relative bg-white/10 dark:bg-gray-900/10 backdrop-blur-lg rounded-2xl lg:rounded-3xl p-4 sm:p-6 border border-white/20">
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">Acciones Rápidas</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">Funciones más utilizadas</p>
              </div>
            </div>
            <div className="space-y-3 sm:space-y-4">
              <Link href="/contratos/nuevo" className="block">
                <motion.div
                  whileHover={{ scale: 1.02, x: 5 }}
                  whileTap={{ scale: 0.98 }}
                  className="group relative overflow-hidden bg-gradient-to-r from-purple-500/20 to-blue-500/20 hover:from-purple-500/30 hover:to-blue-500/30 backdrop-blur-sm rounded-xl lg:rounded-2xl p-3 sm:p-4 border border-white/20 transition-all duration-300"
                >
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-gradient-to-br from-purple-500 to-blue-600 rounded-lg lg:rounded-xl">
                      <Plus className="h-4 w-4 lg:h-5 lg:w-5 text-white" />
                    </div>
                    <span className="font-semibold text-sm sm:text-base text-gray-900 dark:text-white">Crear Nuevo Contrato</span>
                  </div>
                </motion.div>
              </Link>
              
              <Link href="/clientes/nuevo" className="block">
                <motion.div
                  whileHover={{ scale: 1.02, x: 5 }}
                  whileTap={{ scale: 0.98 }}
                  className="group relative overflow-hidden bg-gradient-to-r from-emerald-500/20 to-teal-500/20 hover:from-emerald-500/30 hover:to-teal-500/30 backdrop-blur-sm rounded-xl lg:rounded-2xl p-3 sm:p-4 border border-white/20 transition-all duration-300"
                >
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg lg:rounded-xl">
                      <UserPlus className="h-4 w-4 lg:h-5 lg:w-5 text-white" />
                    </div>
                    <span className="font-semibold text-sm sm:text-base text-gray-900 dark:text-white">Agregar Cliente</span>
                  </div>
                </motion.div>
              </Link>
              
              <Link href="/repertorio" className="block">
                <motion.div
                  whileHover={{ scale: 1.02, x: 5 }}
                  whileTap={{ scale: 0.98 }}
                  className="group relative overflow-hidden bg-gradient-to-r from-orange-500/20 to-red-500/20 hover:from-orange-500/30 hover:to-red-500/30 backdrop-blur-sm rounded-xl lg:rounded-2xl p-3 sm:p-4 border border-white/20 transition-all duration-300"
                >
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg lg:rounded-xl">
                      <Library className="h-4 w-4 lg:h-5 lg:w-5 text-white" />
                    </div>
                    <span className="font-semibold text-sm sm:text-base text-gray-900 dark:text-white">Gestionar Repertorio</span>
                  </div>
                </motion.div>
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Estado del Sistema Responsivo */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.8 }}
          className="relative bg-white/10 dark:bg-gray-900/10 backdrop-blur-lg rounded-2xl lg:rounded-3xl p-4 sm:p-6 border border-white/20"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 space-y-2 sm:space-y-0">
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">Estado del Sistema</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">Monitoreo en tiempo real</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={refreshStatus}
              disabled={systemLoading}
              className="p-2 sm:p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl text-white hover:shadow-lg transition-all duration-300 self-start sm:self-auto"
            >
              <RefreshCw className={`h-4 w-4 sm:h-5 sm:w-5 ${systemLoading ? 'animate-spin' : ''}`} />
            </motion.button>
          </div>
          
          <div className="space-y-3 sm:space-y-4">
            {/* API Backend */}
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="flex items-center justify-between p-3 sm:p-4 bg-white/5 rounded-xl lg:rounded-2xl border border-white/10"
            >
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-lg lg:rounded-xl">
                  <Server className="h-4 w-4 lg:h-5 lg:w-5 text-white" />
                </div>
                <div>
                  <span className="font-semibold text-sm sm:text-base text-gray-900 dark:text-white">API Backend</span>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Servicios principales</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <motion.div 
                  animate={{ scale: systemStatus.apiBackend.status === 'connected' ? [1, 1.2, 1] : 1 }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full ${getStatusColor(systemStatus.apiBackend.status)}`} 
                />
                <span className={`text-xs sm:text-sm font-medium ${getStatusTextColor(systemStatus.apiBackend.status)}`}>
                  {systemStatus.apiBackend.message}
                </span>
              </div>
            </motion.div>
            
            {/* Base de Datos */}
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="flex items-center justify-between p-3 sm:p-4 bg-white/5 rounded-xl lg:rounded-2xl border border-white/10"
            >
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg lg:rounded-xl">
                  <Database className="h-4 w-4 lg:h-5 lg:w-5 text-white" />
                </div>
                <div>
                  <span className="font-semibold text-sm sm:text-base text-gray-900 dark:text-white">Base de Datos</span>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Almacenamiento</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <motion.div 
                  animate={{ scale: systemStatus.database.status === 'connected' ? [1, 1.2, 1] : 1 }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full ${getStatusColor(systemStatus.database.status)}`} 
                />
                <span className={`text-xs sm:text-sm font-medium ${getStatusTextColor(systemStatus.database.status)}`}>
                  {systemStatus.database.message}
                </span>
              </div>
            </motion.div>
            
            {/* Servidor */}
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="flex items-center justify-between p-3 sm:p-4 bg-white/5 rounded-xl lg:rounded-2xl border border-white/10"
            >
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg lg:rounded-xl">
                  <Wifi className="h-4 w-4 lg:h-5 lg:w-5 text-white" />
                </div>
                <div>
                  <span className="font-semibold text-sm sm:text-base text-gray-900 dark:text-white">Servidor</span>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Conectividad</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <motion.div 
                  animate={{ scale: systemStatus.server.status === 'online' ? [1, 1.2, 1] : 1 }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full ${getStatusColor(systemStatus.server.status)}`} 
                />
                <span className={`text-xs sm:text-sm font-medium ${getStatusTextColor(systemStatus.server.status)}`}>
                  {systemStatus.server.url.replace('http://', '').replace('/api', '')}
                </span>
              </div>
            </motion.div>
            
            {/* Alerta de Error */}
            <AnimatePresence>
              {statsError && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-3 sm:mt-4 p-3 sm:p-4 bg-gradient-to-r from-red-500/20 to-orange-500/20 border border-red-500/30 rounded-xl lg:rounded-2xl backdrop-blur-sm"
                >
                  <div className="flex items-center space-x-3">
                    <motion.div
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
                      className="text-xl sm:text-2xl"
                    >
                      ⚠️
                    </motion.div>
                    <div>
                      <p className="font-semibold text-sm sm:text-base text-red-700 dark:text-red-300">
                        Error en el sistema
                      </p>
                      <p className="text-xs sm:text-sm text-red-600 dark:text-red-400">
                        {statsError}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  );
};