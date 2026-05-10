'use client';

import { useEffect, useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import type { GetRaffleRaffleId200 } from '@ergo-raffle/client';
import {
  Button,
  Card,
  CardContent,
  Checkbox,
  Collapsible,
  CollapsibleContent,
  Field,
  FieldError,
  FieldLabel,
  Input,
  Spinner,
  Typography,
  toast,
  useBreakpoint
} from '@ergo-raffle/ui-kit';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { useWallet } from '@/hooks';
import { getDecimalString, getTxURL, saveTransactionId } from '@/lib';

import { type RaffleDonateForm, raffleDonateSchema } from '../schemas';
import { donateRaffle } from '../services';
import { RaffleDonateMessage } from './RaffleDonateMessage';

export type RaffleDonateProps = {
  raffle: GetRaffleRaffleId200;
};

export const RaffleDonate = ({ raffle }: RaffleDonateProps) => {
  const wallet = useWallet();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { isMobile } = useBreakpoint();
  const [openCollapsible, setOpenCollapsible] = useState<boolean>(false);
  const [donateTransactionId, setDonateTransactionId] = useState<string>();

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    setValue,
    formState: { errors }
  } = useForm<RaffleDonateForm>({
    resolver: zodResolver(raffleDonateSchema),
    defaultValues: { terms: false }
  });

  const resetForm = () => {
    setTimeout(() => {
      setDonateTransactionId(undefined);
      reset();
    }, 5000);
  };

  const onSubmit = async ({ tickets }: RaffleDonateForm) => {
    try {
      setIsLoading(true);
      const txId = await donateRaffle(raffle.id, { tickets }, wallet);

      toast.success(
        <>
          Raffle donated successfully! Click{' '}
          <Link className="text-primary-1" href={getTxURL(txId) || ''} target="_blank">
            here
          </Link>{' '}
          to see details.
        </>
      );

      saveTransactionId(txId);

      setDonateTransactionId(txId);

      resetForm();
    } catch (error) {
      toast.error('Failed to donate raffle. Please try again later.', { errorDetails: error });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    isMobile && setOpenCollapsible(true);
  }, [isMobile]);

  return (
    <div className="grow w-full relative md:h-66.5 lg:h-auto">
      {raffle.status === 'active' && (
        <Collapsible
          open={openCollapsible}
          onOpenChange={setOpenCollapsible}
          className="relative z-10"
        >
          <CollapsibleContent>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Card className="mb-2 py-8">
                <CardContent className="flex items-stretch">
                  {donateTransactionId ? (
                    <RaffleDonateMessage transactionId={donateTransactionId} />
                  ) : (
                    <>
                      <div className="space-y-4 grow xl:max-w-1/2">
                        <div>
                          <Typography variant="heading-4" className="text-black-1 mb-1">
                            How many Tickets to Get?
                          </Typography>
                          {raffle.token ? (
                            <Typography variant="subtitle-md" className="text-gray-2">
                              each Ticket ={' '}
                              {getDecimalString(raffle.ticketPrice, raffle.token.decimals)}{' '}
                              {raffle.token.name}
                            </Typography>
                          ) : null}
                        </div>
                        <Field>
                          <Input
                            type="number"
                            min={1}
                            aria-invalid={!!errors.tickets}
                            {...register('tickets', { valueAsNumber: true })}
                          />
                          {!!errors.tickets && <FieldError>{errors.tickets.message}</FieldError>}
                        </Field>
                        <Field orientation="horizontal">
                          <Checkbox
                            id="checkout-terms"
                            checked={getValues('terms')}
                            onClick={() => {
                              setValue('terms', !getValues('terms'), { shouldValidate: true });
                            }}
                          />
                          <div>
                            <FieldLabel htmlFor="checkout-terms" className="whitespace-nowrap">
                              I Agree to the{' '}
                              <Link href="/terms" className="underline whitespace-nowrap">
                                Terms of Use
                              </Link>
                            </FieldLabel>
                            {!!errors.terms && <FieldError>{errors.terms.message}</FieldError>}
                          </div>
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
              <Button
                type="submit"
                variant="primary"
                className="w-full"
                disabled={Boolean(donateTransactionId) || isLoading}
              >
                {!!isLoading && <Spinner className="size-7" />}
                Donate
              </Button>
            </form>
          </CollapsibleContent>
          {!openCollapsible && (
            <Button
              type="button"
              variant="primary"
              className="w-full"
              onClick={() => setOpenCollapsible(true)}
            >
              Donate
            </Button>
          )}
        </Collapsible>
      )}
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
