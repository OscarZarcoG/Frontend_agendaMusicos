'use client';

import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function NuevoCateringPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    nombre: '',
    tipo_servicio: '',
    proveedor: '',
    descripcion: '',
    precio_por_persona: '',
    minimo_personas: '',
    maximo_personas: '',
    incluye_servicio: false,
    incluye_vajilla: false,
    incluye_manteleria: false,
    incluye_mobiliario: false,
    tiempo_preparacion: '',
    disponibilidad: '',
    observaciones: '',
    contacto_proveedor: '',
    telefono_proveedor: '',
    email_proveedor: ''
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
    console.log('Datos del servicio de catering:', formData);
    // Simular envío exitoso
    alert('Servicio de catering agregado exitosamente');
    router.push('/catering');
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="md:flex md:items-center md:justify-between">
          <div className="flex-1 min-w-0">
            <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
              Nuevo Servicio de Catering
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Agrega un nuevo servicio de catering para eventos
            </p>
          </div>
          <div className="mt-4 flex md:mt-0 md:ml-4">
            <Link href="/catering">
              <Button variant="outline">
                Volver a Catering
              </Button>
            </Link>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Información Básica */}
          <Card>
            <CardHeader>
              <CardTitle>Información Básica</CardTitle>
              <CardDescription>
                Datos principales del servicio de catering
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Input
                  label="Nombre del Servicio *"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleInputChange}
                  placeholder="Ej: Menú Ejecutivo, Cóctel Premium"
                  required
                />
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tipo de Servicio *
                  </label>
                  <select
                    name="tipo_servicio"
                    value={formData.tipo_servicio}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Seleccionar tipo</option>
                    <option value="desayuno">Desayuno</option>
                    <option value="almuerzo">Almuerzo</option>
                    <option value="cena">Cena</option>
                    <option value="cocktail">Cóctel</option>
                    <option value="aperitivos">Aperitivos</option>
                    <option value="postres">Postres</option>
                    <option value="bebidas">Bebidas</option>
                    <option value="completo">Servicio Completo</option>
                  </select>
                </div>
              </div>
              <Input
                label="Proveedor/Empresa"
                name="proveedor"
                value={formData.proveedor}
                onChange={handleInputChange}
                placeholder="Nombre de la empresa de catering"
              />
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Descripción del Servicio
                </label>
                <textarea
                  name="descripcion"
                  value={formData.descripcion}
                  onChange={handleInputChange}
                  rows={4}
                  placeholder="Describe el menú, tipo de comida, especialidades, etc."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </CardContent>
          </Card>

          {/* Información de Precios y Capacidad */}
          <Card>
            <CardHeader>
              <CardTitle>Precios y Capacidad</CardTitle>
              <CardDescription>
                Información sobre costos y número de personas
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <Input
                  label="Precio por Persona *"
                  name="precio_por_persona"
                  type="number"
                  step="0.01"
                  value={formData.precio_por_persona}
                  onChange={handleInputChange}
                  placeholder="25.00"
                  required
                  helperText="En euros (€)"
                />
                <Input
                  label="Mínimo de Personas"
                  name="minimo_personas"
                  type="number"
                  value={formData.minimo_personas}
                  onChange={handleInputChange}
                  placeholder="10"
                  helperText="Número mínimo"
                />
                <Input
                  label="Máximo de Personas"
                  name="maximo_personas"
                  type="number"
                  value={formData.maximo_personas}
                  onChange={handleInputChange}
                  placeholder="100"
                  helperText="Número máximo"
                />
              </div>
            </CardContent>
          </Card>

          {/* Servicios Incluidos */}
          <Card>
            <CardHeader>
              <CardTitle>Servicios Incluidos</CardTitle>
              <CardDescription>
                Selecciona qué servicios están incluidos en el precio
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="incluye_servicio"
                    checked={formData.incluye_servicio}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label className="ml-2 block text-sm text-gray-900">
                    Personal de servicio
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="incluye_vajilla"
                    checked={formData.incluye_vajilla}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label className="ml-2 block text-sm text-gray-900">
                    Vajilla y cristalería
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="incluye_manteleria"
                    checked={formData.incluye_manteleria}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label className="ml-2 block text-sm text-gray-900">
                    Mantelería
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="incluye_mobiliario"
                    checked={formData.incluye_mobiliario}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label className="ml-2 block text-sm text-gray-900">
                    Mobiliario (mesas, sillas)
                  </label>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Información Operativa */}
          <Card>
            <CardHeader>
              <CardTitle>Información Operativa</CardTitle>
              <CardDescription>
                Detalles sobre tiempos y disponibilidad
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Input
                  label="Tiempo de Preparación"
                  name="tiempo_preparacion"
                  value={formData.tiempo_preparacion}
                  onChange={handleInputChange}
                  placeholder="2 horas"
                  helperText="Tiempo necesario para preparar"
                />
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Disponibilidad
                  </label>
                  <select
                    name="disponibilidad"
                    value={formData.disponibilidad}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Seleccionar disponibilidad</option>
                    <option value="disponible">Disponible</option>
                    <option value="limitado">Disponibilidad Limitada</option>
                    <option value="no_disponible">No Disponible</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Información del Proveedor */}
          <Card>
            <CardHeader>
              <CardTitle>Contacto del Proveedor</CardTitle>
              <CardDescription>
                Información de contacto de la empresa de catering
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <Input
                  label="Persona de Contacto"
                  name="contacto_proveedor"
                  value={formData.contacto_proveedor}
                  onChange={handleInputChange}
                  placeholder="Nombre del responsable"
                />
                <Input
                  label="Teléfono"
                  name="telefono_proveedor"
                  type="tel"
                  value={formData.telefono_proveedor}
                  onChange={handleInputChange}
                  placeholder="+34 600 000 000"
                />
                <Input
                  label="Email"
                  name="email_proveedor"
                  type="email"
                  value={formData.email_proveedor}
                  onChange={handleInputChange}
                  placeholder="contacto@catering.com"
                />
              </div>
            </CardContent>
          </Card>

          {/* Observaciones */}
          <Card>
            <CardHeader>
              <CardTitle>Observaciones</CardTitle>
              <CardDescription>
                Información adicional sobre el servicio
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div>
                <textarea
                  name="observaciones"
                  value={formData.observaciones}
                  onChange={handleInputChange}
                  rows={4}
                  placeholder="Notas especiales, restricciones, condiciones particulares, etc."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </CardContent>
          </Card>

          {/* Botones de Acción */}
          <div className="flex justify-end space-x-3">
            <Link href="/catering">
              <Button variant="outline">
                Cancelar
              </Button>
            </Link>
            <Button type="submit">
              Guardar Servicio
            </Button>
          </div>
        </form>
      </div>
    </Layout>
  );
}