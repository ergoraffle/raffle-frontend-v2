import type { InfoBlockchainResponse, RaffleDetailResponse } from '@ergo-raffle/client';
import type { NautilusWalletAddresses, UnsignedErgoTxProxy } from '@ergo-raffle/nautilus-wallet';
import { AddGiftProxyTxBuilder, CreationProxyTxBuilder } from '@ergo-raffle/proxy-transactions';

import { getNonDecimalString } from '@/features/utils';
import type { WalletContextValue } from '@/hooks';

import type { AddGiftSchema, RaffleForm } from './schemas';

export const createRaffle = async (
  data: RaffleForm,
  wallet: WalletContextValue | undefined,
  infoBlockchainData: InfoBlockchainResponse | undefined
) => {
  if (!infoBlockchainData) {
    throw new Error('Failed to create raffle. Please try again later.');
  }
  if (wallet?.selected?.name !== 'Nautilus') {
    throw new Error('Must be connected to Nautilus wallet.');
  }

  const tokens = await wallet.selected.fetchTokens();

  const token = tokens.find((token) => token.id === data.tokenId);

  if (!token) {
    throw new Error('Failed to get wallet tokens.');
  }

  // Current chain height
  const chainHeight = infoBlockchainData.height;

  // Organizer UTXO boxes the selector may spend
  const feeBoxes = (await wallet.selected.getBoxes()).values();

  // organizer address is the wallet address that is creating the raffle and will receive the change
  const organizerAddress = (wallet.addresses as NautilusWalletAddresses).main;

  // implementer address is the address of the service that is implementing the raffle
  const implementerAddress = process.env.NEXT_PUBLIC_IMPLEMENTER_ADDRESS || '';

  // block height at which the proxy box expires (configure a value for expiration period and add it to the current network height)
  const expirationHeight =
    infoBlockchainData.height + Number(process.env.NEXT_PUBLIC_EXPIRATION_HEIGHT);

  const name = data.name;

  const description = data.description || '';

  // Tags string (use empty string when none)
  const tags = data.tags?.join(',') || '';

  const images = data.images?.filter((image) => !!image.url).map((image) => image.url || '') || [];

  // Ticket price in nanoERG or collecting-token units
  const ticketPrice = BigInt(getNonDecimalString(data.amount.toString(), token.decimals));

  // Funding goal in nanoERG or collecting-token units
  const goal = BigInt(getNonDecimalString(data.count.toString(), token.decimals));

  // Total winners share in thousandths
  const winnersPercent = data.winnerPotShare * 10;

  // Number of winners
  const winnerCount = data.details.reduce(
    (result, current) => result + current.count,
    data.emptyBaskets
  );

  // array of winners percentages in thousandths (should sum to 1000)
  const winnersPercentList: bigint[] = [];
  for (const current of data.details) {
    for (let i = 0; i < current.count; i++) {
      winnersPercentList.push(BigInt(current.percent) * 10n);
    }
  }
  for (let i = 0; i < data.emptyBaskets; i++) {
    winnersPercentList.push(0n);
  }

  // Raffle deadline height
  const deadline = infoBlockchainData.height + data.deadline;

  // Optional project address (defaults to organizer when omitted)
  const projectAddress = data.address;

  // Service creation fee in nanoERG
  const creationFee = BigInt(infoBlockchainData.fee.tx);

  // Transaction fee in nanoERG
  const txFee = BigInt(infoBlockchainData.fee.tx);

  let builder = new CreationProxyTxBuilder()
    .setChainHeight(chainHeight)
    .setFeeBoxes(feeBoxes)
    .setOrganizerAddress(organizerAddress)
    .setImplementerAddress(implementerAddress)
    .setExpirationHeight(expirationHeight)
    .setName(name)
    .setDescription(description)
    .setTags(tags)
    .setPictures(images)
    .setTicketPrice(ticketPrice)
    .setGoal(goal)
    .setWinnersPercent(winnersPercent)
    .setWinnerCount(winnerCount)
    .setWinnersPercentList(winnersPercentList)
    .setRaffleDeadline(deadline)
    .setProjectAddress(projectAddress)
    .setCreationFee(creationFee)
    .setTxFee(txFee);

  // if the raffle is a token-goal raffle, set the collecting token id
  if (token.id.toLowerCase() !== 'erg') {
    builder = builder.setCollectingTokenId(token.id);
  }

  const unsignedTx = await builder.build();
  const eip12Object = unsignedTx?.toEIP12Object();

  return await wallet.selected.transfer(eip12Object as UnsignedErgoTxProxy);
};

export const addGiftRaffle = async (
  data: AddGiftSchema,
  wallet: WalletContextValue | undefined,
  infoBlockchainData: InfoBlockchainResponse | undefined,
  raffle: RaffleDetailResponse
) => {
  if (!infoBlockchainData) {
    throw new Error('Failed to donate raffle. Please try again later.');
  }

  if (wallet?.selected?.name !== 'Nautilus') {
    throw new Error('Must be connected to Nautilus wallet.');
  }
  
  // // Current chain height
  const chainHeight = infoBlockchainData.height; // current height should be fetched from the info api

  // Gift giver UTXO boxes the selector may spend
  const feeBoxes = (await wallet.selected.getBoxes()).values(); // box iterator from wallet

  // Gift giver address (change output)
  const giftGiverAddress = (wallet.addresses as NautilusWalletAddresses).main; // gift giver address (user wallet address)

  // Proxy expiration height
  const expirationHeight =
    infoBlockchainData.height + Number(process.env.NEXT_PUBLIC_EXPIRATION_HEIGHT); // block height at which the proxy box expires (configure a value for expiration period and add it to the current network height)

  // Raffle deadline height
  const raffleDeadline = raffle.deadline;

  // Miner fee in nanoERG
  const txFee = BigInt(infoBlockchainData.fee.tx);

  // Index of the winner receiving the gift
  const winnerIndex = data.winnerIndex; // index of the winner receiving the gift

  // Gift value in nanoERG (must be at least `4n * txFee`)
  // const giftValue = data.giftValue;

  let builder = new AddGiftProxyTxBuilder()
    .setChainHeight(chainHeight)
    .setFeeBoxes(feeBoxes)
    .setGiftGiverAddress(giftGiverAddress)
    .setWinnerIndex(winnerIndex)
    // .setGiftValue(giftValue)
    .setExpirationHeight(expirationHeight)
    .setRaffleDeadline(raffleDeadline)
    .setTxFee(txFee)
    .setRaffleId(raffle.id);

  // if the gift tokens are provided, add them to the builder
  if (data.tokens !== undefined && data.tokens.length > 0) {
    builder = builder.setGiftTokens(data.tokens); // array of gift tokens
  }

  const unsignedTx = await builder.build();
  const eip12Object = unsignedTx?.toEIP12Object();

  return await wallet.selected.transfer(eip12Object as UnsignedErgoTxProxy);
};
