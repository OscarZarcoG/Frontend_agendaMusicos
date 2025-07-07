'use client';

import React from 'react';
import Modal from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { EquipoAudio } from '@/types';
import { Eye, Package, Settings, MapPin, Calendar, DollarSign, FileText, Image as ImageIcon } from 'lucide-react';

interface EquipoViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  equipo: EquipoAudio;
}

const EquipoViewModal: React.FC<EquipoViewModalProps> = ({ isOpen, onClose, equipo }) => {
  const getTipoLabel = (tipo: string) => {
    const tipos: { [key: string]: string } = {
      'altavoces': 'Altavoces',
      'microfonos': 'Micrófonos',
      'mezcladores': 'Mezcladores',
      'amplificadores': 'Amplificadores',
      'instrumentos': 'Instrumentos',
      'iluminacion': 'Iluminación',
      'cables': 'Cables',
      'soportes': 'Soportes',
      'otros': 'Otros'
    };
    return tipos[tipo] || tipo;
  };

  const getEstadoLabel = (estado: string) => {
    const estados: { [key: string]: string } = {
      'disponible': 'Disponible',
      'en_uso': 'En Uso',
      'mantenimiento': 'Mantenimiento',
      'averiado': 'Averiado',
      'vendido': 'Vendido'
    };
    return estados[estado] || estado;
  };

  const getEstadoColor = (estado: string) => {
    const colores: { [key: string]: string } = {
      'disponible': 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200',
      'en_uso': 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200',
      'mantenimiento': 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200',
      'averiado': 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200',
      'vendido': 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
    };
    return colores[estado] || 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200';
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return 'No especificada';
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatPrice = (price: number | null | undefined) => {
    if (!price) return 'No especificado';
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR'
    }).format(price);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Detalles del Equipo">
      <div className="space-y-6">
        {/* Header con nombre y estado */}
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">{equipo.nombre}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{getTipoLabel(equipo.tipo)}</p>
          </div>
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getEstadoColor(equipo.estado)}`}>
            {getEstadoLabel(equipo.estado)}
          </span>
        </div>

        {/* Estadísticas rápidas */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900 dark:to-indigo-900 p-4 rounded-lg">
          <div className="text-center">
            <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">Precio</p>
            <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">{formatPrice(equipo.precio_compra)}</p>
          </div>
          <div className="text-center">
            <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">Marca</p>
            <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">{equipo.marca || 'N/A'}</p>
          </div>
          <div className="text-center">
            <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">Ubicación</p>
            <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">{equipo.ubicacion || 'N/A'}</p>
          </div>
          <div className="text-center">
            <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">Garantía</p>
            <p className={`text-lg font-semibold ${
              equipo.garantia_hasta && new Date(equipo.garantia_hasta) > new Date() 
                ? 'text-green-600' 
                : 'text-red-600'
            }`}>
              {equipo.garantia_hasta && new Date(equipo.garantia_hasta) > new Date() ? 'Vigente' : 'Vencida'}
            </p>
          </div>
        </div>

        {/* Imagen del equipo */}
        {equipo.imagen && (
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-3">
              <ImageIcon className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              <h4 className="font-medium text-gray-900 dark:text-gray-100">Imagen del Equipo</h4>
            </div>
            <div className="flex justify-center">
              <img 
                src={equipo.imagen} 
                alt={equipo.nombre}
                className="max-w-full max-h-64 object-contain rounded-lg shadow-sm"
              />
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Información Básica */}
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-3">
              <Package className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              <h4 className="font-medium text-gray-900 dark:text-gray-100">Información Básica</h4>
            </div>
            <div className="space-y-3 ">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Marca</label>
                <p className="mt-1 text-sm text-gray-900 dark:text-gray-100">{equipo.marca || 'No especificada'}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Modelo</label>
                <p className="mt-1 text-sm text-gray-900 dark:text-gray-100">{equipo.modelo || 'No especificado'}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Número de Serie</label>
                <p className="mt-1 text-sm text-gray-900 dark:text-gray-100 font-mono">{equipo.numero_serie || 'No especificado'}</p>
              </div>
              {equipo.descripcion && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Descripción</label>
                  <p className="mt-1 text-sm text-gray-900 dark:text-gray-100">{equipo.descripcion}</p>
                </div>
              )}
              {equipo.numero_bocinas && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Número de Bocinas</label>
                  <p className="mt-1 text-sm text-gray-900 dark:text-gray-100">{equipo.numero_bocinas}</p>
                </div>
              )}
            </div>
          </div>

          {/* Ubicación y Estado */}
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-3">
              <MapPin className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              <h4 className="font-medium text-gray-900 dark:text-gray-100">Ubicación y Estado</h4>
            </div>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Ubicación</label>
                <p className="mt-1 text-sm text-gray-900 dark:text-gray-100">{equipo.ubicacion || 'No especificada'}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Estado Actual</label>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mt-1 ${getEstadoColor(equipo.estado)}`}>
                  {getEstadoLabel(equipo.estado)}
                </span>
              </div>
            </div>
          </div>

          {/* Información Económica */}
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-3">
              <DollarSign className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              <h4 className="font-medium text-gray-900 dark:text-gray-100">Información Económica</h4>
            </div>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Precio de Compra</label>
                <p className="mt-1 text-lg text-gray-900 dark:text-gray-100 font-semibold">{formatPrice(equipo.precio_compra)}</p>
              </div>
              {equipo.precio_compra && equipo.fecha_compra && (
                <div className="bg-blue-50 dark:bg-blue-900 p-3 rounded-md">
                  <p className="text-xs text-blue-600 dark:text-blue-200 font-medium">Valor de Inversión</p>
                  <p className="text-sm text-blue-800 dark:text-blue-300">Adquirido el {formatDate(equipo.fecha_compra)}</p>
                </div>
              )}
            </div>
          </div>

          {/* Fechas Importantes */}
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-3">
              <Calendar className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              <h4 className="font-medium text-gray-900 dark:text-gray-100">Fechas Importantes</h4>
            </div>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Fecha de Compra</label>
                <p className="mt-1 text-sm text-gray-900 dark:text-gray-100">{formatDate(equipo.fecha_compra || '')}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Garantía Hasta</label>
                <div className="mt-1">
                  <p className="text-sm text-gray-900 dark:text-gray-100">{formatDate(equipo.garantia_hasta || '')}</p>
                  {equipo.garantia_hasta && (
                    <div className={`mt-1 inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      new Date(equipo.garantia_hasta) > new Date() 
                        ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200' 
                        : 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
                    }`}>
                      {new Date(equipo.garantia_hasta) > new Date() ? '✓ En garantía' : '⚠ Garantía vencida'}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Observaciones */}
        {equipo.observaciones && (
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-3">
              <FileText className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              <h4 className="font-medium text-gray-900 dark:text-gray-100">Observaciones</h4>
            </div>
            <p className="text-sm text-gray-900 dark:text-gray-100 whitespace-pre-wrap">{equipo.observaciones}</p>
          </div>
        )}

        {/* Información del Sistema */}
        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-3">
            <Settings className="h-5 w-5 text-gray-600 dark:text-gray-400" />
            <h4 className="font-medium text-gray-900 dark:text-gray-100">Información del Sistema</h4>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">ID del Equipo</label>
              <p className="mt-1 text-sm text-gray-900 dark:text-gray-100 font-mono">#{equipo.id}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Fecha de Registro</label>
              <p className="mt-1 text-sm text-gray-900 dark:text-gray-100">
                {equipo.created_at ? new Date(equipo.created_at).toLocaleDateString('es-ES', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                }) : 'No disponible'}
              </p>
            </div>
            {equipo.updated_at && (
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Última Actualización</label>
                <p className="mt-1 text-sm text-gray-900 dark:text-gray-100">
                  {new Date(equipo.updated_at).toLocaleDateString('es-ES', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Botones de acción */}
        <div className="flex justify-between items-center pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="text-xs text-gray-500 dark:text-gray-400">
            ID: #{equipo.id} • Registrado: {equipo.created_at ? new Date(equipo.created_at).toLocaleDateString('es-ES') : 'N/A'}
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={onClose}>
              Cerrar
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default EquipoViewModal;