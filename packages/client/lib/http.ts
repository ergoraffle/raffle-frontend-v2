import type { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';
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
    }
  });
};

export class ApiError extends Error {
  status?: number;
  data?: unknown;

  constructor(error: AxiosError) {
    super(error.message);

    this.status = error.response?.status;
    this.data = error.response?.data;
  }
}

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
