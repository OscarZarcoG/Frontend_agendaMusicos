import { BaseService } from './base';
import {
  Cliente,
  ClienteCreateInput,
  ClienteUpdateInput,
  Contrato,
  ContratoCreateInput,
  ContratoUpdateInput,
  EquipoAudio,
  EquipoAudioCreateInput,
  EquipoAudioUpdateInput,
  Catering,
  Peticion,
  Repertorio,
  FotosEvento,
} from '@/types';
import api from '@/lib/api';

// Cliente Service
export class ClienteService extends BaseService<Cliente, ClienteCreateInput, ClienteUpdateInput> {
  endpoint: any;
  constructor() {
    super('/agenda/clientes/');
  }

  async searchByName(name: string): Promise<Cliente[]> {
    const response = await api.get(`${this.endpoint}?search=${encodeURIComponent(name)}`);
    return response.data.results || response.data;
  }
}

// Contrato Service
export class ContratoService extends BaseService<Contrato, ContratoCreateInput, ContratoUpdateInput> {
  endpoint: any;
  constructor() {
    super('/agenda/contratos/');
  }

  async getByDateRange(startDate: string, endDate: string): Promise<Contrato[]> {
    const response = await api.get(`${this.endpoint}?fecha_evento__gte=${startDate}&fecha_evento__lte=${endDate}`);
    return response.data.results || response.data;
  }

  async getByStatus(status: string): Promise<Contrato[]> {
    const response = await api.get(`${this.endpoint}?estado_evento=${status}`);
    return response.data.results || response.data;
  }

  async validateScheduleConflict(data: { 
    fecha_evento: string; 
    hora_inicio: string; 
    hora_final: string; 
    id?: number 
  }): Promise<{ valid: boolean; message?: string }> {
    try {
      const response = await api.post(`${this.endpoint}validate-schedule/`, data);
      return { valid: true };
    } catch (error: any) {
      return {
        valid: false,
        message: error.message || 'Conflicto de horarios detectado'
      };
    }
  }

  async generateContract(id: number): Promise<Blob> {
    const response = await api.get(`${this.endpoint}${id}/generate-pdf/`, {
      responseType: 'blob'
    });
    return response.data;
  }
}

// Equipo Audio Service
export class EquipoAudioService extends BaseService<EquipoAudio, EquipoAudioCreateInput, EquipoAudioUpdateInput> {
  endpoint: any;
  constructor() {
    super('/agenda/equipos-audio/');
  }

  async getAvailable(): Promise<EquipoAudio[]> {
    const response = await api.get(`${this.endpoint}?estado=disponible`);
    return response.data.results || response.data;
  }

  async uploadWithImage(data: EquipoAudioCreateInput): Promise<EquipoAudio> {
    const formData = new FormData();
    
    // Agregar todos los campos al FormData
    Object.entries(data).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
         if (key === 'imagen' && value !== null && typeof value === 'object' && 'name' in value) {
          formData.append(key, value);
        } else {
          formData.append(key, String(value));
        }
      }
    });

    const response = await api.post(this.endpoint, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  }
}

// Catering Service
export class CateringService extends BaseService<Catering> {
  constructor() {
    super('/agenda/catering/');
  }
}

// Peticion Service
export class PeticionService extends BaseService<Peticion> {
  constructor() {
    super('/agenda/peticiones/');
  }

  async searchBySong(song: string): Promise<Peticion[]> {
    const response = await api.get(`${this.endpoint}?search=${encodeURIComponent(song)}`);
    return response.data.results || response.data;
  }
}

// Repertorio Service
export class RepertorioService extends BaseService<Repertorio> {
  constructor() {
    super('/agenda/repertorio/');
  }

  async searchBySong(song: string): Promise<Repertorio[]> {
    const response = await api.get(`${this.endpoint}?search=${encodeURIComponent(song)}`);
    return response.data.results || response.data;
  }
}

// Fotos Evento Service
export class FotosEventoService extends BaseService<FotosEvento> {
  constructor() {
    super('/agenda/fotos-evento/');
  }

  async uploadPhoto(file: File, data: { nombre_foto: string; fecha_foto: string }): Promise<FotosEvento> {
    const formData = new FormData();
    formData.append('foto', file);
    formData.append('nombre_foto', data.nombre_foto);
    formData.append('fecha_foto', data.fecha_foto);

    const response = await api.post(this.endpoint, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  }
}

// Service instances
export const clienteService = new ClienteService();
export const contratoService = new ContratoService();
export const equipoAudioService = new EquipoAudioService();
export const cateringService = new CateringService();
export const peticionService = new PeticionService();
export const repertorioService = new RepertorioService();
export const fotosEventoService = new FotosEventoService();

// Export all services as default
export default {
  cliente: clienteService,
  contrato: contratoService,
  equipoAudio: equipoAudioService,
  catering: cateringService,
  peticion: peticionService,
  repertorio: repertorioService,
  fotosEvento: fotosEventoService,
};