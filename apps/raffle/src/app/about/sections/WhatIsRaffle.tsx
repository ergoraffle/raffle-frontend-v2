import { Dice, Lock, Verified } from '@ergo-raffle/icons';
import { Card, CardContent, Typography } from '@ergo-raffle/ui-kit';

import { GLASS_SECTION } from '../ui';

const PILLARS = [
  {
    id: 'non-custodial',
    icon: <Lock className="size-7" />,
    title: 'Non-custodial',
    description: 'Funds live in contracts, not with us.'
  },
  {
    id: 'provably-fair',
    icon: <Dice className="size-7" />,
    title: 'Provably fair',
    description: 'Winners drawn from an on-chain oracle anyone can verify.'
  },
  {
    id: 'refund-protected',
    icon: <Verified className="size-7" />,
    title: 'Refund-protected',
    description: 'Miss the goal? Backers get paid back.'
  }
];

export const WhatIsRaffle = () => (
  <Card className={GLASS_SECTION}>
    <CardContent>
      <div className="my-7 mx-auto max-w-5xl space-y-8">
        <div className="space-y-3 text-center">
          <Typography variant="heading-2" asChild>
            <h2>Fund a goal. Draw a winner. On-chain.</h2>
          </Typography>
          <Typography variant="body-lg" className="text-gray-1 max-w-2xl mx-auto">
            Supporters buy tickets toward a goal you set. At the deadline, smart contracts settle
            everything — no company holds your funds or keys.
          </Typography>
        </div>
        <div className="grid gap-6 sm:grid-cols-3">
          {PILLARS.map((pillar) => (
            <div className="group flex flex-col items-center text-center gap-2" key={pillar.id}>
              <span className="flex size-14 items-center justify-center rounded-full bg-primary-6 text-primary-1 transition-transform duration-300 group-hover:scale-110">
                {pillar.icon}
              </span>
              <Typography variant="heading-5" className="font-medium">
                {pillar.title}
              </Typography>
              <Typography variant="body-md" className="text-gray-1">
                {pillar.description}
              </Typography>
            </div>
          ))}
        </div>
      </div>
    </CardContent>
  </Card>
);
