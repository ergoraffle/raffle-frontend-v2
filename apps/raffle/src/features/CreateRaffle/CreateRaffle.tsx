'use client';

import { useState } from 'react';

import Image from 'next/image';

import { Card, CardContent, Stepper, Typography } from '@ergo-raffle/ui-kit';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';

import { useInfoBlockchain } from '@/hooks/useInfoBlockchain';

import { createRaffleSchema, type RaffleForm } from '../schemas';
import { BasketsForm } from './BasketsForm';
import { DonationGoalForm } from './DonationGoalForm';
import { Finish } from './Finish';
import { SpecificationsForm } from './SpecificationsForm';

import { CreationProxyTxBuilder } from '@ergo-raffle/proxy-transactions';

import { useWallet } from '@/hooks';
import { NautilusWalletAddresses, UnsignedErgoTxProxy } from '@ergo-raffle/nautilus-wallet';

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
    decimalPointIndex + 1 + decimals,
  )}${
    fractionalPartLength <= decimals
      ? '0'.repeat(decimals - fractionalPartLength)
      : ''
  }`.replace(/^0+(\d+)/, '$1');
};

export const CreateRaffle = () => {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const { data: infoBlockchainData } = useInfoBlockchain();

  const wallet = useWallet();

  const raffleSchema = createRaffleSchema(
    infoBlockchainData?.fee?.implementer,
    infoBlockchainData?.height
  );

  const form = useForm<RaffleForm>({
    resolver: zodResolver(raffleSchema),
    shouldUnregister: false,
    mode: 'onChange',
    defaultValues: {
      details: [],
      terms: false,
      eligibility: false
    }
  });

  const handleNext = async () => {
    const fields = steps[activeStepIndex].fields;
    if (fields?.length) {
      const valid = await form.trigger(fields);
      if (!valid) return;
    }

    setActiveStepIndex((prev) => prev + 1);
  };
  const handleBack = () => {
    setActiveStepIndex((prev) => prev - 1);
  };

  const steps = [
    {
      title: 'Specifications',
      content: <SpecificationsForm handleNext={handleNext} />,
      fields: ['name', 'description', 'tags', 'deadline', 'images'] as const
    },
    {
      title: 'Donation Goal',
      content: <DonationGoalForm handleNext={handleNext} handleBack={handleBack} />,
      fields: ['tokenId', 'count', 'amount', 'missionFund', 'winnerPotShare', 'address'] as const
    },
    {
      title: 'Baskets',
      content: <BasketsForm handleNext={handleNext} handleBack={handleBack} />,
      fields: ['emptyBaskets', 'details'] as const
    },
    {
      title: 'Overview & Agreement',
      content: <Finish handleBack={handleBack} />
    }
  ];

  const onSubmit = async (data: RaffleForm) => {
    if (!infoBlockchainData) {
      throw new Error('TODO');
    }

    if (wallet?.selected?.name !== 'Nautilus') {
      throw new Error('TODO');
    }

    try {
      const tokens = await wallet.selected.fetchTokens();

      const token = tokens.find((token) => token.id === data.tokenId);

      if (!token) {
        throw new Error('TODO');
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
      const expirationHeight = infoBlockchainData.height + Number(process.env.NEXT_PUBLIC_EXPIRATION_HEIGHT);

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
      const winnerCount = data.details.reduce((result, current) => result + current.count, data.emptyBaskets);

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
      const deadline = data.deadline;

      // Optional project address (defaults to organizer when omitted)
      const projectAddress = data.address;

      // Service creation fee in nanoERG
      const creationFee = BigInt(infoBlockchainData.fee.tx);

      // Transaction fee in nanoERG
      const txFee = BigInt(infoBlockchainData.fee.tx)

      const builder = (new CreationProxyTxBuilder())
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
      // if (collectingTokenId !== undefined) {
      //   builder = builder.setCollectingTokenId(collectingTokenId);
      // }

      const unsignedTx = await builder.build();

      const eip12Object = unsignedTx.toEIP12Object();

      debugger

      await wallet.selected.transfer(eip12Object as UnsignedErgoTxProxy)

      alert('success')
    } catch (error) {
      debugger
      console.log('error on create raffle', error)
    }
  };
  return (
    <>
      <div className="flex flex-col items-center justify-center space-y-5 py-3.5 mb-7">
        <Image
          src="/illustrations/createRaffleIllustration.svg"
          alt="Create Raffle"
          width={500}
          height={190}
          className="hidden sm:block"
        />
        <Typography variant="heading-1">Ready to create a new raffle?</Typography>
        <Stepper steps={steps.map((s) => s.title)} activeStepIndex={activeStepIndex} />
      </div>
      <Card className="py-7">
        <CardContent>
          <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <button
                type='button' 
                onClick={() => onSubmit({
                  address: "9hagwneHKMBJHN7pnR8WLwD2ne5NQpWWECLEdwxbS9Bm3iigmkZ",
                  amount: 5,
                  count: 54,
                  deadline: 4,
                  description: "<p>erer</p>",
                  details: [{
                    count: 1,
                    id: "5d392f24-3645-4067-8a22-a3bd25d02cc2",
                    percent: 100
                  }],
                  tags: [],
                  eligibility: true,
                  emptyBaskets: 4,
                  images: [],
                  missionFund: 4,
                  name: "erere",
                  terms: true,
                  tokenId: "ERG",
                  winnerPotShare: 4,
                })}
              >create</button>
              <div className="mx-auto max-w-7xl">{steps[activeStepIndex]?.content}</div>
            </form>
          </FormProvider>
        </CardContent>
      </Card>
    </>
  );
};
