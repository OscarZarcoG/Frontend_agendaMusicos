'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Cliente } from '@/types';
import { clienteService } from '@/services';
import Layout from '@/components/layout/Layout';
import ClienteModal from '@/components/modals/ClienteModal';
import ClienteViewModal from '@/components/modals/ClienteViewModal';

export default function ClientesPage() {
  const router = useRouter();
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [filteredClientes, setFilteredClientes] = useState<Cliente[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [tipoFilter, setTipoFilter] = useState('');
  const [frecuenciaFilter, setFrecuenciaFilter] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState<{ show: boolean; cliente: Cliente | null }>({ show: false, cliente: null });
  const [deleting, setDeleting] = useState(false);
  const [clienteModal, setClienteModal] = useState<{ show: boolean; cliente: Cliente | null }>({ show: false, cliente: null });
  const [viewModal, setViewModal] = useState<{ show: boolean; cliente: Cliente | null }>({ show: false, cliente: null });

  useEffect(() => {
    loadClientes();
  }, []);

  useEffect(() => {
    filterClientes();
  }, [clientes, searchTerm, tipoFilter, frecuenciaFilter]);

  const loadClientes = async () => {
    try {
      setLoading(true);
      const data = await clienteService.getAll();
      setClientes(data);
    } catch (err: any) {
      setError(err.message || 'Error al cargar los clientes');
    } finally {
      setLoading(false);
    }
  };

  const filterClientes = () => {
    let filtered = clientes;

    // Filtro por búsqueda
    if (searchTerm) {
      filtered = filtered.filter(cliente => 
        cliente.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (cliente.apellidos && cliente.apellidos.toLowerCase().includes(searchTerm.toLowerCase())) ||
        cliente.telefono.includes(searchTerm) ||
        (cliente.email && cliente.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (cliente.empresa && cliente.empresa.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Filtro por tipo de cliente
    if (tipoFilter) {
      filtered = filtered.filter(cliente => cliente.tipo_cliente === tipoFilter);
    }

    // Filtro por frecuencia
    if (frecuenciaFilter) {
      filtered = filtered.filter(cliente => cliente.frecuencia === frecuenciaFilter);
    }

    setFilteredClientes(filtered);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleDelete = async (id: number) => {
    setDeleting(true);
    try {
      await clienteService.delete(id);
      await loadClientes();
      setDeleteConfirm({ show: false, cliente: null });
    } catch (err: any) {
      setError(err.message || 'Error al eliminar el cliente');
    } finally {
      setDeleting(false);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteConfirm.cliente) return;
    
    setDeleting(true);
    try {
      await clienteService.delete(deleteConfirm.cliente.id);
      setClientes(prev => prev.filter(c => c.id !== deleteConfirm.cliente!.id));
      setDeleteConfirm({ show: false, cliente: null });
    } catch (err: any) {
      setError(err.message || 'Error al eliminar el cliente');
    } finally {
      setDeleting(false);
    }
  };

  const handleClienteModalSuccess = () => {
    loadClientes();
  };

  const openCreateModal = () => {
    setClienteModal({ show: true, cliente: null });
  };

  const openEditModal = (cliente: Cliente) => {
    setClienteModal({ show: true, cliente });
  };

  const closeClienteModal = () => {
    setClienteModal({ show: false, cliente: null });
  };

  const getFrecuenciaLabel = (frecuencia: string) => {
    switch (frecuencia) {
      case 'frecuente': return 'Frecuente';
      case 'regular': return 'Regular';
      case 'ocasional': return 'Ocasional';
      default: return frecuencia;
    }
  };

  const getTipoClienteLabel = (tipo: string) => {
    switch (tipo) {
      case 'particular': return 'Particular';
      case 'empresa': return 'Empresa';
      case 'organizacion': return 'Organización';
      default: return tipo;
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-64">
            <div className="text-lg text-gray-600 dark:text-gray-400">Cargando clientes...</div>
          </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Clientes</h1>
        <Button onClick={openCreateModal}>Nuevo Cliente</Button>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md">
          <p className="text-red-600 dark:text-red-400">{error}</p>
        </div>
      )}

      {/* Filtros */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label htmlFor="search" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Buscar
            </label>
            <input
              type="text"
              id="search"
              value={searchTerm}
              onChange={handleSearch}
              placeholder="Nombre, teléfono, email..."
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
            />
          </div>
          
          <div>
            <label htmlFor="tipo" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Tipo de Cliente
            </label>
            <select
              id="tipo"
              value={tipoFilter}
              onChange={(e) => setTipoFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
            >
              <option value="">Todos</option>
              <option value="particular">Particular</option>
              <option value="empresa">Empresa</option>
              <option value="organizacion">Organización</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="frecuencia" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Frecuencia
            </label>
            <select
              id="frecuencia"
              value={frecuenciaFilter}
              onChange={(e) => setFrecuenciaFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
            >
              <option value="">Todas</option>
              <option value="frecuente">Frecuente</option>
              <option value="regular">Regular</option>
              <option value="ocasional">Ocasional</option>
            </select>
          </div>
          
          <div className="flex items-end">
            <button
              onClick={() => {
                setSearchTerm('');
                setTipoFilter('');
                setFrecuenciaFilter('');
              }}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
            >
              Limpiar Filtros
            </button>
          </div>
        </div>
      </div>

      {/* Lista de clientes */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        {filteredClientes.length === 0 ? (
          <div className="p-8 text-center text-gray-500 dark:text-gray-400">
            {clientes.length === 0 ? 'No hay clientes registrados' : 'No se encontraron clientes con los filtros aplicados'}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Cliente
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Contacto
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Tipo
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Frecuencia
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Dirección
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {filteredClientes.map((cliente) => (
                  <tr key={cliente.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                          {cliente.nombre} {cliente.apellidos}
                        </div>
                        {cliente.observaciones && (
                          <div className="text-sm text-gray-500 dark:text-gray-400 truncate max-w-xs">
                            {cliente.observaciones}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 dark:text-gray-100">{cliente.telefono}</div>
                      {cliente.email && (
                        <div className="text-sm text-gray-500 dark:text-gray-400">{cliente.email}</div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-400">
                        {getTipoClienteLabel(cliente.tipo_cliente)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        cliente.frecuencia === 'frecuente' ? 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400' :
                        cliente.frecuencia === 'regular' ? 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-400' :
                        'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300'
                      }`}>
                        {getFrecuenciaLabel(cliente.frecuencia)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                      {cliente.direccion || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setViewModal({ show: true, cliente })}
                          className="mr-2"
                        >
                          Ver
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => openEditModal(cliente)}
                          className="mr-2 text-blue-600 dark:text-blue-400"
                        >
                          Editar
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setDeleteConfirm({ show: true, cliente })}
                          className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                        >
                          Eliminar
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirm.show && (
        <div className="fixed inset-0 bg-black bg-opacity-50 dark:bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Confirmar Eliminación
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              ¿Estás seguro de que deseas eliminar este cliente? Esta acción no se puede deshacer.
            </p>
            <div className="flex space-x-4">
              <button 
                onClick={() => setDeleteConfirm({ show: false, cliente: null })}
                className="flex-1 px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-gray-700 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                disabled={deleting}
              >
                Cancelar
              </button>
              <button 
                onClick={handleDeleteConfirm}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50 transition-colors"
                disabled={deleting}
              >
                {deleting ? 'Eliminando...' : 'Eliminar'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Cliente */}
      <ClienteModal
        isOpen={clienteModal.show}
        onClose={closeClienteModal}
        onSuccess={handleClienteModalSuccess}
        cliente={clienteModal.cliente}
      />

      {/* Modal de Vista de Cliente */}
      <ClienteViewModal
        isOpen={viewModal.show}
        onClose={() => setViewModal({ show: false, cliente: null })}
        cliente={viewModal.cliente}
      />
    </Layout>
  );
}