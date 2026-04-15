'use client';

import { useState } from 'react';

import Image from 'next/image';

import { Card, CardContent, Stepper, Typography } from '@ergo-raffle/ui-kit';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';

import { useInfoBlockchain } from '@/hooks/useInfoBlockchain';
import { createRaffle } from '@/mockApi';

import { createRaffleSchema, type RaffleForm } from '../schemas';
import { BasketsForm } from './BasketsForm';
import { DonationGoalForm } from './DonationGoalForm';
import { SpecificationsForm } from './SpecificationsForm';

export const CreateRaffle = () => {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const { data: infoBlockchainData } = useInfoBlockchain();
  const raffleSchema = createRaffleSchema(infoBlockchainData?.fee?.service);
  const form = useForm<RaffleForm>({
    resolver: zodResolver(raffleSchema),
    shouldUnregister: false,
    defaultValues: {
      details: []
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
    }
  ];
  const onSubmit = (data: RaffleForm) => {
    createRaffle(data);
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
              <div className="mx-auto max-w-7xl">{steps[activeStepIndex]?.content}</div>
            </form>
          </FormProvider>
        </CardContent>
      </Card>
    </>
  );
};
