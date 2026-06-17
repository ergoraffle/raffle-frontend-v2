import { BitcoinRunes, HandCoin, Ticket } from '@ergo-raffle/icons';
import { Card, CardContent, Typography } from '@ergo-raffle/ui-kit';

import { CARD_LIFT, GLASS_SECTION } from '../ui';

const TRACKS = [
  {
    id: 'creators',
    icon: <HandCoin className="size-6" />,
    title: 'For creators',
    steps: [
      {
        id: 1,
        title: 'Create',
        description: 'Set goal, ticket price, deadline, winners, and split.'
      },
      {
        id: 2,
        title: 'Share',
        description: 'Backers buy tickets; anyone can add gift prizes.'
      },
      {
        id: 3,
        title: 'Get funded',
        description: 'Goal met → your share releases, winners draw automatically.'
      }
    ]
  },
  {
    id: 'supporters',
    icon: <Ticket className="size-6" />,
    title: 'For supporters',
    steps: [
      {
        id: 1,
        title: 'Buy tickets',
        description: 'More tickets = higher odds. Set your payout address.'
      },
      {
        id: 2,
        title: 'Wait',
        description: 'The deadline is an Ergo block height — tamper-proof.'
      },
      {
        id: 3,
        title: 'Claim',
        description: 'Win your basket, or claim a full refund if it fails.'
      }
    ]
  }
];

export const HowItWorks = () => (
  <Card className={GLASS_SECTION}>
    <CardContent>
      <div id="how-it-works" className="my-7 mx-auto max-w-5xl space-y-8 scroll-mt-24">
        <Typography variant="heading-2" asChild className="text-center">
          <h2>How it works</h2>
        </Typography>
        <div className="grid gap-6 md:grid-cols-2">
          {TRACKS.map((track) => (
            <div
              className={`rounded-md border border-gray-5 p-5 space-y-4 ${CARD_LIFT}`}
              key={track.id}
            >
              <div className="flex items-center gap-2 text-primary-1">
                {track.icon}
                <Typography variant="subtitle-xl" className="text-foreground">
                  {track.title}
                </Typography>
              </div>
              <ol className="space-y-4">
                {track.steps.map((step) => (
                  <li className="flex gap-3" key={step.id}>
                    <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary-1 text-primary-1-foreground typo-subtitle-md">
                      {step.id}
                    </span>
                    <div className="space-y-1">
                      <Typography variant="subtitle-lg">{step.title}</Typography>
                      <Typography variant="body-md" className="text-gray-1">
                        {step.description}
                      </Typography>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </div>
        <div className="flex items-start gap-3 rounded-md bg-secondary-6 p-5 text-secondary-6-foreground">
          <BitcoinRunes className="size-7 shrink-0 text-secondary-1" />
          <Typography variant="body-md">
            Donate with Bitcoin or Runes too — they arrive as Rosen Bridge–wrapped rsBTC / rsRunes,
            no manual bridging. Live on testnet and mainnet.
          </Typography>
        </div>
      </div>
    </CardContent>
  </Card>
);
