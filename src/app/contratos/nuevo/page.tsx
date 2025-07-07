'use client';

import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import Link from 'next/link';

export default function NuevoContratoPage() {
  const [formData, setFormData] = useState({
    cliente: '',
    evento: '',
    fecha: '',
    hora_inicio: '',
    hora_fin: '',
    lugar: '',
    precio: '',
    anticipo: '',
    estado: 'pendiente',
    observaciones: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Datos del contrato:', formData);
    // Aquí se implementará la lógica para enviar al backend
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="md:flex md:items-center md:justify-between">
          <div className="flex-1 min-w-0">
            <h2 className="text-2xl font-bold leading-7 text-gray-900 dark:text-gray-100 sm:text-3xl sm:truncate">
              Nuevo Contrato
            </h2>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Crea un nuevo contrato para un evento musical
            </p>
          </div>
          <div className="mt-4 flex md:mt-0 md:ml-4">
            <Link href="/contratos">
              <Button variant="outline">
                Volver a Contratos
              </Button>
            </Link>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* Información del Cliente */}
            <Card>
              <CardHeader>
                <CardTitle>Información del Cliente</CardTitle>
                <CardDescription>
                  Datos del cliente que contrata el evento
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input
                  label="Cliente"
                  name="cliente"
                  value={formData.cliente}
                  onChange={handleInputChange}
                  placeholder="Nombre del cliente"
                  required
                />
              </CardContent>
            </Card>

            {/* Información del Evento */}
            <Card>
              <CardHeader>
                <CardTitle>Información del Evento</CardTitle>
                <CardDescription>
                  Detalles específicos del evento musical
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input
                  label="Tipo de Evento"
                  name="evento"
                  value={formData.evento}
                  onChange={handleInputChange}
                  placeholder="Ej: Boda, Cumpleaños, Concierto"
                  required
                />
                <Input
                  label="Lugar"
                  name="lugar"
                  value={formData.lugar}
                  onChange={handleInputChange}
                  placeholder="Dirección del evento"
                  required
                />
              </CardContent>
            </Card>

            {/* Fecha y Hora */}
            <Card>
              <CardHeader>
                <CardTitle>Fecha y Hora</CardTitle>
                <CardDescription>
                  Programación temporal del evento
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input
                  label="Fecha"
                  name="fecha"
                  type="date"
                  value={formData.fecha}
                  onChange={handleInputChange}
                  required
                />
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="Hora de Inicio"
                    name="hora_inicio"
                    type="time"
                    value={formData.hora_inicio}
                    onChange={handleInputChange}
                    required
                  />
                  <Input
                    label="Hora de Fin"
                    name="hora_fin"
                    type="time"
                    value={formData.hora_fin}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </CardContent>
            </Card>

            {/* Información Económica */}
            <Card>
              <CardHeader>
                <CardTitle>Información Económica</CardTitle>
                <CardDescription>
                  Detalles de precios y pagos
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input
                  label="Precio Total"
                  name="precio"
                  type="number"
                  value={formData.precio}
                  onChange={handleInputChange}
                  placeholder="0.00"
                  required
                />
                <Input
                  label="Anticipo"
                  name="anticipo"
                  type="number"
                  value={formData.anticipo}
                  onChange={handleInputChange}
                  placeholder="0.00"
                />
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Estado
                  </label>
                  <select
                    name="estado"
                    value={formData.estado}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                  >
                    <option value="pendiente">Pendiente</option>
                    <option value="confirmado">Confirmado</option>
                    <option value="completado">Completado</option>
                    <option value="cancelado">Cancelado</option>
                  </select>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Observaciones */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Observaciones</CardTitle>
              <CardDescription>
                Notas adicionales sobre el contrato
              </CardDescription>
            </CardHeader>
            <CardContent>
              <textarea
                name="observaciones"
                value={formData.observaciones}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                placeholder="Escribe cualquier observación adicional..."
              />
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex justify-end space-x-4 mt-6">
            <Link href="/contratos">
              <Button variant="outline">
                Cancelar
              </Button>
            </Link>
            <Button type="submit">
              Crear Contrato
            </Button>
          </div>
        </form>
      </div>
    </Layout>
  );
}