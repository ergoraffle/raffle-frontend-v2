import type { GetRaffleParams } from '@ergo-raffle/client';

export const getRafflesParamsTransformer = (searchParams: {
  [key: string]: string | string[] | undefined;
}): GetRaffleParams => {
  const { page, perPage, ...params } = searchParams;
  const limit = perPage ? Number(perPage) : 12;
  const offset = page && perPage ? Number(page) * Number(perPage) - 1 : 0;
  return { ...params, offset, limit };
};

export const getDeadlineAmount = (lastBlockHeight: number, deadline: number): number =>
  deadline - lastBlockHeight;

export const getDeadlineString = (deadline: number): string => {
  const msPerMinute = 1000 * 60;
  const msPerHour = msPerMinute * 60;
  const msPerDay = msPerHour * 24;

  const isFuture = deadline > 0;
  const absDeadline = Math.abs(deadline);
  let str = '';

  if (absDeadline >= msPerDay) {
    const days = Math.floor(absDeadline / msPerDay);
    str = `${days} Day${days > 1 ? 's' : ''}`;
  } else if (absDeadline >= msPerHour) {
    const hours = Math.floor(absDeadline / msPerHour);
    str = `${hours} Hour${hours > 1 ? 's' : ''}`;
  } else {
    const minutes = Math.floor(absDeadline / msPerMinute);
    str = `${minutes} Minute${minutes > 1 ? 's' : ''}`;
  }

  return isFuture ? `${str} remaining` : `Ended ${str} ago`;
};

export const getWinnerPot = (shareWinner: number): number => shareWinner / 10;
export const getSoldTicketCount = (raisedAmount: number, ticketPrice: number): number =>
  raisedAmount / ticketPrice;
export const getMissionFund = (amounts: Record<string, number>): number =>
  (1000 - Object.values(amounts).reduce((sum, value) => sum + value, 0)) / 10;
