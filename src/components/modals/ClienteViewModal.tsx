'use client';

import React from 'react';
import Modal from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Cliente } from '@/types';
import { User, Building, Phone, Mail, MapPin, Calendar, FileText, Users, Star, Clock } from 'lucide-react';

interface ClienteViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  cliente: Cliente | null;
}

const ClienteViewModal: React.FC<ClienteViewModalProps> = ({ isOpen, onClose, cliente }) => {
  if (!cliente) return null;

  const getTipoClienteLabel = (tipo: string) => {
    switch (tipo) {
      case 'particular': return 'Particular';
      case 'empresa': return 'Empresa';
      case 'organizacion': return 'Organización';
      default: return tipo;
    }
  };

  const getFrecuenciaLabel = (frecuencia: string) => {
    switch (frecuencia) {
      case 'frecuente': return 'Frecuente';
      case 'regular': return 'Regular';
      case 'ocasional': return 'Ocasional';
      default: return frecuencia;
    }
  };

  const getFrecuenciaColor = (frecuencia: string) => {
    switch (frecuencia) {
      case 'frecuente': return 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 border-green-200 dark:border-green-700';
      case 'regular': return 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 border-blue-200 dark:border-blue-700';
      case 'ocasional': return 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 border-yellow-200 dark:border-yellow-700';
      default: return 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 border-gray-200 dark:border-gray-600';
    }
  };

  const getTipoColor = (tipo: string) => {
    switch (tipo) {
      case 'particular': return 'bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 border-purple-200 dark:border-purple-700';
      case 'empresa': return 'bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 border-indigo-200 dark:border-indigo-700';
      case 'organizacion': return 'bg-teal-100 dark:bg-teal-900 text-teal-800 dark:text-teal-200 border-teal-200 dark:border-teal-700';
      default: return 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 border-gray-200 dark:border-gray-600';
    }
  };

  const InfoCard = ({ icon: Icon, label, value, className = "" }: { icon: any, label: string, value: string | null | undefined, className?: string }) => {
    if (!value) return null;
    
    return (
      <div className={`group relative bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 hover:shadow-md transition-all duration-200 hover:border-gray-300 dark:hover:border-gray-600 ${className}`}>
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900 dark:to-indigo-900 rounded-lg flex items-center justify-center group-hover:from-blue-100 group-hover:to-indigo-100 dark:group-hover:from-blue-800 dark:group-hover:to-indigo-800 transition-colors">
              <Icon className="w-5 h-5 text-blue-600" />
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">{label}</p>
            <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 break-words leading-relaxed">{value}</p>
          </div>
        </div>
      </div>
    );
  };

  const SectionTitle = ({ icon: Icon, children }: { icon: any, children: React.ReactNode }) => (
    <div className="flex items-center space-x-3 mb-6">
      <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
        <Icon className="w-4 h-4 text-white" />
      </div>
      <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">{children}</h3>
    </div>
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="">
      <div className="max-w-4xl mx-auto">
        {/* Header con información principal */}
        <div className="bg-gradient-to-r from-fuchsia-300 to-indigo-700 rounded-2xl p-6 mb-8 text-white">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                <User className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-2">{cliente.nombre}</h2>
                <div className="flex items-center space-x-3">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getTipoColor(cliente.tipo_cliente)} bg-white/90`}>
                    <Building className="w-3 h-3 mr-1" />
                    {getTipoClienteLabel(cliente.tipo_cliente)}
                  </span>
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getFrecuenciaColor(cliente.frecuencia)} bg-white/90`}>
                    <Star className="w-3 h-3 mr-1" />
                    {getFrecuenciaLabel(cliente.frecuencia)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          {/* Información de contacto */}
          <div>
            <SectionTitle icon={Phone}>Información de Contacto</SectionTitle>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <InfoCard icon={Phone} label="Teléfono" value={cliente.telefono} />
              <InfoCard icon={Mail} label="Email" value={cliente.email} />
              <InfoCard icon={MapPin} label="Dirección" value={cliente.direccion} className="md:col-span-2 lg:col-span-1" />
            </div>
          </div>

          {/* Información adicional */}
          {cliente.observaciones && (
            <div>
              <SectionTitle icon={FileText}>Información Adicional</SectionTitle>
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6">
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900 dark:to-orange-900 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FileText className="w-5 h-5 text-amber-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">Observaciones</p>
                    <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">{cliente.observaciones}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Fechas */}
          <div>
            <SectionTitle icon={Clock}>Información Temporal</SectionTitle>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InfoCard 
                icon={Calendar} 
                label="Fecha de registro" 
                value={cliente.created_at ? new Date(cliente.created_at).toLocaleDateString('es-ES', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                }) : null} 
              />
              <InfoCard 
                icon={Calendar} 
                label="Última actualización" 
                value={cliente.updated_at ? new Date(cliente.updated_at).toLocaleDateString('es-ES', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                }) : null} 
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="px-6 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors"
          >
            Cerrar
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ClienteViewModal;