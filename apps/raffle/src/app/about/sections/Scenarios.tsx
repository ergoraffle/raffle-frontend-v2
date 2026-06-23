import {
  Basket,
  Dice,
  Ergo,
  GiftPlus,
  HandCoin,
  PhotoScan,
  Spark,
  Verified,
  Votes
} from '@ergo-raffle/icons';
import { Card, CardContent, Typography } from '@ergo-raffle/ui-kit';

const SCENARIOS = [
  {
    id: 'crowdfunding',
    icon: <HandCoin className="size-8" />,
    title: 'Pure crowdfunding',
    description: 'Back a cause; the draw is a bonus, not the point.'
  },
  {
    id: 'lottery',
    icon: <Dice className="size-8" />,
    title: 'Pure lottery',
    description: 'Big prize pool, low ticket price, classic on-chain draw.'
  },
  {
    id: 'many-winners',
    icon: <Votes className="size-8" />,
    title: 'Many winners',
    description: 'Spread the pot across dozens of lucky backers.'
  },
  {
    id: 'nft-drop',
    icon: <PhotoScan className="size-8" />,
    title: 'NFT drops',
    description: 'Raffle off NFTs as the winner baskets.'
  },
  {
    id: 'reward-donors',
    icon: <GiftPlus className="size-8" />,
    title: 'Reward backers',
    description: 'Stack tokens & NFTs into baskets to sweeten the win.'
  },
  {
    id: 'physical-goods',
    icon: <Basket className="size-8" />,
    title: 'Physical & luxury goods',
    description: 'Draw winners on-chain for real-world prizes.'
  },
  {
    id: 'token-launch',
    icon: <Ergo className="size-8" />,
    title: 'Token distribution',
    description: 'Seed a new token across your community.'
  },
  {
    id: 'ecosystem',
    icon: <Verified className="size-8" />,
    title: 'Listings & dev funding',
    description: 'Rally a community to fund a milestone — proven on mainnet.'
  }
];

export const Scenarios = () => (
  <Card className="bg-primary-6/40 bg-blur">
    <CardContent>
      <div className="my-7 mx-auto max-w-5xl space-y-8">
        <div className="space-y-2 text-center">
          <div className="flex items-center justify-center gap-2 text-primary-1">
            <Spark className="size-4" />
            <Typography variant="subtitle-md" className="uppercase tracking-wide">
              Use cases
            </Typography>
            <Spark className="size-4" />
          </div>
          <Typography variant="heading-2" asChild>
            <h2>What you can build</h2>
          </Typography>
          <Typography variant="subtitle-lg" className="text-gray-1 max-w-2xl mx-auto">
            One primitive, many shapes — dial the prize and the goal however you like.
          </Typography>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {SCENARIOS.map((scenario) => (
            <div
              className="group/sc flex items-center gap-4 rounded-lg border border-gray-5 bg-white-2/60 bg-blur p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary-1 hover:shadow-1"
              key={scenario.id}
            >
              <span className="flex size-14 shrink-0 items-center justify-center rounded-lg bg-primary-1 text-primary-1-foreground transition-transform group-hover/sc:scale-110">
                {scenario.icon}
              </span>
              <div className="space-y-0.5">
                <Typography variant="heading-5" className="font-medium">
                  {scenario.title}
                </Typography>
                <Typography variant="body-md" className="text-gray-1">
                  {scenario.description}
                </Typography>
              </div>
            </div>
          ))}
        </div>
      </div>
    </CardContent>
  </Card>
);
