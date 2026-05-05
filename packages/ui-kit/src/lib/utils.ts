import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getErrorMessage = (error: unknown, fallback = 'Something went wrong!'): string => {
  if (error === null) return fallback;

  if (typeof error === 'string') return error;

  if (error instanceof Error) {
    const parts: string[] = [];

    if (error.message) {
      parts.push(error.message);
    }

    if (error.cause) {
      parts.push(getErrorMessage(error.cause, fallback));
    }

    return parts.length ? parts.join(' - ') : fallback;
  }

  if (typeof error === 'object' && 'message' in error && typeof error.message === 'string') {
    return error.message;
  }

  try {
    return JSON.stringify(error);
  } catch {
    return fallback;
  }
};
