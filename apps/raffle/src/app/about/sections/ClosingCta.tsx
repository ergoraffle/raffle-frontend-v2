import Image from 'next/image';
import Link from 'next/link';

import { Button, Card, CardContent, Typography } from '@ergo-raffle/ui-kit';

import { Confetti } from '../Confetti';
import { GLASS_SECTION, GRADIENT_TEXT } from '../ui';

export const ClosingCta = () => (
  <Card className={GLASS_SECTION}>
    <CardContent>
      {/* Celebratory confetti across the top of the card (decorative). */}
      <Confetti />
      <div className="relative my-7 mx-auto max-w-3xl space-y-6 text-center">
        {/* Brand artwork bookending the page (hands banner opens it, create art closes it). */}
        <div className="relative mx-auto h-28 w-full max-w-md sm:h-36">
          <Image
            src="/illustrations/createRaffleIllustration.svg"
            alt="Creating a raffle on Rafflora"
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, 448px"
          />
        </div>

        <div className="space-y-2">
          <Typography variant="display-sm" asChild>
            <h2 className={GRADIENT_TEXT}>Start a raffle in minutes</h2>
          </Typography>
          <Typography variant="body-lg" className="text-gray-1">
            Fund a cause, reward your community, and let the chain prove it was fair.
          </Typography>
        </div>

        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button variant="primary" size="lg" className="w-full sm:w-auto" asChild>
            <Link href="/raffles">Explore raffles</Link>
          </Button>
          <Button variant="outline" size="lg" className="w-full sm:w-auto" asChild>
            <Link href="/faq">Read the FAQ</Link>
          </Button>
        </div>

        <Typography variant="body-sm" className="text-gray-1">
          Rafflora is a decentralized dApp. It performs no identity, eligibility, or legality checks
          — you are responsible for compliance in your own jurisdiction. Not legal advice.
        </Typography>
      </div>
    </CardContent>
  </Card>
);
