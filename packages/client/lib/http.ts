import type { AxiosInstance, AxiosRequestConfig } from 'axios';
import axios from 'axios';

let axiosInstance: AxiosInstance = axios.create();

/**
 * Allow consumer app to configure the client
 */
export const configureClient = (config: { baseURL?: string }) => {
  axiosInstance = axios.create({
    baseURL: config.baseURL,
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
    },
  });
};

/**
 * Orval will use this for all requests
 */
export const httpClient = <T>(config: AxiosRequestConfig): Promise<T> =>
  axiosInstance.request<T>(config).then((res) => res.data);
