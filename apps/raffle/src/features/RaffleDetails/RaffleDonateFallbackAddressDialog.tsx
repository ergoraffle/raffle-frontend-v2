'use client';

import { useCallback, useState } from 'react';

import Link from 'next/link';

import { Clipboard, Download } from '@ergo-raffle/icons';
import {
  Button,
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  cn,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  Field,
  FieldError,
  FieldLabel,
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  Spinner,
  Tooltip,
  Typography,
  toast
} from '@ergo-raffle/ui-kit';
import { validateAddress } from '@fleet-sdk/core';
import ReCAPTCHA from 'react-google-recaptcha';

export type RaffleDonateFallbackAddressDialogProps = {
  isSubmitting?: boolean;
  open: boolean;
  siteKey: string;
  onCaptchaChange: (token: string) => void;
  onOpenChange: (open: boolean) => void;
  onSubmit: (params: { address: string }) => void;
};

export const RaffleDonateFallbackAddressDialog = ({
  isSubmitting,
  open,
  siteKey,
  onCaptchaChange,
  onOpenChange,
  onSubmit
}: RaffleDonateFallbackAddressDialogProps) => {
  const [address, setAddress] = useState<string>();
  const [hasError, setHasError] = useState<boolean>();
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number>(0);

  const options = [
    {
      title: 'External Wallet',
      description: 'Use an external Ergo wallet like Nautilus to create your own wallet.',
      content: (
        <>
          Follow this{' '}
          <Link href="/" target="_blank" className="text-primary-1 hover:underline">
            external link
          </Link>
          . Create a wallet, copy your wallet address, and paste it into the following input field.
        </>
      )
    },
    {
      title: 'Paper Wallet',
      description: 'Generate a paper wallet using an external tool.',
      //TODO: replace with actual content when feature is implemented
      content: (
        <>
          Follow this{' '}
          <Link href="/" target="_blank" className="text-primary-1 hover:underline">
            external link
          </Link>
          . Create a wallet.
        </>
      )
    },
    {
      title: 'Instant Paper Wallet',
      description: 'We generate a paper wallet for you directly on this site.',
      //TODO: replace with actual content when feature is implemented
      content: (
        <div className="flex justify-between items-center">
          sample content for instant paper wallet.
          <Tooltip content="Download paper wallet">
            <Button variant="primary-soft" size="icon">
              <Download />
            </Button>
          </Tooltip>
        </div>
      )
    }
  ];

  const handleClick = useCallback(() => {
    const isValid = validateAddress(address || '');

    setHasError(!isValid);

    if (!isValid) return;

    onSubmit({ address: address || '' });
  }, [address, onSubmit]);

  const handleCopy = useCallback(() => {
    if (!address) return;

    navigator.clipboard
      .writeText(address)
      .then(() => {
        toast.success('Address copied to clipboard');
      })
      .catch(() => {
        return;
      });
  }, [address]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="min-w-xl">
        <DialogHeader>
          <DialogTitle>Fallback Address</DialogTitle>
          <DialogDescription>TODO</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <Typography variant="body-md" className="text-gray-2">
            To ensure you can receive funds in case of an error or return transaction, please
            provide a valid wallet address before completing the donut tasks. You can obtain one
            through any of the options below.
          </Typography>
          <div className="items-center gap-4 hidden md:flex">
            {options.map((option, index) => (
              // biome-ignore lint/a11y: using div as button intentionally
              <div
                onClick={() => setSelectedOptionIndex(index)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    setSelectedOptionIndex(index);
                  }
                }}
                key={option.title}
                className={cn(
                  'flex-1 rounded-md border border-primary-1 text-black-2 p-4 relative',
                  selectedOptionIndex === index
                    ? 'bg-primary-5  before:absolute before:border-primary-1 before:left-1/2 before:-translate-x-1/2 before:-bottom-2  before:border-r-16 before:border-t-16 before:-rotate-135 before:border-l-transparent before:border-r-transparent before:border-t-black'
                    : ''
                )}
              >
                <Typography variant="heading-5">{option.title}</Typography>
                <Typography variant="subtitle-md">{option.description}</Typography>
              </div>
            ))}
          </div>
          <div className="bg-gray-5 text-gray-5-foreground rounded-md p-4 hidden md:block">
            <Typography variant="body-sm" asChild>
              {options[selectedOptionIndex].content}
            </Typography>
          </div>
          <div className="md:hidden space-y-2">
            {options.map((option, index) => (
              <Collapsible
                key={option.title}
                open={selectedOptionIndex === index}
                onOpenChange={(open) => {
                  setSelectedOptionIndex(open ? index : -1);
                }}
              >
                <CollapsibleTrigger asChild>
                  <div
                    className={cn(
                      'flex-1 rounded-md border border-primary-1 text-black-2 p-4 relative',
                      selectedOptionIndex === index
                        ? 'bg-primary-5  before:absolute before:border-primary-1 before:left-1/2 before:-translate-x-1/2 before:-bottom-1.5  before:border-r-12 before:border-t-12 before:-rotate-135 before:border-l-transparent before:border-r-transparent before:border-t-black'
                        : ''
                    )}
                  >
                    <Typography variant="heading-5">{option.title}</Typography>
                    <Typography variant="subtitle-md">{option.description}</Typography>
                  </div>
                </CollapsibleTrigger>
                <CollapsibleContent className="bg-gray-5 text-gray-5-foreground rounded-md p-4 mt-2">
                  <Typography variant="body-sm" asChild>
                    {option.content}
                  </Typography>
                </CollapsibleContent>
              </Collapsible>
            ))}
          </div>

          <Field>
            <FieldLabel>Fallback Address</FieldLabel>
            <InputGroup>
              <InputGroupInput
                value={address}
                variant="bordered"
                onChange={(e) => setAddress(e.target.value?.trim())}
              />
              <InputGroupAddon align="inline-end">
                <Button variant="plain" size="icon-xs" onClick={handleCopy} disabled={!address}>
                  <Clipboard />
                </Button>
              </InputGroupAddon>
            </InputGroup>
            {!!hasError && <FieldError>Address is not valid</FieldError>}
          </Field>
          <div className="flex items-center justify-center h-20">
            <ReCAPTCHA sitekey={siteKey} onChange={(token) => onCaptchaChange(token || '')} />
          </div>
          <div className="flex items-center justify-center mt-4">
            <Button
              disabled={!address || isSubmitting}
              type="button"
              className="w-full lg:w-120"
              onClick={handleClick}
              variant="primary"
            >
              {!!isSubmitting && <Spinner />} Submit
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
