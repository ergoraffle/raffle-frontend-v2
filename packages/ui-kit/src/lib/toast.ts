import type { ReactNode } from 'react';

import { toast as sonnerToast } from 'sonner';

import { type CustomToastOptions, customToast } from '../components/Toaster';

export type ToastFunction = {
  (message: string | ReactNode): void;
  success: (message: string | ReactNode, options?: CustomToastOptions) => void;
  error: (message: string | ReactNode, options?: CustomToastOptions) => void;
  warning: (message: string | ReactNode, options?: CustomToastOptions) => void;
  loading: (message: string | ReactNode, options?: CustomToastOptions) => void;
  info: (message: string | ReactNode, options?: CustomToastOptions) => void;
};

export const toast: ToastFunction = Object.assign(
  (message: string | ReactNode) => sonnerToast(message),
  {
    success: (message: string | ReactNode, options?: CustomToastOptions) =>
      customToast(message, { variant: 'success', ...options }),
    error: (message: string | ReactNode, options?: CustomToastOptions) =>
      customToast(message, { variant: 'error', ...options }),
    warning: (message: string | ReactNode, options?: CustomToastOptions) =>
      customToast(message, { variant: 'warning', ...options }),
    loading: (message: string | ReactNode, options?: CustomToastOptions) =>
      customToast(message, { variant: 'loading', ...options }),
    info: (message: string | ReactNode, options?: CustomToastOptions) =>
      customToast(message, { variant: 'info', ...options })
  }
);
