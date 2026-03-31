import type { GetRafflesParams } from '@ergo-raffle/client';
import type { RaisedAmounts } from '@ergo-raffle/ui-kit';

export const getRafflesParamsTransformer = (searchParams: {
  [key: string]: string | string[] | undefined;
}): GetRafflesParams => {
  const { page, perPage, ...params } = searchParams;
  const limit = perPage ? Number(perPage) : 12;
  const offset = page && perPage ? Number(page) * Number(perPage) - 1 : 0;
  return { ...params, offset, limit };
};

export const getRaisedAmount = (
  soldTicketCount: number,
  ticketPrice: number,
  goal: number
): RaisedAmounts => ({
  target: soldTicketCount * ticketPrice,
  current: goal,
  verified: true
});

export const getDeadlineAmount = (lastBlockHeight: number, deadline: number): number =>
  deadline - lastBlockHeight;

export const getDeadlineString = (deadline: number) =>
  deadline > 0
    ? `${Math.floor(deadline / (1000 * 60 * 60 * 24))} Days remaining`
    : `Ended ${Math.floor(Math.abs(deadline) / (1000 * 60 * 60 * 24))} Days ago`;
