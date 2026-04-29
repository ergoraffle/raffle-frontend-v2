import { TRANSACTIONS_STORAGE_KEY } from '@/constants';

export const toQueryString = (params: Record<string, unknown>): string => {
  const cleanedParams = structuredClone(params);
  const searchParams = new URLSearchParams();

  Object.entries(cleanedParams).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      searchParams.append(key, value.map(String).join(','));
      return;
    }

    if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
      searchParams.append(key, String(value));
    }
  });

  return searchParams.toString();
};

export const formatDateTime = (date: string | Date | number) => {
  const d = new Date(date);
  const today = new Date();

  const isToday = d.toDateString() === today.toDateString();

  if (isToday) {
    return d.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  }

  return d.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });
};

export const formatDuration = (minutes: number) => {
  const units = [
    { label: 'year', value: 60 * 24 * 365 },
    { label: 'month', value: 60 * 24 * 30 },
    { label: 'week', value: 60 * 24 * 7 },
    { label: 'day', value: 60 * 24 },
    { label: 'hour', value: 60 },
    { label: 'minute', value: 1 }
  ];

  for (const unit of units) {
    const amount = Math.floor(minutes / unit.value);
    if (amount >= 1) {
      return `${amount} ${unit.label}${amount > 1 ? 's' : ''}`;
    }
  }

  return '0 minutes';
};

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

export const getNonDecimalString = (value: string, decimals: number) => {
  if (!decimals) return value;

  const decimalPointIndex = value.indexOf('.');

  // if there is no fractional part, just add enough zeros at the end
  if (decimalPointIndex === -1) {
    return `${value}${'0'.repeat(decimals)}`;
  }

  // otherwise shift decimal point to the right and add enough zeros at the end
  const fractionalPartLength = value.length - decimalPointIndex - 1;

  return `${value.slice(0, decimalPointIndex)}${value.slice(
    decimalPointIndex + 1,
    decimalPointIndex + 1 + decimals
  )}${fractionalPartLength <= decimals ? '0'.repeat(decimals - fractionalPartLength) : ''}`.replace(
    /^0+(\d+)/,
    '$1'
  );
};

export const getAddressUrl = (address?: string): string | undefined => {
  if (!address) return;
  return `${process.env.NEXT_PUBLIC_ERGO_EXPLORER}/addresses/${address}`;
};

export const getTxURL = (tx?: string): string | undefined => {
  if (!tx) return;
  return `${process.env.NEXT_PUBLIC_ERGO_EXPLORER}/transactions/${tx}`;
};

export const saveTransactionId = (value: string) => {
  const stored = localStorage.getItem(TRANSACTIONS_STORAGE_KEY);
  let items: string[] = stored ? JSON.parse(stored) : [];
  if (!Array.isArray(items)) items = [];
  items.push(value);
  localStorage.setItem(TRANSACTIONS_STORAGE_KEY, JSON.stringify(items));
};
