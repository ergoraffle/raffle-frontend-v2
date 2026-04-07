import type { GetRafflesParams } from '@ergo-raffle/client';
import type { PercentageDistributionItem, RaisedAmounts } from '@ergo-raffle/ui-kit';

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

export const calcPercentageDistribution = (
  shareBasketCount: number,
  biggestShareBasket: number
) => {
  const distribution: PercentageDistributionItem[] = [];

  const remaining = 100 - biggestShareBasket;
  const otherCount = shareBasketCount - 1;

  if (otherCount <= 0) {
    return [
      {
        id: crypto.randomUUID(),
        count: 1,
        percent: 100
      }
    ];
  }

  const exact = remaining / otherCount;

  const base = Math.floor(exact);

  let remainder = remaining - base * otherCount;

  for (let i = 0; i < shareBasketCount; i++) {
    let percent = 0;

    if (i === 0) {
      percent = biggestShareBasket;
    } else {
      percent = base + (remainder > 0 ? 1 : 0);
      if (remainder > 0) remainder--;
    }

    distribution.push({
      id: crypto.randomUUID(),
      count: 1,
      percent
    });
  }
  return distribution;
};
