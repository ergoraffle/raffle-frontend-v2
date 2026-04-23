'use client';

import { useEffect, useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import {
  Button,
  Card,
  CardContent,
  Checkbox,
  Collapsible,
  CollapsibleContent,
  Field,
  FieldLabel,
  getDecimalString,
  Input,
  Typography,
  useBreakpoint,
  toast
} from '@ergo-raffle/ui-kit';

import { RaffleDonateMessage } from './RaffleDonateMessage';
import { useWallet } from '@/hooks';
import { donateRaffle } from '../services';
import type { InfoBlockchainResponse, RaffleDetailResponse } from '@ergo-raffle/client';

export type RaffleDonateProps = {
  infoBlockchain?: InfoBlockchainResponse;
  raffle: RaffleDetailResponse;
};

export const RaffleDonate = ({ infoBlockchain, raffle }: RaffleDonateProps) => {
  const wallet = useWallet();
  const [tickets, setTickets] = useState<number>(0);
  const [balance, setBalance] = useState<bigint>(0n);
  const { isMobile } = useBreakpoint();
  const [openCollapsible, setOpenCollapsible] = useState<boolean>(true);
  const [donateTransaction, setDonateTransaction] = useState<{ id: string }>();

  const handleDonateClick = async () => {
    try {
      await donateRaffle({ tickets }, wallet, infoBlockchain, raffle)

      toast.success('Raffle donated successfully!');
      
      // TODO
      // resetForm();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : 'Failed to donate raffle. Please try again later.'
      );
    }

    // TODO
    // if (openCollapsible) {
    //   setDonateTransaction({ id: 'fslkfnsdlosnvsoiefsofdvsldkjnsldknsdnsldn' });
    //   setTimeout(() => {
    //     setDonateTransaction(undefined);
    //   }, 10000);
    // } else {
    //   !isMobile && setOpenCollapsible(true);
    // }
  };

  useEffect(() => {
    setOpenCollapsible(isMobile);
  }, [isMobile]);

  useEffect(() => {
    wallet.selected?.getBalance(raffle?.token.id || '').then(setBalance).catch(() => alert('TODO'));
  }, [raffle?.token.id, wallet]);

  return (
    <div className="grow w-full relative">
      <Collapsible
        open={true}
        onOpenChange={setOpenCollapsible}
        className="relative z-10"
      >
        <CollapsibleContent>
          <Card className="mb-2 py-8">
            <CardContent className="flex items-stretch">
              {donateTransaction ? (
                <RaffleDonateMessage transactionId={donateTransaction.id} />
              ) : (
                <>
                  <div className="space-y-4 grow xl:max-w-1/2">
                    <div>
                      <Typography variant="heading-4" className="text-black-1 mb-1">
                        How many Tickets to Get?
                      </Typography>
                      {raffle.token ? (
                        <Typography variant="subtitle-md" className="text-gray-2">
                          each Ticket = {getDecimalString(raffle.ticketPrice, raffle.token.decimals)} {raffle.token.name}
                        </Typography>
                      ) : null}
                      your balance is: {getDecimalString(balance, raffle.token.decimals)}
                    </div>
                    <Field>
                      <Input type="number" value={tickets} onChange={(event) => setTickets(+event.target.value)} />
                    </Field>
                    <Field orientation="horizontal">
                      <Checkbox id="checkout-terms" />
                      <FieldLabel htmlFor="checkout-terms">
                        I Agree to the{' '}
                        <Link href="/terms" className="underline">
                          Terms of Use
                        </Link>
                      </FieldLabel>
                    </Field>
                  </div>
                  <div className="hidden sm:block relative w-1/2">
                    <Image
                      src="/illustrations/raffleDonateFormIllustration.svg"
                      alt="Donate"
                      fill
                      className="object-contain"
                    />
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </CollapsibleContent>
        <Button
          variant="primary"
          className="w-full"
          disabled={Boolean(donateTransaction)}
          onClick={handleDonateClick}
        >
          Donate
        </Button>
      </Collapsible>
      <div
        className={`hidden sm:block absolute bottom-0 left-0 z-9 h-48.5 w-full transition-all transition-duration-300 ${openCollapsible ? 'opacity-0' : 'opacity-100'}`}
      >
        <Image
          src="/illustrations/raffleDonateIllustration.svg"
          alt="Donate"
          className={`object-contain object-bottom`}
          fill
        />
      </div>
    </div>
  );
};
