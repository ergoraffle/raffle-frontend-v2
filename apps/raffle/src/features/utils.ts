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

export const deadlineToHour = (deadline: number, height: number): number => {
  const dif = deadline - height;
  if (dif <= 0) return 0;

  const count = dif / 2;

  return Math.floor(count);
};
