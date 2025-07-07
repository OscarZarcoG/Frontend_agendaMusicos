'use client';

import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function NuevaCancionPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    titulo: '',
    artista: '',
    genero: '',
    duracion: '',
    dificultad: '',
    tonalidad: '',
    tempo: '',
    letra: '',
    acordes: '',
    notas: '',
    archivo_audio: null,
    archivo_partitura: null
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      setFormData(prev => ({
        ...prev,
        [name]: files[0]
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implementar envío al backend
    console.log('Datos de la canción:', formData);
    // Simular envío exitoso
    alert('Canción agregada al repertorio exitosamente');
    router.push('/repertorio');
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="md:flex md:items-center md:justify-between">
          <div className="flex-1 min-w-0">
            <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
              Nueva Canción
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Agrega una nueva canción a tu repertorio musical
            </p>
          </div>
          <div className="mt-4 flex md:mt-0 md:ml-4">
            <Link href="/repertorio">
              <Button variant="outline">
                Volver al Repertorio
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
                Datos principales de la canción
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Input
                  label="Título *"
                  name="titulo"
                  value={formData.titulo}
                  onChange={handleInputChange}
                  placeholder="Nombre de la canción"
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
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Género *
                  </label>
                  <select
                    name="genero"
                    value={formData.genero}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Seleccionar género</option>
                    <option value="rock">Rock</option>
                    <option value="pop">Pop</option>
                    <option value="jazz">Jazz</option>
                    <option value="blues">Blues</option>
                    <option value="clasica">Clásica</option>
                    <option value="folk">Folk</option>
                    <option value="reggae">Reggae</option>
                    <option value="country">Country</option>
                    <option value="latina">Latina</option>
                    <option value="otros">Otros</option>
                  </select>
                </div>
                <Input
                  label="Duración"
                  name="duracion"
                  value={formData.duracion}
                  onChange={handleInputChange}
                  placeholder="3:45"
                  helperText="Formato: mm:ss"
                />
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
                    <option value="">Seleccionar dificultad</option>
                    <option value="facil">Fácil</option>
                    <option value="intermedio">Intermedio</option>
                    <option value="dificil">Difícil</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Información Musical */}
          <Card>
            <CardHeader>
              <CardTitle>Información Musical</CardTitle>
              <CardDescription>
                Detalles técnicos de la canción
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Input
                  label="Tonalidad"
                  name="tonalidad"
                  value={formData.tonalidad}
                  onChange={handleInputChange}
                  placeholder="C, Am, F#, etc."
                  helperText="Tonalidad principal"
                />
                <Input
                  label="Tempo (BPM)"
                  name="tempo"
                  type="number"
                  value={formData.tempo}
                  onChange={handleInputChange}
                  placeholder="120"
                  helperText="Beats por minuto"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Acordes
                </label>
                <textarea
                  name="acordes"
                  value={formData.acordes}
                  onChange={handleInputChange}
                  rows={4}
                  placeholder="C - Am - F - G\nVerse: C Am F G\nChorus: F G Am C"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <p className="mt-1 text-sm text-gray-500">
                  Progresión de acordes y estructura
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Letra */}
          <Card>
            <CardHeader>
              <CardTitle>Letra</CardTitle>
              <CardDescription>
                Letra completa de la canción
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div>
                <textarea
                  name="letra"
                  value={formData.letra}
                  onChange={handleInputChange}
                  rows={8}
                  placeholder="Verse 1:\nEscribe aquí la letra de la canción...\n\nChorus:\nEstribillo de la canción..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <p className="mt-1 text-sm text-gray-500">
                  Incluye la estructura: versos, coros, puentes, etc.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Archivos */}
          <Card>
            <CardHeader>
              <CardTitle>Archivos</CardTitle>
              <CardDescription>
                Sube archivos de audio y partituras
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Archivo de Audio
                  </label>
                  <input
                    type="file"
                    name="archivo_audio"
                    onChange={handleFileChange}
                    accept=".mp3,.wav,.m4a,.ogg"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <p className="mt-1 text-sm text-gray-500">
                    Formatos: MP3, WAV, M4A, OGG
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Partitura/Tablatura
                  </label>
                  <input
                    type="file"
                    name="archivo_partitura"
                    onChange={handleFileChange}
                    accept=".pdf,.jpg,.jpeg,.png,.gif"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <p className="mt-1 text-sm text-gray-500">
                    Formatos: PDF, JPG, PNG, GIF
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Notas */}
          <Card>
            <CardHeader>
              <CardTitle>Notas y Observaciones</CardTitle>
              <CardDescription>
                Información adicional sobre la canción
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div>
                <textarea
                  name="notas"
                  value={formData.notas}
                  onChange={handleInputChange}
                  rows={4}
                  placeholder="Notas sobre arreglos, instrumentación, consejos de interpretación, etc."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </CardContent>
          </Card>

          {/* Botones de Acción */}
          <div className="flex justify-end space-x-3">
            <Link href="/repertorio">
              <Button variant="outline">
                Cancelar
              </Button>
            </Link>
            <Button type="submit">
              Guardar Canción
            </Button>
          </div>
        </form>
      </div>
    </Layout>
  );
}