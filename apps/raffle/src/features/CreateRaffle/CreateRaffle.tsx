'use client';

import { useMemo, useState } from 'react';

import Image from 'next/image';

import type { InfoBlockchainResponse } from '@ergo-raffle/client';
import { Card, CardContent, Stepper, Typography, toast } from '@ergo-raffle/ui-kit';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';

import { type RaffleForm, raffleSchema } from '@/features/schemas';
import { createRaffle } from '@/features/services';
import { useWallet } from '@/hooks';
import { getErrorMessage } from '@/lib';

import { BasketsForm } from './BasketsForm';
import { DonationGoalForm } from './DonationGoalForm';
import { Finish } from './Finish';
import { SpecificationsForm } from './SpecificationsForm';

export type CreateRaffleProps = {
  infoBlockchainData?: InfoBlockchainResponse;
};

export const CreateRaffle = ({ infoBlockchainData }: CreateRaffleProps) => {
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  const wallet = useWallet();

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

  const resetForm = () => {
    form.reset();
    setActiveStepIndex(0);
  };

  const serviceFee = useMemo(
    () =>
      infoBlockchainData ? infoBlockchainData.fee.service + infoBlockchainData.fee.implementer : 0,
    [infoBlockchainData]
  );

  const steps = [
    {
      title: 'Specifications',
      content: <SpecificationsForm handleNext={handleNext} />,
      fields: ['name', 'description', 'tags', 'deadline', 'images'] as const
    },
    {
      title: 'Donation Goal',
      content: (
        <DonationGoalForm handleNext={handleNext} handleBack={handleBack} serviceFee={serviceFee} />
      ),
      fields: ['tokenId', 'count', 'amount', 'missionFund', 'winnerPotShare', 'address'] as const
    },
    {
      title: 'Baskets',
      content: <BasketsForm handleNext={handleNext} handleBack={handleBack} />,
      fields: ['emptyBaskets', 'details'] as const
    },
    {
      title: 'Overview & Agreement',
      content: <Finish handleBack={handleBack} serviceFee={serviceFee} />
    }
  ];

  const onSubmit = async (data: RaffleForm) => {
    try {
      await createRaffle(data, wallet, infoBlockchainData);

      toast.success('Raffle created successfully!');
      resetForm();
    } catch (error) {
      toast.error(getErrorMessage(error, 'Failed to create raffle. Please try again later.'));
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
              <div className="mx-auto max-w-7xl">{steps[activeStepIndex]?.content}</div>
            </form>
          </FormProvider>
        </CardContent>
      </Card>
    </>
  );
};
