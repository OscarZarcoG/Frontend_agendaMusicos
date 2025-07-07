'use client';

import { useState, useEffect, useCallback } from 'react';
import { ApiError, PaginatedResponse } from '@/types';
import { BaseService } from '@/services/base';

// Generic hook for API calls
export function useApi<T>() {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ApiError | null>(null);

  const execute = useCallback(async (apiCall: () => Promise<T>) => {
    setLoading(true);
    setError(null);
    try {
      const result = await apiCall();
      setData(result);
      return result;
    } catch (err: any) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setData(null);
    setError(null);
    setLoading(false);
  }, []);

  return { data, loading, error, execute, reset };
}


// Hook for paginated API calls
export function usePaginatedApi<T>(service: BaseService<T>, initialParams?: Record<string, any>) {
  const [data, setData] = useState<T[]>([]);
  const [pagination, setPagination] = useState<{
    count: number;
    next: string | null;
    previous: string | null;
    currentPage: number;
    totalPages: number;
  }>({ count: 0, next: null, previous: null, currentPage: 1, totalPages: 1 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ApiError | null>(null);
  const [params, setParams] = useState(initialParams || {});

  const fetchData = useCallback(async (page: number = 1, newParams?: Record<string, any>) => {
    setLoading(true);
    setError(null);
    try {
      const queryParams = { ...params, ...newParams, page };
      const response: PaginatedResponse<T> = await service.getPaginated(queryParams);

      setData(response.results);
      const totalPages = Math.ceil(response.count / ((queryParams as { page_size?: number }).page_size || 20)); setPagination({
        count: response.count,
        next: response.next,
        previous: response.previous,
        currentPage: page,
        totalPages,
      });
    } catch (err: any) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [service, params]);

  const updateParams = useCallback((newParams: Record<string, any>) => {
    setParams(prev => ({ ...prev, ...newParams }));
  }, []);

  const nextPage = useCallback(() => {
    if (pagination.next) {
      fetchData(pagination.currentPage + 1);
    }
  }, [fetchData, pagination]);

  const previousPage = useCallback(() => {
    if (pagination.previous) {
      fetchData(pagination.currentPage - 1);
    }
  }, [fetchData, pagination]);

  const goToPage = useCallback((page: number) => {
    fetchData(page);
  }, [fetchData]);

  const refresh = useCallback(() => {
    fetchData(pagination.currentPage);
  }, [fetchData, pagination.currentPage]);

  useEffect(() => {
    fetchData(1);
  }, [params]);

  return {
    data,
    pagination,
    loading,
    error,
    fetchData,
    updateParams,
    nextPage,
    previousPage,
    goToPage,
    refresh,
  };
}

// Hook for CRUD operations
export function useCrud<T, TForm = Partial<T>>(service: BaseService<T, TForm>) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ApiError | null>(null);

  const create = useCallback(async (data: TForm): Promise<T> => {
    setLoading(true);
    setError(null);
    try {
      const result = await service.create(data);
      return result;
    } catch (err: any) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [service]);

  const update = useCallback(async (id: number, data: Partial<TForm>): Promise<T> => {
    setLoading(true);
    setError(null);
    try {
      const result = await service.update(id, data);
      return result;
    } catch (err: any) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [service]);

  const remove = useCallback(async (id: number): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      await service.delete(id);
    } catch (err: any) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [service]);

  const restore = useCallback(async (id: number): Promise<T> => {
    setLoading(true);
    setError(null);
    try {
      const result = await service.restore(id);
      return result;
    } catch (err: any) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [service]);

  return {
    loading,
    error,
    create,
    update,
    remove,
    restore,
  };
}

// Hook for fetching single item
export function useFetch<T>(service: BaseService<T>, id?: number) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ApiError | null>(null);

  const fetchItem = useCallback(async (itemId: number) => {
    setLoading(true);
    setError(null);
    try {
      const result = await service.getById(itemId);
      setData(result);
      return result;
    } catch (err: any) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [service]);

  useEffect(() => {
    if (id) {
      fetchItem(id);
    }
  }, [id, fetchItem]);

  return {
    data,
    loading,
    error,
    fetchItem,
    refetch: () => id && fetchItem(id),
  };
}