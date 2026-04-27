import type { InfoBlockchainResponse, RaffleDetailResponse } from '@ergo-raffle/client';

import {
  getAmountPercentage,
  getDeadlineAmount,
  getMissionFund,
  getSoldTicketCount,
  getWinnerPotShareAmount
} from '@/features/utils';

export type RaffleDetailView = RaffleDetailResponse & {
  soldTicketCount: number;
  deadlineAmount: number;
  missionFund: number;
  serviceFee: number;
  winnerPotShare: {
    percent: number;
    amount: number;
  };
};

export const raffleToViewModel = (
  raffleServer: RaffleDetailResponse,
  infoBlockchain: InfoBlockchainResponse
): RaffleDetailView => {
  const soldTicketCount = getSoldTicketCount(raffleServer.amount.raised, raffleServer.ticketPrice);
  const deadlineAmount = getDeadlineAmount(infoBlockchain.height, raffleServer.deadline);
  const missionFund = getMissionFund(raffleServer.share);
  const winnerPotSharePercent = getAmountPercentage(raffleServer.share.winner);
  const winnerPotShareAmount = getWinnerPotShareAmount(raffleServer.amount, winnerPotSharePercent);
  const serviceFee = infoBlockchain.fee.implementer + infoBlockchain.fee.service;
  return {
    ...raffleServer,
    soldTicketCount,
    deadlineAmount,
    missionFund,
    serviceFee,
    winnerPotShare: {
      percent: winnerPotSharePercent,
      amount: winnerPotShareAmount
    }
  };
};
