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

export const CreateRaffle = () => {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const { data: infoBlockchainData } = useInfoBlockchain();

  const wallet = useWallet();

  const raffleSchema = createRaffleSchema(infoBlockchainData?.fee?.implementer);

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
      fields: ['name', 'description', 'tags', 'deadline'] as const
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

      const organizerAddress = (wallet.addresses as NautilusWalletAddresses).main;

      const boxes = await wallet.selected.getBoxes();

      const images = data.images?.filter((image) => !!image.url).map((image) => image.url || '') || [];

      const winnerCount = data.details.reduce((result, current) => result + current.count, 0);

      const winnersPercentList: bigint[] = [];

      for (const current of data.details) {
        for (let i = 0; i < current.count; i++) {
          winnersPercentList.push(BigInt(current.percent) * 1000n);
        }
      }

      const builder = (new CreationProxyTxBuilder())
        .setChainHeight(infoBlockchainData.height)                                                         // Current chain height
        .setFeeBoxes(boxes.values())                                                                       // Organizer UTXO boxes the selector may spend
        .setOrganizerAddress(organizerAddress)                                                             // organizer address is the wallet address that is creating the raffle and will receive the change
        .setImplementerAddress(process.env.NEXT_PUBLIC_IMPLEMENTER_ADDRESS || '')                          // implementer address is the address of the service that is implementing the raffle
        .setExpirationHeight(infoBlockchainData.height + Number(process.env.NEXT_PUBLIC_EXPIRATION_HEIGHT))// block height at which the proxy box expires (configure a value for expiration period and add it to the current network height)
        .setName(data.name)
        .setDescription(data.description || '')
        .setTags(data.tags?.join(',') || '')                                                                // Tags string (use empty string when none)
        .setPictures(images)
        // .setTicketPrice(ticketPrice)                                                                        // Ticket price in nanoERG or collecting-token units
        // .setGoal(BigInt(data.count))                                                                        // Funding goal in nanoERG or collecting-token units
        // .setWinnersPercent(winnersPercent)                                                                  // Total winners share in thousandths
        // .setWinnerCount(winnerCount)                                                                        // Number of winners
        // .setWinnersPercentList(winnersPercentList)                                                          // array of winners percentages in thousandths (should sum to 1000)
        .setRaffleDeadline(data.deadline)                                                                    // Raffle deadline height
        .setProjectAddress(data.address)                                                                    // Optional project address (defaults to organizer when omitted)
        // .setCreationFee(BigInt(infoBlockchainData.fee.tx))                                                  // Service creation fee in nanoERG
        // .setTxFee(BigInt(infoBlockchainData?.fee.tx));                                                      // Transaction fee in nanoERG
 
      // if the raffle is a token-goal raffle, set the collecting token id
      // if (collectingTokenId !== undefined) {
      //   builder = builder.setCollectingTokenId(collectingTokenId);
      // }

      debugger

      const unsignedTx = await builder.build();

      const eip12Object = unsignedTx.toEIP12Object();

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
                  tokenId: "erg",
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
