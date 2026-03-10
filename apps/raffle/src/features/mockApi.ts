import { getRafflesRaffleIdWinnerBaskets, withMock } from '@ergo-raffle/client';

export const fetchBasketsAction: typeof getRafflesRaffleIdWinnerBaskets = async (...args) => {
  const data = await withMock(() => getRafflesRaffleIdWinnerBaskets(...args));
  return data;
};
