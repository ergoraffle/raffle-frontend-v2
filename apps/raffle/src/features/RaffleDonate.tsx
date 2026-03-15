'use client';

import { useState } from 'react';

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
  Input,
  Typography,
  useBreakpoint
} from '@ergo-raffle/ui-kit';

export type RaffleDonateProps = { tokenName?: string };

export const RaffleDonate = ({ tokenName }: RaffleDonateProps) => {
  const { isMobile } = useBreakpoint();
  const [openCollapsible, setOpenCollapsible] = useState<boolean>(isMobile);
  const [showSuccessMessage, setShowSuccessMessage] = useState<boolean>(false);
  const handleDonateClick = () => {
    if (openCollapsible) {
      setShowSuccessMessage(true);
      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 10000);
    } else {
      !isMobile && setOpenCollapsible(true);
    }
  };
  return (
    <div className="grow w-full relative">
      <Collapsible
        open={openCollapsible}
        onOpenChange={setOpenCollapsible}
        className="relative z-10"
      >
        <CollapsibleContent>
          <Card className="mb-2 py-8">
            <CardContent className="flex items-stretch">
              {showSuccessMessage ? (
                <div className="flex flex-col">Massage</div>
              ) : (
                <>
                  <div className="space-y-4 grow xl:max-w-1/2">
                    <div>
                      <Typography variant="heading-4" className="text-black-1 mb-1">
                        How many Tickets to Get?
                      </Typography>
                      {tokenName ? (
                        <Typography variant="subtitle-md" className="text-gray-2">
                          each Ticket = 2 {tokenName}
                        </Typography>
                      ) : null}
                    </div>
                    <Field>
                      <Input />
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
          disabled={showSuccessMessage}
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
