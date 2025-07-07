
import React, { useState, useEffect } from 'react';
import Modal from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { EquipoAudio, EquipoAudioCreateInput, EquipoAudioUpdateInput } from '@/types';
import { equipoAudioService } from '@/services';

interface EquipoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  equipo?: EquipoAudio | null;
}

const EquipoModal: React.FC<EquipoModalProps> = ({ isOpen, onClose, onSuccess, equipo }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<Omit<EquipoAudioCreateInput, 'imagen'> & { imagen: File | string | null }>({
    nombre: '',
    marca: '',
    modelo: '',
    numero_serie: '',
    tipo: 'altavoces',
    estado: 'disponible',
    precio_compra: null,
    fecha_compra: null,
    garantia_hasta: null,
    ubicacion: '',
    observaciones: '',
    descripcion: '',
    numero_bocinas: null,
    imagen: null,
  });

  useEffect(() => {
    if (equipo) {
      setFormData({
        nombre: equipo.nombre || '',
        marca: equipo.marca || '',
        modelo: equipo.modelo || '',
        numero_serie: equipo.numero_serie || '',
        tipo: equipo.tipo || 'altavoces',
        estado: equipo.estado || 'disponible',
        precio_compra: equipo.precio_compra || null,
        fecha_compra: equipo.fecha_compra || null,
        garantia_hasta: equipo.garantia_hasta || null,
        ubicacion: equipo.ubicacion || '',
        observaciones: equipo.observaciones || '',
        descripcion: equipo.descripcion || '',
        numero_bocinas: equipo.numero_bocinas || null,
        imagen: equipo.imagen || null,
      });
    } else {
      setFormData({
        nombre: '',
        marca: '',
        modelo: '',
        numero_serie: '',
        tipo: 'altavoces',
        estado: 'disponible',
        precio_compra: null,
        fecha_compra: null,
        garantia_hasta: null,
        ubicacion: '',
        observaciones: '',
        descripcion: '',
        numero_bocinas: null,
        imagen: null,
      });
    }
    setError(null);
  }, [equipo, isOpen]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? parseFloat(value) || 0 : value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData(prev => ({
      ...prev,
      imagen: file
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.nombre.trim()) {
      setError('El nombre es obligatorio');
      return;
    }

    if (!formData.marca.trim()) {
      setError('La marca es obligatoria');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Create FormData for file upload
      const submitData = new FormData();

      // Add all form fields
      Object.entries(formData).forEach(([key, value]) => {
        if (key === 'imagen' && value instanceof File) {
          submitData.append(key, value);
        } else if (key !== 'imagen' && value !== null && value !== undefined) {
          submitData.append(key, value.toString());
        }
      });

      if (equipo) {
        await equipoAudioService.update(equipo.id, submitData as unknown as EquipoAudioUpdateInput);
      } else {
        await equipoAudioService.create(submitData as unknown as EquipoAudioCreateInput);
      }
      onSuccess();
      onClose();
    } catch (err: any) {
      setError(err.message || 'Error al guardar el equipo');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={equipo ? 'Editar Equipo' : 'Nuevo Equipo'}
      size="lg"
    >
      {error && (
        <div className="mb-4 p-4 bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-700 rounded-md">
          <p className="text-red-600 dark:text-red-200">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Información básica */}
        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">Información Básica</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Nombre *
              </label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                value={formData.nombre}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              />
            </div>

            <div>
              <label htmlFor="tipo" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Tipo de Equipo
              </label>
              <select
                id="tipo"
                name="tipo"
                value={formData.tipo}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              >
                <option value="altavoces">Altavoces</option>
                <option value="microfonos">Micrófonos</option>
                <option value="mezcladores">Mezcladores</option>
                <option value="amplificadores">Amplificadores</option>
                <option value="instrumentos">Instrumentos</option>
                <option value="iluminacion">Iluminación</option>
                <option value="cables">Cables</option>
                <option value="soportes">Soportes</option>
                <option value="otros">Otros</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <label htmlFor="marca" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Marca *
              </label>
              <input
                type="text"
                id="marca"
                name="marca"
                value={formData.marca}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              />
            </div>

            <div>
              <label htmlFor="modelo" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Modelo
              </label>
              <input
                type="text"
                id="modelo"
                name="modelo"
                value={formData.modelo}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <label htmlFor="numero_serie" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Número de Serie
              </label>
              <input
                type="text"
                id="numero_serie"
                name="numero_serie"
                value={formData.numero_serie}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
              />
            </div>

            <div>
              <label htmlFor="estado" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Estado
              </label>
              <select
                id="estado"
                name="estado"
                value={formData.estado}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
              >
                <option value="disponible">Disponible</option>
                <option value="en_uso">En Uso</option>
                <option value="mantenimiento">Mantenimiento</option>
                <option value="averiado">Averiado</option>
                <option value="vendido">Vendido</option>
              </select>
            </div>
          </div>
        </div>

        {/* Información de compra */}
        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">Información de Compra</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="precio_compra" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Precio de Compra (€)
              </label>
              <input
                type="number"
                id="precio_compra"
                name="precio_compra"
                value={formData.precio_compra || 0}
                onChange={handleInputChange}
                min="0"
                step="0.01"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
              />
            </div>

            <div>
              <label htmlFor="fecha_compra" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Fecha de Compra
              </label>
              <input
                type="date"
                id="fecha_compra"
                name="fecha_compra"
                value={formData.fecha_compra || ''}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
              />
            </div>
          </div>

          <div className="mt-4">
            <label htmlFor="garantia_hasta" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Garantía Hasta
            </label>
            <input
              type="date"
              id="garantia_hasta"
              name="garantia_hasta"
              value={formData.garantia_hasta || ''}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
            />
          </div>
        </div>

        {/* Ubicación y documentación */}
        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">Ubicación y Documentación</h3>

          <div className="mb-4">
            <label htmlFor="ubicacion" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Ubicación
            </label>
            <input
              type="text"
              id="ubicacion"
              name="ubicacion"
              value={formData.ubicacion}
              onChange={handleInputChange}
              placeholder="Almacén, estudio, etc."
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="imagen" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Imagen del Equipo
            </label>
            <input
              type="file"
              id="imagen"
              name="imagen"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 dark:file:bg-blue-900 dark:file:text-blue-200 dark:hover:file:bg-blue-800"
            />
            {formData.imagen && (
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Archivo seleccionado: {formData.imagen instanceof File ? formData.imagen.name : 'Sin archivo seleccionado'}
              </p>
            )}
            {equipo?.imagen && !formData.imagen && (
              <div className="mt-2">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Imagen actual:</p>
                <img
                  src={equipo.imagen}
                  alt="Imagen del equipo"
                  className="w-32 h-32 object-cover rounded-md border border-gray-300 dark:border-gray-600"
                />
              </div>
            )}
          </div>
        </div>

        {/* Observaciones */}
        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">Observaciones</h3>
          <textarea
            id="observaciones"
            name="observaciones"
            value={formData.observaciones}
            onChange={handleInputChange}
            rows={3}
            placeholder="Observaciones adicionales"
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
          />
        </div>

        {/* Botones */}
        <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200 dark:border-gray-600">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            disabled={loading}
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            disabled={loading}
          >
            {loading ? 'Guardando...' : (equipo ? 'Actualizar' : 'Crear')} Equipo
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default EquipoModal;