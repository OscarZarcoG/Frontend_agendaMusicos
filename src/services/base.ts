import api from '@/lib/api';
import { PaginatedResponse } from '@/types';

export abstract class BaseService<T, TCreate = Partial<T>, TUpdate = Partial<TCreate>> {
  protected endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  async getAll(params?: Record<string, any>): Promise<T[]> {
    const response = await api.get(this.endpoint, { params });
    return response.data;
  }

  async getPaginated(params?: Record<string, any>): Promise<PaginatedResponse<T>> {
    const response = await api.get(this.endpoint, { params });
    return response.data;
  }

  async getById(id: number): Promise<T> {
    const response = await api.get(`${this.endpoint}${id}/`);
    return response.data;
  }

  async create(data: TCreate): Promise<T> {
    const response = await api.post(this.endpoint, data);
    return response.data;
  }

  async update(id: number, data: TUpdate): Promise<T> {
    const response = await api.patch(`${this.endpoint}${id}/`, data);
    return response.data;
  }

  async delete(id: number): Promise<void> {
    await api.delete(`${this.endpoint}${id}/`);
  }

  async restore(id: number): Promise<T> {
    const response = await api.post(`${this.endpoint}${id}/restore/`);
    return response.data;
  }
}