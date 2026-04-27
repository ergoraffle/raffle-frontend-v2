import type { InfoBlockchainResponse, RaffleDetailResponse } from '@ergo-raffle/client';

export type RaffleDetailView = RaffleDetailResponse & {
  soldTicketCount: number;
  deadlineAmount: number;
  missionFund: number;
  serviceFee: number;
  winnerPotSharePercent: number;
  winnerPotShareAmount: number;
};

export const raffleToViewModel = (
  raffle: RaffleDetailResponse,
  infoBlockchain: InfoBlockchainResponse
): RaffleDetailView => {
  const soldTicketCount = raffle.amount.raised / raffle.ticketPrice;
  const deadlineAmount = raffle.deadline - infoBlockchain.height;
  const missionFund =
    (1000 - Object.values(raffle.share).reduce((sum, value) => sum + value, 0)) / 10;
  const winnerPotSharePercent = raffle.share.winner / 10;
  const winnerPotShareAmount =
    ((raffle.amount.raised > raffle.amount.goal ? raffle.amount.raised : raffle.amount.goal) *
      winnerPotSharePercent) /
    100;
  const serviceFee = infoBlockchain.fee.implementer + infoBlockchain.fee.service;
  return {
    ...raffle,
    soldTicketCount,
    deadlineAmount,
    missionFund,
    serviceFee,
    winnerPotSharePercent,
    winnerPotShareAmount
  };
};
