export const cleanObject = <T extends Record<string, unknown>>(obj: T): Partial<T> =>
  Object.fromEntries(
    Object.entries(obj).filter(([, value]) => value !== null && value !== undefined)
  ) as Partial<T>;

export const toQueryString = (params: Record<string, unknown>): string => {
  const cleanedParams = cleanObject(params);
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

export const getRandomItem = (length: number): number => {
  const randomIndex = Math.floor(Math.random() * length);
  return randomIndex;
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
