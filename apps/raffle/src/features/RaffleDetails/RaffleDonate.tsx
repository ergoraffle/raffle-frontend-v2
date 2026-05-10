'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import type { RaffleDetailResponse, TokensBridgeableResponse } from '@ergo-raffle/client';
import {
  Button,
  Card,
  CardContent,
  Checkbox,
  Collapsible,
  CollapsibleContent,
  Dialog,
  DialogContent,
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
import ReCAPTCHA from 'react-google-recaptcha';
import { useForm } from 'react-hook-form';

import { getInfo, getTokensBridgeable } from '@/actions';
import { useWallet } from '@/hooks';
import {
  getDecimalString,
  getTxURL,
  saveTransactionId,
  type WalletInstance,
  type WalletName
} from '@/lib';

import { type RaffleDonateForm, raffleDonateSchema } from '../schemas';
import { donateRaffle } from '../services';
import { RaffleDonateMessage } from './RaffleDonateMessage';

export type RaffleDonateProps = {
  raffle: RaffleDetailResponse;
};

export const RaffleDonate = ({ raffle }: RaffleDonateProps) => {
  const { isMobile } = useBreakpoint();

  const wallet = useWallet();

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [bridgeableData, setBridgeableData] = useState<TokensBridgeableResponse>();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [openCollapsible, setOpenCollapsible] = useState<boolean>(false);
  const [donateTransactionId, setDonateTransactionId] = useState<string>();
  const [siteKey, setSiteKey] = useState<string>();
  const [recaptcha, setRecaptcha] = useState<string>();
  const [network, setNetwork] = useState<'ergo' | 'bitcoin'>();

  const needCaptcha = useMemo(() => wallet.selected?.name === 'Xverse', [wallet.selected]);

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

  const load = useCallback(() => {
    setIsLoading(true);

    setBridgeableData(undefined);

    Promise.all([getTokensBridgeable({ tokenId: raffle.token.id }), getInfo()])
      .then(([bridgeableResponse, infoResponse]) => {
        setBridgeableData(bridgeableResponse);
        setSiteKey(infoResponse.siteKey);
      })
      .catch((error) => {
        toast.error('TODO 1', { errorDetails: error });
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [raffle]);

  const resetForm = useCallback(() => {
    setTimeout(() => {
      setDonateTransactionId(undefined);
      reset();
    }, 5000);
  }, [reset]);

  const selectNetwork = (network: 'ergo' | 'bitcoin') => {
    setNetwork(network);
    const names: WalletName[] = [];

    if (!bridgeableData) {
      // do noting
    } else if (network === 'bitcoin' && bridgeableData.bridgeable) {
      names.push('Xverse');
    } else if (network === 'bitcoin' && !bridgeableData.bridgeable) {
      // do noting
    } else if (network === 'ergo' && bridgeableData.bridgeable) {
      names.push('Nautilus');
    } else if (network === 'ergo' && !bridgeableData.bridgeable) {
      names.push('Nautilus');
    }

    setIsOpen(false);

    wallet
      .openDialog(names)
      .then(async (walletInstance) => {
        if (!walletInstance) {
          await wallet.closeDialog();
          setIsOpen(false);
        }
        if (walletInstance?.name === 'Nautilus') {
          setIsOpen(false);
          setTimeout(() => submit(walletInstance), 0);
        }
      })
      .finally(() => {
        setIsOpen(true);
      });
  };

  const submit = useCallback(
    async (walletInstance?: WalletInstance) => {
      try {
        setIsOpen(false);

        setIsSubmitting(true);

        const txId = await donateRaffle(
          raffle.id,
          { tickets: getValues().tickets, recaptcha },
          walletInstance || wallet.selected
        );

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
        setIsSubmitting(false);
      }
    },
    [getValues, raffle, recaptcha, resetForm, wallet]
  );

  const onSubmit = () => {
    setNetwork(undefined);
    setBridgeableData(undefined);
    setIsOpen(true);
    load();
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
                disabled={Boolean(donateTransactionId) || isLoading || isSubmitting}
              >
                {(!!isLoading || isSubmitting) && <Spinner className="size-7" />}
                {isSubmitting ? 'Submitting' : 'Donate'}
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
      <Dialog open={!wallet.open && isOpen} onOpenChange={(open) => !open && setIsOpen(false)}>
        <DialogContent>
          {needCaptcha && (
            <>
              {!!isLoading && <div>loading</div>}
              {!isLoading && (
                <ReCAPTCHA
                  sitekey={siteKey || ''}
                  onChange={(token) => setRecaptcha(token || undefined)}
                />
              )}
              <button disabled={isLoading || isSubmitting} type="button" onClick={() => submit()}>
                submit
              </button>
            </>
          )}
          {!network && (
            <>
              <button
                disabled={isLoading || !bridgeableData}
                type="button"
                onClick={() => selectNetwork('ergo')}
              >
                ergo {!!isLoading && <div>loading</div>}
              </button>
              <button
                disabled={isLoading || !bridgeableData || !bridgeableData.bridgeable}
                type="button"
                onClick={() => selectNetwork('bitcoin')}
              >
                bitcoin {!!isLoading && <div>loading</div>}
              </button>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};
