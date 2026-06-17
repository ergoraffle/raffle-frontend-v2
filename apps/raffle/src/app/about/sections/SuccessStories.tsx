import { Ergo, Spark, User } from '@ergo-raffle/icons';
import { Card, CardContent, Typography } from '@ergo-raffle/ui-kit';

import { CARD_LIFT, GLASS_SECTION } from '../ui';

// Real funded raffles from the mainnet API (snapshot 2026-06-14):
//   raised   = item.erg / 1e9        supporters = item.donatedPeople
//   overfund = item.erg / item.goal  (e.g. ErgoHack VIII = 16.9×)
const STORIES = [
  {
    id: 'mexc-listing',
    name: 'MEXC Listing Raffle',
    raised: '28,675 ERG',
    supporters: '581',
    tag: 'Most raised'
  },
  {
    id: 'bitpanda-listing',
    name: 'Bitpanda Listing Fundraiser',
    raised: '8,622 ERG',
    supporters: '220',
    tag: '2nd most backers'
  },
  {
    id: 'onramper-banxa',
    name: 'Ergo Onramper & Banxa',
    raised: '22,605 ERG',
    supporters: '160',
    tag: 'Community Fundraiser'
  },
  {
    id: 'ergohack-prizes',
    name: 'ErgoHack VIII Prize Pool',
    raised: '8,462 ERG',
    supporters: '27',
    tag: '16.9× its goal'
  },
  {
    id: 'sigmanauts-treasury',
    name: 'Sigmanauts Treasury Fundraiser',
    raised: '5,344 ERG',
    supporters: '68',
    tag: 'Community treasury'
  },
  {
    id: 'skyharbor-nft',
    name: 'SkyHarbor NFT Initiative',
    raised: '7,207 ERG',
    supporters: '50',
    tag: 'Supporting anonymous devs'
  }
];

// TODO: fetch `/api/raffle?status=all` and rank by `erg`, `donatedPeople`, and `erg/goal`. Server component.
export const SuccessStories = () => (
  <Card className={GLASS_SECTION}>
    <CardContent>
      <div className="my-7 mx-auto max-w-5xl space-y-6">
        <div className="space-y-1 text-center">
          <Typography variant="heading-2" asChild>
            <h2>What the community has funded</h2>
          </Typography>
          <Typography variant="subtitle-lg" className="text-gray-1">
            Real funded raffles on mainnet — by raised, backers, and overfunding.
          </Typography>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {STORIES.map((story) => (
            <div
              className={`flex flex-col gap-3 rounded-md border border-gray-5 p-5 ${CARD_LIFT}`}
              key={story.id}
            >
              <Typography variant="subtitle-xl" className="grow">
                {story.name}
              </Typography>
              <div className="flex items-center gap-2 text-primary-1">
                <Ergo className="size-6" />
                <Typography variant="heading-4">{story.raised}</Typography>
              </div>
              <div className="flex items-center gap-1.5 text-gray-1">
                <User className="size-4" />
                <Typography variant="body-sm">{story.supporters} supporters</Typography>
              </div>
              {/* Highlight footer — replaces the old pill, sits at the bottom of every card. */}
              <div className="mt-auto flex items-center gap-1.5 border-t border-gray-5 pt-3 text-primary-1">
                <Spark className="size-4 shrink-0" />
                <Typography variant="subtitle-md" className="uppercase tracking-wide">
                  {story.tag}
                </Typography>
              </div>
            </div>
          ))}
        </div>
      </div>
    </CardContent>
  </Card>
);
