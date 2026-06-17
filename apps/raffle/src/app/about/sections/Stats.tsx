import { Card, CardContent, Typography } from '@ergo-raffle/ui-kit';

import { CountUp } from '../CountUp';
import { CARD_LIFT, GLASS_SECTION } from '../ui';

const STATS = [
  { id: 'total-raised', value: '175,531', to: 175531, label: 'ERG raised' },
  { id: 'raffles-created', value: '199', to: 199, label: 'Raffles created' },
  { id: 'contributions', value: '2,259', to: 2259, label: 'Contributions' },
  { id: 'raffles-funded', value: '68', to: 68, label: 'Raffles funded' },
  { id: 'reward-erg', value: '6,834', to: 6834, label: 'ERG won by winners' }
];

export const Stats = () => (
  <Card className={GLASS_SECTION}>
    <CardContent>
      <div className="my-7 mx-auto max-w-5xl space-y-6">
        <div className="space-y-1 text-center">
          <Typography variant="heading-2" asChild>
            <h2>ErgoRaffle by the numbers</h2>
          </Typography>
          <Typography variant="subtitle-lg" className="text-gray-1">
            Real results from ErgoRaffle v1 on Ergo mainnet.
          </Typography>
        </div>
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-6">
          {STATS.map((stat, index) => (
            <div
              className={`rounded-md border border-gray-5 bg-gray-5/30 p-5 text-center lg:col-span-2 ${
                index === 3 ? 'lg:col-start-2' : ''
              } ${CARD_LIFT}`}
              key={stat.id}
            >
              <Typography variant="display-sm" className="text-primary-1">
                <CountUp to={stat.to} formatted={stat.value} />
              </Typography>
              <Typography variant="subtitle-lg" className="text-gray-1">
                {stat.label}
              </Typography>
            </div>
          ))}
        </div>
      </div>
    </CardContent>
  </Card>
);
