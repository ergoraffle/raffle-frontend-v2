import { toast as sonnerToast } from 'sonner';

export type ToastFunction = {
  (message: string): void;
  success: (message: string) => void;
  error: (message: string) => void;
  warning: (message: string) => void;
  loading: (message: string) => void;
  info: (message: string) => void;
};

export const toast: ToastFunction = Object.assign((message: string) => sonnerToast(message), {
  success: (message: string) => sonnerToast.success(message),
  error: (message: string) => sonnerToast.error(message),
  warning: (message: string) => sonnerToast.warning(message),
  loading: (message: string) => sonnerToast.loading(message),
  info: (message: string) => sonnerToast(message)
});
