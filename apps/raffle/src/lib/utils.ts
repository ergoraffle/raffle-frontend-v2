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
