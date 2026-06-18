import { Fragment } from 'react';

import { Check, Dice, HandCoin, Return, SandClock, Ticket, Verified } from '@ergo-raffle/icons';
import { Card, CardContent, Typography } from '@ergo-raffle/ui-kit';

import { GLASS_SECTION } from '../ui';

const OUTCOMES = [
  {
    id: 'met',
    tone: 'success',
    icon: <Verified className="size-6" />,
    title: 'Goal met',
    caption: 'Success branch',
    points: [
      'A randomness oracle draws the winners on-chain — anyone can re-verify it',
      'Winners receive their prize share plus any donated gifts',
      'Raised funds release to the creator, after the ~5% protocol fee',
      'The creation fee is refunded'
    ]
  },
  {
    id: 'missed',
    tone: 'neutral',
    icon: <Return className="size-6" />,
    title: 'Goal missed',
    caption: 'Refund branch',
    points: [
      'Every ticket is redeemed and buyers are refunded automatically',
      'Gift donors reclaim the assets they added',
      'No protocol fee is charged',
      'The creation fee is kept (spam prevention)'
    ]
  }
];

const STAGES = [
  {
    id: 'create',
    icon: <HandCoin className="size-7" />,
    title: 'Create',
    desc: 'The creator sets the goal, deadline, winners and split, and pays a one-time creation fee.'
  },
  {
    id: 'fund',
    icon: <Ticket className="size-7" />,
    title: 'Fund',
    desc: 'Supporters buy tickets — more tickets, higher odds. Anyone can add gifts to the baskets.'
  },
  {
    id: 'deadline',
    icon: <SandClock className="size-7" />,
    title: 'Deadline',
    desc: 'At a fixed Ergo block height the raffle closes and the contract settles itself — no team.'
  }
];

const FlowConnector = () => (
  <div className="flex shrink-0 items-center justify-center md:w-14">
    <div className="relative hidden h-0.5 w-full overflow-hidden rounded-full bg-primary-1/15 md:block">
      <span className="about-flow-x absolute top-1/2 size-2 -translate-y-1/2 rounded-full bg-primary-1" />
    </div>
    <div className="relative h-7 w-0.5 overflow-hidden rounded-full bg-primary-1/15 md:hidden">
      <span className="about-flow-y absolute left-1/2 size-2 -translate-x-1/2 rounded-full bg-primary-1" />
    </div>
  </div>
);

export const RaffleFlow = () => (
  <Card className={GLASS_SECTION}>
    <CardContent>
      <div className="my-7 mx-auto max-w-5xl space-y-8">
        <div className="space-y-2 text-center">
          <Typography variant="subtitle-md" className="uppercase tracking-wide text-primary-1">
            On-chain lifecycle
          </Typography>
          <Typography variant="heading-2" asChild>
            <h2>From goal to payout — settled by contract</h2>
          </Typography>
          <Typography variant="subtitle-lg" className="text-gray-1 max-w-2xl mx-auto">
            Every step is a public Ergo transaction you can verify yourself. No custody, no off
            switch.
          </Typography>
        </div>
        <div className="flex flex-col items-stretch gap-3 md:flex-row md:items-center md:gap-0">
          {STAGES.map((stage, index) => (
            <Fragment key={stage.id}>
              <div className="flex flex-1 flex-col items-center gap-3 rounded-lg border border-gray-5 bg-gray-5/20 p-5 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-1">
                <span className="flex size-14 items-center justify-center rounded-full bg-primary-6 text-primary-1">
                  {stage.icon}
                </span>
                <Typography variant="heading-5" className="font-medium">
                  {stage.title}
                </Typography>
                <Typography variant="body-sm" className="text-gray-1">
                  {stage.desc}
                </Typography>
              </div>
              {index < STAGES.length - 1 && <FlowConnector />}
            </Fragment>
          ))}
        </div>
        <div className="flex flex-col items-center gap-2">
          <div className="relative h-7 w-0.5 overflow-hidden rounded-full bg-primary-1/15">
            <span className="about-flow-y absolute left-1/2 size-2 -translate-x-1/2 rounded-full bg-primary-1" />
          </div>
          <div className="flex items-center gap-2 text-primary-1">
            <Dice className="size-4" />
            <Typography variant="subtitle-md" className="uppercase tracking-wide">
              The contract settles
            </Typography>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {OUTCOMES.map((outcome) => {
            const isSuccess = outcome.tone === 'success';
            const accent = isSuccess ? 'text-success' : 'text-secondary-1';
            return (
              <div
                className={`rounded-lg border p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-1 ${
                  isSuccess
                    ? 'border-success/40 bg-success/5'
                    : 'border-secondary-1/40 bg-secondary-1/5'
                }`}
                key={outcome.id}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`flex size-10 items-center justify-center rounded-full ${
                      isSuccess
                        ? 'bg-success/15 text-success'
                        : 'bg-secondary-1/15 text-secondary-1'
                    }`}
                  >
                    {outcome.icon}
                  </span>
                  <div>
                    <Typography
                      variant="subtitle-md"
                      className="uppercase tracking-wide text-gray-1"
                    >
                      {outcome.caption}
                    </Typography>
                    <Typography variant="heading-5" className={`font-medium ${accent}`}>
                      {outcome.title}
                    </Typography>
                  </div>
                </div>
                <ul className="mt-4 space-y-2.5">
                  {outcome.points.map((point) => (
                    <li className="flex items-start gap-2.5" key={point}>
                      <span className={`mt-0.5 shrink-0 ${accent}`}>
                        {isSuccess ? <Check className="size-4" /> : <Return className="size-4" />}
                      </span>
                      <Typography variant="body-sm" className="text-gray-1">
                        {point}
                      </Typography>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
      <style>{`
        @keyframes about-flow-x { 0% { left: -10px; } 100% { left: calc(100% + 10px); } }
        @keyframes about-flow-y { 0% { top: -10px; } 100% { top: calc(100% + 10px); } }
        @media (prefers-reduced-motion: no-preference) {
          .about-flow-x { animation: about-flow-x 2.4s linear infinite; }
          .about-flow-y { animation: about-flow-y 1.7s linear infinite; }
        }
      `}</style>
    </CardContent>
  </Card>
);
