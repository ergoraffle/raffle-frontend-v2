import type { GetRafflesParams } from '@ergo-raffle/client';

export const getRafflesParamsTransformer = (searchParams: {
  [key: string]: string | string[] | undefined;
}): GetRafflesParams => {
  const { page, perPage, ...params } = searchParams;
  const limit = perPage ? Number(perPage) : 12;
  const offset = page && perPage ? Number(page) * Number(perPage) - 1 : 0;
  return { ...params, offset, limit };
};
