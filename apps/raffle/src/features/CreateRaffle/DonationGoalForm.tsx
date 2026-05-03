'use client';

import { useEffect, useMemo, useState } from 'react';

import type { WalletToken } from '@ergo-raffle/base-wallet';
import type { InfoBlockchainResponse } from '@ergo-raffle/client';
import {
  Button,
  DistributionBar,
  Field,
  FieldError,
  FieldLabel,
  Input,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Token,
  toast
} from '@ergo-raffle/ui-kit';
import { useFormContext } from 'react-hook-form';

import type { RaffleDonationGoalForm } from '@/features/schemas';
import { useWallet } from '@/hooks';
import { getErrorMessage } from '@/lib';

import { FieldTitle } from './FieldTitle';

export type DonationGoalFormProps = {
  handleNext: () => void;
  handleBack: () => void;
  infoBlockchain: InfoBlockchainResponse;
};

export const DonationGoalForm = ({
  handleNext,
  handleBack,
  infoBlockchain
}: DonationGoalFormProps) => {
  const {
    formState: { errors },
    register,
    watch,
    getValues,
    setValue
  } = useFormContext<RaffleDonationGoalForm>();

  const serviceFee = infoBlockchain.fee.service + infoBlockchain.fee.implementer;

  const [tokens, setTokens] = useState<WalletToken[]>([]);

  const wallet = useWallet();

  useEffect(() => {
    wallet.selected
      ?.fetchTokens()
      .then((tokens) => setTokens(tokens))
      .catch((error) => {
        toast.error(getErrorMessage(error, 'Failed to get wallet.'));
      });
  }, [wallet.selected]);

  const missionFund = watch('missionFund');

  const winnerPotShare = useMemo(
    () => (serviceFee && missionFund ? 100 - (missionFund + serviceFee) : 0),
    [missionFund, serviceFee]
  );

  useEffect(() => {
    setValue('winnerPotShare', winnerPotShare || 100 - serviceFee, {
      shouldValidate: true,
      shouldDirty: true
    });
  }, [winnerPotShare, setValue, serviceFee]);

  return (
    <div className="space-y-8">
      <div>
        <FieldTitle title="Base Token" />
        <div className="flex flex-col sm:flex-row gap-x-2 gap-y-3">
          <Field className="flex-1">
            <Select
              value={getValues('tokenId') ?? ''}
              onValueChange={(value) => setValue('tokenId', value)}
            >
              <SelectTrigger variant="bordered" className="mt-7.5" disabled={tokens.length === 0}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {tokens.map((token) => (
                    <SelectItem value={token.id} key={token.id} className="p-2">
                      <Token name={token.name} tokenId={token.id.toLowerCase()} />
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            {!!errors.tokenId && <FieldError>{errors.tokenId.message}</FieldError>}
          </Field>
          <Field className="flex-2">
            <FieldLabel>Token ID</FieldLabel>
            <Input variant="bordered" value={watch('tokenId') ?? ''} readOnly />
          </Field>
        </div>
      </div>
      <Field>
        <FieldTitle title="How many Token to collect?" />
        <Input
          variant="bordered"
          className="max-w-205"
          {...register('count', { valueAsNumber: true })}
          type="number"
          min={0}
        />
        {!!errors.count && <FieldError>{errors.count.message}</FieldError>}
      </Field>
      <Field>
        <FieldTitle title="Set each Ticket’s Price." />
        <div className="flex items-center gap-x-5">
          <Input
            variant="bordered"
            step="any"
            {...register('amount', { valueAsNumber: true })}
            className="max-w-205 grow"
            type="number"
            min={0}
          />
        </div>
        {!!errors.amount && <FieldError>{errors.amount.message}</FieldError>}
      </Field>
      <Field>
        <FieldTitle title="Set an address for the Mission’s Fund." />
        <Input variant="bordered" {...register('address')} className="max-w-125" />
        {!!errors.address && <FieldError>{errors.address.message}</FieldError>}
      </Field>
      <div className="space-y-3">
        <FieldTitle title="Set How to Distribute." />

        <DistributionBar
          service={serviceFee ?? 0}
          winnerPot={errors.winnerPotShare ? undefined : Number(winnerPotShare)}
          missionFund={errors.missionFund ? undefined : Number(missionFund)}
        />
        <div className="flex flex-col sm:flex-row gap-x-2 gap-y-3">
          <div className="sm:w-1/2 md:w-auto flex-1">
            <Field>
              <FieldLabel>Service</FieldLabel>
              <Input variant="bordered" disabled value={serviceFee} />
            </Field>
          </div>
          <div className="flex flex-col sm:flex-row flex-2 gap-x-2 gap-y-3">
            <Field className="flex-1">
              <FieldLabel>Winners Pot Share</FieldLabel>
              <Input
                variant="bordered"
                type="number"
                min={0}
                defaultValue={100 - serviceFee}
                max={100 - serviceFee}
                disabled
                {...register('winnerPotShare', { valueAsNumber: true })}
              />
              {!!errors.winnerPotShare && <FieldError>{errors.winnerPotShare.message}</FieldError>}
            </Field>
            <Field className="flex-1">
              <FieldLabel>Mission’s Fund</FieldLabel>
              <Input
                variant="bordered"
                defaultValue={0}
                {...register('missionFund', { valueAsNumber: true })}
              />
              {!!errors.missionFund && <FieldError>{errors.missionFund.message}</FieldError>}
            </Field>
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <Button type="button" variant="outline" className="w-32.5 sm:w-70" onClick={handleBack}>
          Back
        </Button>
        <Button type="button" variant="primary" className="w-32.5 sm:w-70" onClick={handleNext}>
          Next
        </Button>
      </div>
    </div>
  );
};
