'use client';

import {
  Button,
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
  Typography
} from '@ergo-raffle/ui-kit';
import { useFormContext } from 'react-hook-form';

import { SERVICE_SHARE } from '../constants';
import type { RaffleDonationGoalForm } from '../schemas';
import { DistributionBar } from './DistributionBar';
import { FieldTitle } from './FieldTitle';

export type DonationGoalFormProps = {
  handleNext: () => void;
  handleBack: () => void;
};

const tokens = [
  { value: 'ADA', label: 'ADA' },
  { value: 'USDC', label: 'USDC' }
];

export const DonationGoalForm = ({ handleNext, handleBack }: DonationGoalFormProps) => {
  const {
    formState: { errors },
    reset,
    register,
    watch,
    getValues,
    setValue
  } = useFormContext<RaffleDonationGoalForm>();

  const missionFund = watch('missionFund');
  const winnerPotShare = watch('winnerPotShare');

  const onBack = () => {
    reset();
    handleBack();
  };

  return (
    <div className="space-y-8">
      <div>
        <FieldTitle title="Base Token" />
        <div className="flex flex-col sm:flex-row gap-x-2 gap-y-3">
          <Field className="flex-1">
            <Select
              value={getValues('tokenName')}
              onValueChange={(value) => setValue('tokenName', value)}
            >
              <SelectTrigger variant="bordered" className="mt-7.5">
                <SelectValue {...register('tokenName')} />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {tokens.map((item) => (
                    <SelectItem value={item.value} key={item.value}>
                      <Token name={item.label} />
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            {!!errors.tokenName && <FieldError>{errors.tokenName.message}</FieldError>}
          </Field>
          <Field className="flex-2">
            <FieldLabel>Token ID</FieldLabel>
            <Input variant="bordered" {...register('tokenId')} />
            {!!errors.tokenId && <FieldError>{errors.tokenId.message}</FieldError>}
          </Field>
        </div>
      </div>
      <Field>
        <FieldTitle title="How many Token to collect?" />
        <Input variant="bordered" className="max-w-205" {...register('count')} />
        {!!errors.count && <FieldError>{errors.count.message}</FieldError>}
      </Field>
      <Field>
        <FieldTitle title="Set each Ticket’s Price." />
        <div className="flex items-center gap-x-5">
          <Input variant="bordered" {...register('amount')} className="max-w-205 grow" />
          <Typography variant="subtitle-lg" className="text-gray-2 whitespace-nowrap">
            ≈ 34.67 USD
          </Typography>
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
          service={SERVICE_SHARE}
          winnerPot={errors.winnerPotShare ? undefined : Number(winnerPotShare)}
          missionFund={errors.missionFund ? undefined : Number(missionFund)}
        />
        <div className="flex flex-col sm:flex-row gap-x-2 gap-y-3">
          <div className="sm:w-1/2 md:w-auto flex-1">
            <Field>
              <FieldLabel>Service</FieldLabel>
              <Input variant="bordered" disabled value="5%" />
            </Field>
          </div>
          <div className="flex flex-col sm:flex-row flex-2 gap-x-2 gap-y-3">
            <Field className="flex-1">
              <FieldLabel>Mission’s Fund</FieldLabel>
              <Input
                variant="bordered"
                type="number"
                {...register('missionFund', { valueAsNumber: true })}
              />
              {!!errors.missionFund && <FieldError>{errors.missionFund.message}</FieldError>}
            </Field>
            <Field className="flex-1">
              <FieldLabel>Winners Pot Share</FieldLabel>
              <Input
                variant="bordered"
                type="number"
                {...register('winnerPotShare', { valueAsNumber: true })}
              />
              {!!errors.winnerPotShare && <FieldError>{errors.winnerPotShare.message}</FieldError>}
            </Field>
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <Button type="button" variant="outline" className="w-32.5 sm:w-70" onClick={onBack}>
          Back
        </Button>
        <Button type="button" variant="primary" className="w-32.5 sm:w-70" onClick={handleNext}>
          Next
        </Button>
      </div>
    </div>
  );
};
