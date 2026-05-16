import type { GetActivityParams, GetRaffleParams } from '@ergo-raffle/client';

import { formatDuration } from '@/lib';

export const getRafflesParamsTransformer = (searchParams: {
  [key: string]: string | string[] | undefined;
}): GetRaffleParams => {
  const { page, perPage, ...params } = searchParams;
  const limit = perPage ? Number(perPage) : 12;
  const offset = page ? (Number(page) - 1) * Number(perPage ?? 12) : 0;
  return { ...params, offset, limit };
};
export const getActivityParamsTransformer = (searchParams: {
  [key: string]: string | string[] | undefined;
}): GetActivityParams => {
  const { page, perPage, ...params } = searchParams;
  const limit = perPage ? Number(perPage) : 6;
  const offset = page ? (Number(page) - 1) * Number(perPage ?? 6) : 0;
  return { ...params, offset, limit };
};

export const getDeadlineString = (deadline: number): string => {
  const isFuture = deadline > 0;

  const absDeadline = Math.abs(deadline * 2);

  const str = formatDuration(absDeadline);

  return isFuture ? `${str} remaining` : `Ended ${str} ago`;
};
