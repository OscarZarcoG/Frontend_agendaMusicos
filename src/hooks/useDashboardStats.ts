import { useState, useEffect, useCallback } from 'react';
import api from '@/lib/api';

export interface DashboardStats {
  contratosActivos: number;
  eventosEsteMes: number;
  ingresosMes: number;
  clientesTotales: number;
}

export function useDashboardStats() {
  const [stats, setStats] = useState<DashboardStats>({
    contratosActivos: 0,
    eventosEsteMes: 0,
    ingresosMes: 0,
    clientesTotales: 0
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Hacer peticiones paralelas para obtener todas las estadísticas
      const [contratosResponse, clientesResponse] = await Promise.allSettled([
        api.get('/agenda/contratos/', { params: { is_active: true } }),
        api.get('/agenda/clientes/')
      ]);

      let newStats: DashboardStats = {
        contratosActivos: 0,
        eventosEsteMes: 0,
        ingresosMes: 0,
        clientesTotales: 0
      };

      // Procesar contratos activos
      if (contratosResponse.status === 'fulfilled') {
        const contratos = contratosResponse.value.data.results || contratosResponse.value.data;
        newStats.contratosActivos = Array.isArray(contratos) ? contratos.length : 0;
        
        // Calcular eventos este mes e ingresos
        if (Array.isArray(contratos)) {
          const currentMonth = new Date().getMonth();
          const currentYear = new Date().getFullYear();
          
          const eventosEsteMes = contratos.filter(contrato => {
            if (contrato.fecha_evento) {
              const fechaEvento = new Date(contrato.fecha_evento);
              return fechaEvento.getMonth() === currentMonth && 
                     fechaEvento.getFullYear() === currentYear;
            }
            return false;
          });
          
          newStats.eventosEsteMes = eventosEsteMes.length;
          newStats.ingresosMes = eventosEsteMes.reduce((total, contrato) => {
            return total + (parseFloat(contrato.precio_total) || 0);
          }, 0);
        }
      }

      // Procesar clientes totales
      if (clientesResponse.status === 'fulfilled') {
        const clientes = clientesResponse.value.data.results || clientesResponse.value.data;
        newStats.clientesTotales = Array.isArray(clientes) ? clientes.length : 0;
      }

      setStats(newStats);
    } catch (error: any) {
      console.error('Error fetching dashboard stats:', error);
      setError('Error al cargar las estadísticas');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  return {
    stats,
    loading,
    error,
    refreshStats: fetchStats
  };
}