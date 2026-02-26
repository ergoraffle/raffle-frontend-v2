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
