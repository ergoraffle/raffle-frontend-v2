'use client';

import { useCallback, useState } from 'react';

import { WalletError } from '@ergo-raffle/base-wallet';
import { Button, Field, FieldError, FieldLabel, Input, toast } from '@ergo-raffle/ui-kit';
import { validateAddress } from '@fleet-sdk/core';

import { useWallet } from '@/hooks';

export const ErgoWalletAddress = () => {
  const wallet = useWallet();

  const [address, setAddress] = useState<string>();
  const [hasError, setHasError] = useState<boolean>();

  const handleClick = useCallback(() => {
    const isValid = validateAddress(address || '');

    setHasError(!isValid);

    if (!isValid) return;

    wallet.setErgoAddress(address);

    wallet.connect(wallet.candidate).catch((error) => {
      toast.error('Failed to connect wallet.', {
        description: error instanceof WalletError ? error.message : undefined,
        errorDetails: error instanceof WalletError ? undefined : error
      });
      wallet.closeDialog();
    });
  }, [address, wallet.candidate, wallet.closeDialog, wallet.connect, wallet.setErgoAddress]);

  return (
    <>
      <Field>
        <FieldLabel>Enter your Ergo wallet address</FieldLabel>
        <Input
          value={address}
          variant="bordered"
          onChange={(e) => setAddress(e.target.value?.trim())}
        />
        {!!hasError && <FieldError>Address is not valid</FieldError>}
      </Field>
      <div className="flex items-center justify-between mt-4">
        <Button type="button" className="w-48" onClick={() => wallet.setCandidate(undefined)}>
          Back
        </Button>
        <Button
          disabled={!address}
          type="button"
          className="w-48"
          onClick={handleClick}
          variant="primary-soft"
        >
          Next
        </Button>
      </div>
    </>
  );
};
