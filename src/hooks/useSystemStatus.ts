import { useState, useEffect, useCallback } from 'react';
import api from '@/lib/api';

export interface SystemStatus {
  apiBackend: {
    status: 'connected' | 'disconnected' | 'checking';
    message: string;
  };
  database: {
    status: 'active' | 'inactive' | 'checking';
    message: string;
  };
  server: {
    status: 'online' | 'offline' | 'checking';
    url: string;
  };
}

export function useSystemStatus() {
  const [systemStatus, setSystemStatus] = useState<SystemStatus>({
    apiBackend: {
      status: 'checking',
      message: 'Verificando...'
    },
    database: {
      status: 'checking',
      message: 'Verificando...'
    },
    server: {
      status: 'checking',
      url: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'
    }
  });

  const [loading, setLoading] = useState(true);

  const checkSystemStatus = useCallback(async () => {
    setLoading(true);
    
    try {
      const response = await api.get('/agenda/clientes/', { timeout: 5000 });
      
      if (response.status === 200) {
        setSystemStatus({
          apiBackend: {
            status: 'connected',
            message: 'Conectado'
          },
          database: {
            status: 'active',
            message: 'Activa'
          },
          server: {
            status: 'online',
            url: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'
          }
        });
      }
    } catch (error: any) {
      // Si hay error, el backend no está disponible
      setSystemStatus({
        apiBackend: {
          status: 'disconnected',
          message: 'Desconectado'
        },
        database: {
          status: 'inactive',
          message: 'Inactiva'
        },
        server: {
          status: 'offline',
          url: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'
        }
      });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    checkSystemStatus();
    
    // Verificar el estado cada 30 segundos
    const interval = setInterval(checkSystemStatus, 30000);
    
    return () => clearInterval(interval);
  }, [checkSystemStatus]);

  return {
    systemStatus,
    loading,
    refreshStatus: checkSystemStatus
  };
}