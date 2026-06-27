import Image from 'next/image';

import { Typography } from '@ergo-raffle/ui-kit';

import { Aurora } from './Aurora';
import { Divider } from './Divider';
import { Reveal } from './Reveal';
import { Sparkles } from './Sparkles';
import {
  ClosingCta,
  Contracts,
  Features,
  HowItWorks,
  RaffleFlow,
  Scenarios,
  Stats,
  SuccessStories,
  WhatIsRaffle
} from './sections';
import { GRADIENT_TEXT } from './ui';

export const About = () => (
  <div className="relative isolate">
    <Aurora />
    <noscript>
      <style>{'.about-reveal{opacity:1!important;transform:none!important}'}</style>
    </noscript>
    <div className="mx-auto max-w-6xl space-y-7">
      <Reveal>
        <div className="relative">
          <Sparkles />
          <div className="relative text-center">
            <Typography variant="subtitle-xl" className="text-primary-1">
              Decentralized crowdfunding on Ergo
            </Typography>
            <Typography variant="display-md" asChild>
              <h1 className={`mt-5 ${GRADIENT_TEXT}`}>What is Rafflora?</h1>
            </Typography>
            <Typography variant="subtitle-xl" className="mt-4 text-gray-1">
              Crowdfunding with a built-in, provably-fair lottery — all on Ergo.
            </Typography>
            <Typography variant="body-sm" className="mt-1 text-gray-1">
              v2 runs on testnet today. v1 is live on mainnet at rafflora.com.
            </Typography>
          </div>
        </div>
      </Reveal>
      <Reveal delay={80}>
        <div className="about-float relative h-36 w-full sm:h-52">
          <Image
            src="/illustrations/raffleDonateIllustration.svg"
            alt="Hands passing crypto tokens along an orange thread"
            fill
            priority
            className="object-contain"
            sizes="(max-width: 1024px) 100vw, 1024px"
          />
        </div>
      </Reveal>
      <Reveal>
        <WhatIsRaffle />
      </Reveal>
      <Reveal>
        <HowItWorks />
      </Reveal>
      <Reveal>
        <Scenarios />
      </Reveal>
      <Reveal>
        <RaffleFlow />
      </Reveal>
      <Reveal>
        <Features />
      </Reveal>
      <Reveal>
        <Contracts />
      </Reveal>
      <Reveal>
        <Stats />
      </Reveal>
      <Divider />
      <Reveal>
        <SuccessStories />
      </Reveal>
      <Reveal>
        <ClosingCta />
      </Reveal>
    </div>
  </div>
);
