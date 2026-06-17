import {
  BitcoinRunes,
  Dice,
  Ergo,
  GiftPlus,
  Share,
  Verified,
  Votes,
  Wallet
} from '@ergo-raffle/icons';
import { Card, CardContent, Typography } from '@ergo-raffle/ui-kit';

import { GLASS_SECTION } from '../ui';

const FEATURES = [
  {
    id: 'verifiable-draws',
    icon: <Dice className="size-7" />,
    title: 'Verifiable draws',
    description: 'Winners from an on-chain oracle — re-checkable by anyone.'
  },
  {
    id: 'any-asset',
    icon: <Ergo className="size-7" />,
    title: 'Any Ergo asset',
    description: 'Goals in ERG or any token, bridged assets included.'
  },
  {
    id: 'gifts',
    icon: <GiftPlus className="size-7" />,
    title: 'Gifts from anyone',
    description: 'Backers can pile tokens or NFTs into the baskets.'
  },
  {
    id: 'multi-winner',
    icon: <Votes className="size-7" />,
    title: 'Multiple winners',
    description: 'Split the prize pool across as many as you like.'
  },
  {
    id: 'btc-runes',
    icon: <BitcoinRunes className="size-7" />,
    title: 'BTC & Runes',
    description: 'Donate cross-chain via the Rosen Bridge proxy.'
  },
  {
    id: 'self-custody',
    icon: <Wallet className="size-7" />,
    title: 'Your keys',
    description: 'Nautilus or Xverse — you sign every action.'
  },
  {
    id: 'decentralized',
    icon: <Share className="size-7" />,
    title: 'Fully decentralized',
    description: 'Skip the UI and hit the contracts direct.'
  },
  {
    id: 'transparent-fees',
    icon: <Verified className="size-7" />,
    title: 'Transparent fees',
    description: 'One ~5% protocol fee, only on success.'
  }
];

export const Features = () => (
  <Card className={GLASS_SECTION}>
    <CardContent>
      <div className="my-7 mx-auto max-w-5xl space-y-8">
        <Typography variant="heading-2" asChild className="text-center">
          <h2>Built for trustless fundraising</h2>
        </Typography>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((feature) => (
            <div
              className="group/feat flex flex-col items-center gap-2 rounded-md border border-gray-5 p-5 text-center transition-all duration-300 hover:-translate-y-1 hover:border-primary-1/40 hover:shadow-1"
              key={feature.id}
            >
              <span className="flex size-14 items-center justify-center rounded-full bg-primary-6 text-primary-1 transition-transform group-hover/feat:scale-110">
                {feature.icon}
              </span>
              <Typography variant="heading-5" className="font-medium">
                {feature.title}
              </Typography>
              <Typography variant="body-md" className="text-gray-1">
                {feature.description}
              </Typography>
            </div>
          ))}
        </div>
      </div>
    </CardContent>
  </Card>
);
