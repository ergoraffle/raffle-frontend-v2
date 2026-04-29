import type { ReactNode } from 'react';

import { toast as sonnerToast } from 'sonner';

export type ToastFunction = {
  (message: string | ReactNode): void;
  success: (message: string | ReactNode) => void;
  error: (message: string | ReactNode) => void;
  warning: (message: string | ReactNode) => void;
  loading: (message: string | ReactNode) => void;
  info: (message: string | ReactNode) => void;
};

export const toast: ToastFunction = Object.assign(
  (message: string | ReactNode) => sonnerToast(message),
  {
    success: (message: string | ReactNode) => sonnerToast.success(message),
    error: (message: string | ReactNode) => sonnerToast.error(message),
    warning: (message: string | ReactNode) => sonnerToast.warning(message),
    loading: (message: string | ReactNode) => sonnerToast.loading(message),
    info: (message: string | ReactNode) => sonnerToast(message)
  }
);
