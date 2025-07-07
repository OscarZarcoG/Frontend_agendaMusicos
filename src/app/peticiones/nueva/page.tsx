'use client';

import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function NuevaPeticionPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    cancion: '',
    artista: '',
    cliente: '',
    evento: '',
    fecha_evento: '',
    prioridad: '',
    estado: 'pendiente',
    momento_evento: '',
    observaciones: '',
    contacto_cliente: '',
    telefono_cliente: '',
    email_cliente: '',
    precio_extra: '',
    tiempo_preparacion: '',
    dificultad: '',
    en_repertorio: false
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({
        ...prev,
        [name]: checked
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implementar envío al backend
    console.log('Datos de la petición:', formData);
    // Simular envío exitoso
    alert('Petición registrada exitosamente');
    router.push('/peticiones');
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="md:flex md:items-center md:justify-between">
          <div className="flex-1 min-w-0">
            <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
              Nueva Petición Musical
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Registra una nueva petición de canción de un cliente
            </p>
          </div>
          <div className="mt-4 flex md:mt-0 md:ml-4">
            <Link href="/peticiones">
              <Button variant="outline">
                Volver a Peticiones
              </Button>
            </Link>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Información de la Canción */}
          <Card>
            <CardHeader>
              <CardTitle>Información de la Canción</CardTitle>
              <CardDescription>
                Datos de la canción solicitada
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Input
                  label="Canción *"
                  name="cancion"
                  value={formData.cancion}
                  onChange={handleInputChange}
                  placeholder="Título de la canción"
                  required
                />
                <Input
                  label="Artista *"
                  name="artista"
                  value={formData.artista}
                  onChange={handleInputChange}
                  placeholder="Intérprete original"
                  required
                />
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Dificultad
                  </label>
                  <select
                    name="dificultad"
                    value={formData.dificultad}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Evaluar dificultad</option>
                    <option value="facil">Fácil</option>
                    <option value="intermedio">Intermedio</option>
                    <option value="dificil">Difícil</option>
                    <option value="muy_dificil">Muy Difícil</option>
                  </select>
                </div>
                <div className="flex items-center pt-6">
                  <input
                    type="checkbox"
                    name="en_repertorio"
                    checked={formData.en_repertorio}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label className="ml-2 block text-sm text-gray-900">
                    Ya está en nuestro repertorio
                  </label>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Información del Cliente y Evento */}
          <Card>
            <CardHeader>
              <CardTitle>Cliente y Evento</CardTitle>
              <CardDescription>
                Información sobre el cliente y el evento
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Input
                  label="Cliente *"
                  name="cliente"
                  value={formData.cliente}
                  onChange={handleInputChange}
                  placeholder="Nombre del cliente"
                  required
                />
                <Input
                  label="Evento"
                  name="evento"
                  value={formData.evento}
                  onChange={handleInputChange}
                  placeholder="Nombre o tipo de evento"
                />
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Input
                  label="Fecha del Evento"
                  name="fecha_evento"
                  type="date"
                  value={formData.fecha_evento}
                  onChange={handleInputChange}
                />
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Momento del Evento
                  </label>
                  <select
                    name="momento_evento"
                    value={formData.momento_evento}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Seleccionar momento</option>
                    <option value="apertura">Apertura</option>
                    <option value="primer_set">Primer Set</option>
                    <option value="segundo_set">Segundo Set</option>
                    <option value="tercer_set">Tercer Set</option>
                    <option value="cierre">Cierre</option>
                    <option value="bis">Bis/Encore</option>
                    <option value="cualquier_momento">Cualquier Momento</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Información de Contacto */}
          <Card>
            <CardHeader>
              <CardTitle>Contacto del Cliente</CardTitle>
              <CardDescription>
                Datos de contacto para coordinar la petición
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <Input
                  label="Persona de Contacto"
                  name="contacto_cliente"
                  value={formData.contacto_cliente}
                  onChange={handleInputChange}
                  placeholder="Nombre del contacto"
                />
                <Input
                  label="Teléfono"
                  name="telefono_cliente"
                  type="tel"
                  value={formData.telefono_cliente}
                  onChange={handleInputChange}
                  placeholder="+34 600 000 000"
                />
                <Input
                  label="Email"
                  name="email_cliente"
                  type="email"
                  value={formData.email_cliente}
                  onChange={handleInputChange}
                  placeholder="cliente@email.com"
                />
              </div>
            </CardContent>
          </Card>

          {/* Gestión de la Petición */}
          <Card>
            <CardHeader>
              <CardTitle>Gestión de la Petición</CardTitle>
              <CardDescription>
                Estado y prioridad de la petición
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Prioridad *
                  </label>
                  <select
                    name="prioridad"
                    value={formData.prioridad}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Seleccionar prioridad</option>
                    <option value="baja">Baja</option>
                    <option value="media">Media</option>
                    <option value="alta">Alta</option>
                    <option value="urgente">Urgente</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Estado
                  </label>
                  <select
                    name="estado"
                    value={formData.estado}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="pendiente">Pendiente</option>
                    <option value="aprobada">Aprobada</option>
                    <option value="rechazada">Rechazada</option>
                    <option value="en_preparacion">En Preparación</option>
                    <option value="lista">Lista</option>
                  </select>
                </div>
                <Input
                  label="Tiempo de Preparación"
                  name="tiempo_preparacion"
                  value={formData.tiempo_preparacion}
                  onChange={handleInputChange}
                  placeholder="2 días"
                  helperText="Tiempo estimado para preparar"
                />
              </div>
            </CardContent>
          </Card>

          {/* Información Económica */}
          <Card>
            <CardHeader>
              <CardTitle>Información Económica</CardTitle>
              <CardDescription>
                Costos adicionales por la petición especial
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Input
                  label="Precio Extra"
                  name="precio_extra"
                  type="number"
                  step="0.01"
                  value={formData.precio_extra}
                  onChange={handleInputChange}
                  placeholder="0.00"
                  helperText="Costo adicional en euros (€)"
                />
                <div className="flex items-center pt-6">
                  <svg className="mr-2 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-sm text-gray-600">
                    Deja en 0 si no hay costo adicional
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Observaciones */}
          <Card>
            <CardHeader>
              <CardTitle>Observaciones</CardTitle>
              <CardDescription>
                Notas adicionales sobre la petición
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div>
                <textarea
                  name="observaciones"
                  value={formData.observaciones}
                  onChange={handleInputChange}
                  rows={4}
                  placeholder="Notas especiales, arreglos específicos, momento exacto para tocar, etc."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </CardContent>
          </Card>

          {/* Botones de Acción */}
          <div className="flex justify-end space-x-3">
            <Link href="/peticiones">
              <Button variant="outline">
                Cancelar
              </Button>
            </Link>
            <Button type="submit">
              Registrar Petición
            </Button>
          </div>
        </form>
      </div>
    </Layout>
  );
}