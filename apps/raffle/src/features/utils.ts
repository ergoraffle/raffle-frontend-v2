import type { GetRaffleParams, RaffleDetailResponseAmount } from '@ergo-raffle/client';

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
  const isFuture = deadline > 0;

  const absDeadline = Math.abs(deadline * 2);

  const str = formatDuration(absDeadline);

  return isFuture ? `${str} remaining` : `Ended ${str} ago`;
};

export const getNonDecimalString = (value: string, decimals: number) => {
  if (!decimals) return value;

  const decimalPointIndex = value.indexOf('.');

  // if there is no fractional part, just add enough zeros at the end
  if (decimalPointIndex === -1) {
    return `${value}${'0'.repeat(decimals)}`;
  }

  // otherwise shift decimal point to the right and add enough zeros at the end
  const fractionalPartLength = value.length - decimalPointIndex - 1;

  return `${value.slice(0, decimalPointIndex)}${value.slice(
    decimalPointIndex + 1,
    decimalPointIndex + 1 + decimals
  )}${fractionalPartLength <= decimals ? '0'.repeat(decimals - fractionalPartLength) : ''}`.replace(
    /^0+(\d+)/,
    '$1'
  );
};

export const getAmountPercentage = (amount: number) => amount / 10;

export const validatedAddress = (address: string): boolean => Boolean(address);

export const getWinnerPot = (shareWinner: number): number => shareWinner / 10;
export const getSoldTicketCount = (raisedAmount: number, ticketPrice: number): number =>
  raisedAmount / ticketPrice;

export const getMissionFund = (amounts: Record<string, number>): number =>
  getAmountPercentage(1000 - Object.values(amounts).reduce((sum, value) => sum + value, 0));

export const formatDuration = (minutes: number) => {
  const units = [
    { label: 'year', value: 60 * 24 * 365 },
    { label: 'month', value: 60 * 24 * 30 },
    { label: 'week', value: 60 * 24 * 7 },
    { label: 'day', value: 60 * 24 },
    { label: 'hour', value: 60 },
    { label: 'minute', value: 1 }
  ];

  for (const unit of units) {
    const amount = Math.floor(minutes / unit.value);
    if (amount >= 1) {
      return `${amount} ${unit.label}${amount > 1 ? 's' : ''}`;
    }
  }

  return '0 minutes';
};

export const getPercentageOfAmount = (amount: number, percent: number) => (amount * percent) / 100;

export const getWinnerPotShareAmount = (amount: RaffleDetailResponseAmount, percent: number) => {
  const amountToCalc = amount.raised > amount.goal ? amount.raised : amount.goal;
  return getPercentageOfAmount(amountToCalc, percent);
};
