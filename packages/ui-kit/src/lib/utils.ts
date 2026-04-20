import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getDecimalString = (
  value?: bigint | number | string,
  decimals?: number,
  truncateLength?: number
): string => {
  const valueString = (value ?? 0).toString();

  const safeDecimals = decimals ?? 0;

  if (!safeDecimals) return valueString;

  const untrimmedResult =
    valueString.length > safeDecimals
      ? `${valueString.slice(0, -safeDecimals)}.${valueString.slice(-safeDecimals)}`
      : `0.${valueString.padStart(safeDecimals, '0')}`;

  const preciseResult = untrimmedResult.replace(/0+$/, '').replace(/\.$/, '') || '0';

  return preciseResult.replace(
    /\.(.*)/,
    (_, floatingPart: string) => `.${floatingPart.slice(0, truncateLength)}`
  );
};
