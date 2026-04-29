import { useMemo } from 'react';

import { Info } from '@ergo-raffle/icons';
import {
  BasketStatus,
  Button,
  Field,
  FieldError,
  FieldLabel,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  PercentageDistribution,
  Progress,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
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

const shareSplitMethods = [{ value: 'decreasingStep', label: 'Decreasing step' }];

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
        <div className="flex flex-col lg:flex-row  gap-x-5 gap-y-3">
          <Field className="sm:max-w-1/2 md:max-w-auto flex-1">
            <FieldLabel>Share Baskets</FieldLabel>
            <InputGroup variant="bordered">
              <InputGroupInput disabled />
              <InputGroupAddon align="inline-start">
                <BasketStatus className="size-6" filled />
              </InputGroupAddon>
              <InputGroupAddon align="inline-end">
                <Tooltip content="Share Baskets." disabled>
                  <Info className="size-6" />
                </Tooltip>
              </InputGroupAddon>
            </InputGroup>
          </Field>
          <div className="flex-2 flex flex-col sm:flex-row gap-x-5 gap-y-3">
            <Field className="flex-1">
              <FieldLabel>Share split Method</FieldLabel>
              <Select defaultValue="decreasingStep">
                <SelectTrigger variant="bordered" disabled>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {shareSplitMethods.map((item) => (
                      <SelectItem value={item.value} key={item.value}>
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </Field>
            <Field className="flex-1">
              <FieldLabel>Biggest Share</FieldLabel>
              <Input variant="bordered" disabled />
            </Field>
          </div>
        </div>
        <Field>
          <FieldLabel>Details</FieldLabel>
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
      </div>
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
              <Tooltip content="Empty Baskets.">
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
