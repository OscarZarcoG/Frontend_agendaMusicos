'use client';

import React, { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { EquipoAudio } from '@/types';
import { equipoAudioService } from '@/services';
import EquipoModal from '@/components/modals/EquipoModal';
import EquipoViewModal from '@/components/modals/EquipoViewModal';



const tiposEquipo = [
  { value: '', label: 'Todos' },
  { value: 'altavoces', label: 'Altavoces' },
  { value: 'microfonos', label: 'Micrófonos' },
  { value: 'mezcladores', label: 'Mezcladores' },
  { value: 'amplificadores', label: 'Amplificadores' },
  { value: 'instrumentos', label: 'Instrumentos' },
  { value: 'iluminacion', label: 'Iluminación' },
  { value: 'cables', label: 'Cables' },
  { value: 'soportes', label: 'Soportes' },
  { value: 'otros', label: 'Otros' }
];

const estadosEquipo = [
  { value: '', label: 'Todos' },
  { value: 'disponible', label: 'Disponible' },
  { value: 'en_uso', label: 'En Uso' },
  { value: 'mantenimiento', label: 'Mantenimiento' },
  { value: 'averiado', label: 'Averiado' },
  { value: 'vendido', label: 'Vendido' }
];

const getEstadoColor = (estado: string) => {
  switch (estado) {
    case 'disponible': return 'text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900';
    case 'en_uso': return 'text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900';
    case 'mantenimiento': return 'text-yellow-600 dark:text-yellow-400 bg-yellow-100 dark:bg-yellow-900';
    case 'averiado': return 'text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900';
    case 'vendido': return 'text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-700';
    default: return 'text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-700';
  }
};

const getEstadoLabel = (estado: string) => {
  const estadoObj = estadosEquipo.find(e => e.value === estado);
  return estadoObj ? estadoObj.label : estado;
};

const getTipoLabel = (tipo: string) => {
  const tipoObj = tiposEquipo.find(t => t.value === tipo);
  return tipoObj ? tipoObj.label : tipo;
};

export default function EquiposPage() {
  const router = useRouter();
  const [equipos, setEquipos] = useState<EquipoAudio[]>([]);
  const [filteredEquipos, setFilteredEquipos] = useState<EquipoAudio[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState<{ show: boolean; equipo: EquipoAudio | null }>({ show: false, equipo: null });
  const [equipoModal, setEquipoModal] = useState<{ show: boolean; equipo: EquipoAudio | null }>({ show: false, equipo: null });
  const [equipoViewModal, setEquipoViewModal] = useState<{ show: boolean; equipo: EquipoAudio | null }>({ show: false, equipo: null });
  const [deleting, setDeleting] = useState(false);

  // Filtros
  const [filtroTipo, setFiltroTipo] = useState('');
  const [filtroEstado, setFiltroEstado] = useState('');
  const [filtroBusqueda, setFiltroBusqueda] = useState('');

  // Estadísticas
  const [stats, setStats] = useState({
    total: 0,
    disponibles: 0,
    enUso: 0,
    mantenimiento: 0
  });

  useEffect(() => {
    fetchEquipos();
  }, []);

  useEffect(() => {
    applyFilters();
    calculateStats();
  }, [equipos, filtroTipo, filtroEstado, filtroBusqueda]);

  const fetchEquipos = async () => {
    try {
      const data = await equipoAudioService.getAll();
      setEquipos(data);
    } catch (error: any) {
      setError(error.message || 'Error al cargar los equipos');
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = equipos;

    if (filtroTipo) {
      filtered = filtered.filter(equipo => equipo.tipo === filtroTipo);
    }

    if (filtroEstado) {
      filtered = filtered.filter(equipo => equipo.estado === filtroEstado);
    }

    if (filtroBusqueda) {
      const busqueda = filtroBusqueda.toLowerCase();
      filtered = filtered.filter(equipo => 
        equipo.nombre.toLowerCase().includes(busqueda) ||
        equipo.marca.toLowerCase().includes(busqueda) ||
        equipo.modelo.toLowerCase().includes(busqueda) ||
        equipo.numero_serie.toLowerCase().includes(busqueda)
      );
    }

    setFilteredEquipos(filtered);
  };

  const calculateStats = () => {
    const total = equipos.length;
    const disponibles = equipos.filter(e => e.estado === 'disponible').length;
    const enUso = equipos.filter(e => e.estado === 'en_uso').length;
    const mantenimiento = equipos.filter(e => e.estado === 'mantenimiento').length;

    setStats({ total, disponibles, enUso, mantenimiento });
  };

  const handleDelete = async (id: number) => {
    setDeleting(true);
    try {
      await equipoAudioService.delete(id);
      setEquipos(equipos.filter(equipo => equipo.id !== id));
      setDeleteConfirm({ show: false, equipo: null });
    } catch (error: any) {
      setError(error.message || 'Error al eliminar el equipo');
    } finally {
      setDeleting(false);
    }
  };

  const handleEquipoModalSuccess = () => {
    fetchEquipos();
  };

  const openCreateModal = () => {
    setEquipoModal({ show: true, equipo: null });
  };

  const openEditModal = (equipo: EquipoAudio) => {
    setEquipoModal({ show: true, equipo });
  };

  const closeEquipoModal = () => {
    setEquipoModal({ show: false, equipo: null });
  };

  const openViewModal = (equipo: EquipoAudio) => {
    setEquipoViewModal({ show: true, equipo });
  };

  const closeViewModal = () => {
    setEquipoViewModal({ show: false, equipo: null });
  };

  const clearFilters = () => {
    setFiltroTipo('');
    setFiltroEstado('');
    setFiltroBusqueda('');
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-400">Cargando equipos...</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="md:flex md:items-center md:justify-between">
          <div className="flex-1 min-w-0">
            <h2 className="text-2xl font-bold leading-7 text-gray-900 dark:text-gray-100 sm:text-3xl sm:truncate">
              Equipos de Audio
            </h2>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Gestiona todo tu equipo de audio y sonido
            </p>
          </div>
          <div className="mt-4 flex md:mt-0 md:ml-4">
            <Button onClick={openCreateModal}>
              Nuevo Equipo
            </Button>
          </div>
        </div>

        {error && (
          <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md">
            <p className="text-red-600 dark:text-red-400">{error}</p>
          </div>
        )}

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle>Filtros</CardTitle>
            <CardDescription>
              Filtra los equipos por tipo, estado o disponibilidad
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Tipo de Equipo
                </label>
                <select 
                  value={filtroTipo}
                  onChange={(e) => setFiltroTipo(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                >
                  {tiposEquipo.map(tipo => (
                    <option key={tipo.value} value={tipo.value}>
                      {tipo.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Estado
                </label>
                <select 
                  value={filtroEstado}
                  onChange={(e) => setFiltroEstado(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                >
                  {estadosEquipo.map(estado => (
                    <option key={estado.value} value={estado.value}>
                      {estado.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Buscar
                </label>
                <input
                  type="text"
                  placeholder="Nombre, marca, modelo..."
                  value={filtroBusqueda}
                  onChange={(e) => setFiltroBusqueda(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                />
              </div>
              <div className="flex items-end space-x-2">
                <Button 
                  variant="outline" 
                  onClick={clearFilters}
                  className="flex-1"
                >
                  Limpiar
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Equipment Stats */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Equipos
              </CardTitle>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="h-4 w-4 text-gray-500 dark:text-gray-400"
              >
                <rect width="20" height="14" x="2" y="3" rx="2" ry="2" />
                <line x1="8" y1="21" x2="16" y2="21" />
                <line x1="12" y1="17" x2="12" y2="21" />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
              <p className="text-xs text-muted-foreground">
                Equipos registrados
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Disponibles
              </CardTitle>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="h-4 w-4 text-green-600 dark:text-green-400"
              >
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22,4 12,14.01 9,11.01" />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">{stats.disponibles}</div>
              <p className="text-xs text-muted-foreground">
                Listos para usar
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                En Uso
              </CardTitle>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="h-4 w-4 text-blue-600 dark:text-blue-400"
              >
                <circle cx="12" cy="12" r="10" />
                <polyline points="12,6 12,12 16,14" />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{stats.enUso}</div>
              <p className="text-xs text-muted-foreground">
                Actualmente utilizados
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Mantenimiento
              </CardTitle>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="h-4 w-4 text-yellow-600 dark:text-yellow-400"
              >
                <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">{stats.mantenimiento}</div>
              <p className="text-xs text-muted-foreground">
                Requieren atención
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Equipment List */}
        <Card>
          <CardHeader>
            <CardTitle>Lista de Equipos</CardTitle>
            <CardDescription>
              {filteredEquipos.length} de {equipos.length} equipos
            </CardDescription>
          </CardHeader>
          <CardContent>
            {filteredEquipos.length === 0 ? (
              <div className="text-center py-8">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-gray-100">
                  {equipos.length === 0 ? 'No hay equipos registrados' : 'No se encontraron equipos'}
                </h3>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  {equipos.length === 0 
                    ? 'Comienza agregando tu primer equipo de audio.'
                    : 'Intenta ajustar los filtros de búsqueda.'
                  }
                </p>
                {equipos.length === 0 && (
                  <div className="mt-6">
                    <Link href="/equipos/nuevo">
                      <Button>
                        <svg
                          className="-ml-1 mr-2 h-5 w-5"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                        Nuevo Equipo
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {filteredEquipos.map((equipo) => (
                  <div key={equipo.id} className="border dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow dark:bg-gray-800">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-100 truncate">
                        {equipo.nombre}
                      </h3>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        equipo.estado === 'disponible' ? 'text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/20' :
                        equipo.estado === 'en_uso' ? 'text-blue-600 bg-blue-100 dark:text-blue-400 dark:bg-blue-900/20' :
                        equipo.estado === 'mantenimiento' ? 'text-yellow-600 bg-yellow-100 dark:text-yellow-400 dark:bg-yellow-900/20' :
                        equipo.estado === 'averiado' ? 'text-red-600 bg-red-100 dark:text-red-400 dark:bg-red-900/20' :
                        'text-gray-600 bg-gray-100 dark:text-gray-400 dark:bg-gray-700'
                      }`}>
                        {getEstadoLabel(equipo.estado)}
                      </span>
                    </div>
                    
                    <div className="space-y-1 text-sm text-gray-600 dark:text-gray-400 mb-4">
                      <p><span className="font-medium">Tipo:</span> {getTipoLabel(equipo.tipo)}</p>
                      {equipo.marca && (
                        <p><span className="font-medium">Marca:</span> {equipo.marca}</p>
                      )}
                      {equipo.modelo && (
                        <p><span className="font-medium">Modelo:</span> {equipo.modelo}</p>
                      )}
                      {equipo.ubicacion && (
                        <p><span className="font-medium">Ubicación:</span> {equipo.ubicacion}</p>
                      )}
                      {equipo.precio_compra && (
                        <p><span className="font-medium">Precio:</span> ${equipo.precio_compra}</p>
                      )}
                    </div>

                    <div className="flex space-x-2">
                      <Button 
                        variant="outline" 
                        onClick={() => openViewModal(equipo)}
                        className="flex-1"
                      >
                        Ver
                      </Button>
                      <Button 
                        variant="outline"
                        onClick={() => openEditModal(equipo)}
                        className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 dark:text-blue-400 dark:hover:text-blue-300 dark:hover:bg-blue-900/20"
                      >
                        Editar
                      </Button>
                      <Button 
                        variant="outline"
                        onClick={() => setDeleteConfirm({ show: true, equipo })}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:text-red-300 dark:hover:bg-red-900/20"
                      >
                        Eliminar
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Delete Confirmation Modal */}
        {deleteConfirm.show && (
          <div className="fixed inset-0 bg-black bg-opacity-50 dark:bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Confirmar Eliminación
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                ¿Estás seguro de que deseas eliminar este equipo? Esta acción no se puede deshacer.
              </p>
              <div className="flex space-x-4">
                <button 
                  onClick={() => setDeleteConfirm({ show: false, equipo: null })}
                  className="flex-1 px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-gray-700 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                  disabled={deleting}
                >
                  Cancelar
                </button>
                <button 
                  onClick={() => deleteConfirm.equipo && handleDelete(deleteConfirm.equipo.id)}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50 transition-colors"
                  disabled={deleting}
                >
                  {deleting ? 'Eliminando...' : 'Eliminar'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Modal de Equipo */}
        <EquipoModal
          isOpen={equipoModal.show}
          onClose={closeEquipoModal}
          onSuccess={handleEquipoModalSuccess}
          equipo={equipoModal.equipo}
        />

        {/* Modal de Visualización de Equipo */}
        <EquipoViewModal
          isOpen={equipoViewModal.show}
          onClose={closeViewModal}
          equipo={equipoViewModal.equipo || {} as EquipoAudio}
        />
      </div>
    </Layout>
  );
}