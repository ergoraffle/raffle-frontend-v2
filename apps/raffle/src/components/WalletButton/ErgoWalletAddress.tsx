'use client';

import { useCallback, useState } from 'react';

import { Button, Field, FieldError, FieldLabel, Input } from '@ergo-raffle/ui-kit';

import { validateAddress } from '@/actions';
import { useWallet } from '@/hooks';

export const ErgoWalletAddress = () => {
  const wallet = useWallet();

  const [address, setAddress] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>();
  const [hasError, setHasError] = useState<boolean>();

  const handleClick = useCallback(async () => {
    setHasError(false);
    setIsLoading(true);
    try {
      await validateAddress('ergo', address || '');

      wallet.setErgoAddress(address);
    } catch {
      setHasError(true);
    }
    setIsLoading(false);
  }, [address, wallet.setErgoAddress]);

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
        <Button
          disabled={!!isLoading}
          type="button"
          className="w-48"
          onClick={() => wallet.setCandidate(undefined)}
        >
          back
        </Button>
        <Button
          disabled={!!isLoading || !address}
          type="button"
          className="w-48"
          onClick={handleClick}
          variant="primary-soft"
        >
          next
        </Button>
      </div>
    </>
  );
};
