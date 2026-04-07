'use client';

import { useState } from 'react';

import Image from 'next/image';

import { Card, CardContent, Stepper, Typography } from '@ergo-raffle/ui-kit';

import { BasketsForm } from './BasketsForm';
import { DonationGoalForm } from './DonationGoalForm';
import { Finish } from './Finish';
import { SpecificationsForm } from './SpecificationsForm';

export const CreateRaffle = () => {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const handleNext = () => {
    setActiveStepIndex((prev) => prev + 1);
  };
  const handleBack = () => {
    setActiveStepIndex((prev) => prev - 1);
  };
  const steps = [
    {
      title: 'Specifications',
      content: <SpecificationsForm handleNext={handleNext} />
    },
    {
      title: 'Donation Goal',
      content: <DonationGoalForm handleNext={handleNext} handleBack={handleBack} />
    },
    { title: 'Baskets', content: <BasketsForm handleNext={handleNext} handleBack={handleBack} /> },
    { title: 'Finish', content: <Finish /> }
  ];
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
          <div className="mx-auto max-w-7xl">{steps[activeStepIndex]?.content}</div>
        </CardContent>
      </Card>
    </>
  );
};
