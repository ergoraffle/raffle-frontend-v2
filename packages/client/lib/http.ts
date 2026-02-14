import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

let axiosInstance: AxiosInstance = axios.create();

/**
 * Allow consumer app to configure the client
 */
export const configureClient = (config: { baseURL?: string; }) => {
  axiosInstance = axios.create({
    baseURL: config.baseURL,
  });
}

/**
 * Orval will use this for all requests
 */
export const httpClient = <T>(config: AxiosRequestConfig): Promise<T> =>
  axiosInstance.request<T>(config).then((res) => res.data)
