import { useMemo } from 'react';

import { Info } from '@ergo-raffle/icons';
import {
  BasketStatus,
  Button,
  Field,
  FieldError,
  FieldLabel,
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  PercentageDistribution,
  Progress,
  Tooltip,
  Typography
} from '@ergo-raffle/ui-kit';
import { Controller, useFormContext } from 'react-hook-form';

import type { RaffleBasketsForm, RaffleDonationGoalForm } from '../schemas';
import { FieldTitle } from './FieldTitle';

export type BasketsFormProps = {
  handleNext: () => void;
  handleBack: () => void;
};

export const BasketsForm = ({ handleNext, handleBack }: BasketsFormProps) => {
  const {
    formState: { errors },
    register,
    watch,
    control,
    setValue
  } = useFormContext<RaffleBasketsForm & RaffleDonationGoalForm>();

  const winnerPotShare = watch('winnerPotShare', 0);

  const details = watch('details');
  const filledSharePercent = useMemo(
    () => details.reduce((sum, item) => sum + item.percent * item.count, 0),
    [details]
  );

  return (
    <div className="space-y-8">
      <div>
        <Typography variant="heading-2">Create Baskets.</Typography>
        <Typography variant="body-md">
          Each winner gets a basket. It can hold part of the raffle share, gifts, both or none.
        </Typography>
      </div>
      <div className="space-y-3">
        <div>
          <FieldTitle title="Distribute Winners Pot between Share Baskets." />
          <Typography variant="body-md" className="mt-1 mb-3">
            Winners Pot: {winnerPotShare}% of Total Fund
          </Typography>
        </div>
        <Progress variant="box" value={filledSharePercent} max={100} />
      </div>
      <Field>
        <FieldLabel>Share Baskets Details</FieldLabel>
        <Controller
          name="details"
          control={control}
          render={({ field }) => (
            <PercentageDistribution
              items={field.value ?? []}
              onChange={(val) => {
                setValue('details', val, {
                  shouldValidate: false,
                  shouldDirty: true
                });
              }}
            />
          )}
        />
        {!!errors.details && <FieldError>{errors.details.message}</FieldError>}
      </Field>
      <div className="space-y-3">
        <FieldTitle title="Create Empty Baskets." />
        <Field>
          <FieldLabel>Empty Baskets</FieldLabel>
          <InputGroup className="max-w-70 w-full" variant="bordered">
            <InputGroupInput
              {...register('emptyBaskets', { valueAsNumber: true })}
              type="number"
              min={0}
            />
            <InputGroupAddon align="inline-start">
              <BasketStatus className="size-6" />
            </InputGroupAddon>
            <InputGroupAddon align="inline-end">
              <Tooltip content="These baskets do NOT include any share of the raffle, but anyone can add gifts to them during the Raffle.">
                <Info className="size-6" />
              </Tooltip>
            </InputGroupAddon>
          </InputGroup>
          {!!errors.emptyBaskets && <FieldError>{errors.emptyBaskets.message}</FieldError>}
        </Field>
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
