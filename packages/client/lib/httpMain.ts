import type { AxiosInstance, AxiosRequestConfig } from 'axios';
import axios from 'axios';

import { ApiError } from './types';

const axiosInstance: AxiosInstance = axios.create({
  baseURL: process.env.API_BASE_URL,
  paramsSerializer: (params) => {
    const searchParams = new URLSearchParams();

    Object.entries(params || {}).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((v) => {
          if (v !== undefined && v !== null) {
            searchParams.append(key, String(v));
          }
        });
      } else if (value !== undefined && value !== null) {
        searchParams.append(key, String(value));
      }
    });

    return searchParams.toString();
  }
});

/**
 * Orval will use this for all requests
 */
export const httpClient = async <T>(config: AxiosRequestConfig): Promise<T> => {
  try {
    const { data } = await axiosInstance.request<T>(config);

    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new ApiError(error);
    }

    throw error;
  }
};
