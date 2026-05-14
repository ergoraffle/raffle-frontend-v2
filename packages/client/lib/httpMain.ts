import type { AxiosInstance, AxiosRequestConfig } from 'axios';
import axios from 'axios';

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
export const httpClient = <T>(config: AxiosRequestConfig): Promise<T> =>
  axiosInstance.request<T>(config).then((res) => res.data);
