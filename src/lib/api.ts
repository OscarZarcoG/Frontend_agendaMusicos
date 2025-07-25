import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { ApiError } from '@/types';


const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';
const API_TIMEOUT = parseInt(process.env.NEXT_PUBLIC_API_TIMEOUT || '10000');

const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('authToken');
      if (token) {
        config.headers.Authorization = `Token ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('authToken');
        localStorage.removeItem('authUser');
        // Redirect to login if not already there
        if (!window.location.pathname.includes('/auth/')) {
          window.location.href = '/auth/login';
        }
      }
    }
    
    const apiError = handleApiError(error);
    return Promise.reject(apiError);
  }
);

export default api;

// Helper functions
export const handleApiError = (error: any): ApiError => {
  const apiError: ApiError = {
    message: 'Error de conexión',
    status: 0,
    errors: {},
  };

  if (error.response) {
    // Error del servidor (4xx, 5xx)
    apiError.status = error.response.status;
    
    if (error.response.data) {
      if (typeof error.response.data === 'string') {
        apiError.message = error.response.data;
      } else if (error.response.data.detail) {
        apiError.message = error.response.data.detail;
      } else if (error.response.data.message) {
        apiError.message = error.response.data.message;
      } else {
        apiError.message = 'Error de validación';
        apiError.errors = error.response.data;
      }
    } else {
      apiError.message = 'Error del servidor';
    }
  } else if (error.request) {
    apiError.message = 'Error de conexión. Verifica que el servidor esté funcionando.';
    apiError.status = 0;
  } else if (error.message) {
    apiError.message = error.message;
    apiError.status = 0;
  }

  return apiError;
};

export const isApiError = (error: any): error is ApiError => {
  return error && 
         typeof error.message === 'string' && 
         typeof error.status === 'number';
};