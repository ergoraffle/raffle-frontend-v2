'use client';

import { Dice } from '@ergo-raffle/icons';
import {
  BasketStatus,
  Button,
  Field,
  FieldError,
  FieldLabel,
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  Typography
} from '@ergo-raffle/ui-kit';

import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { type AddGiftSchema, addGiftSchema } from '@/features/schemas';
import { AssetsField } from './AssetsField';
import { getRandomItem } from '@/lib';

export type RaffleAddGiftFormProps = {
  initialBasketNumber?: number;
  baskets?: number[];
};

export const RaffleAddGiftForm = ({ initialBasketNumber, baskets }: RaffleAddGiftFormProps) => {
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
    control,
    setValue
  } = useForm<AddGiftSchema>({
    resolver: zodResolver(addGiftSchema),
    defaultValues: { winnerIndex: initialBasketNumber }
  });

  const setRandomBasket = () => {
    if (baskets && baskets.length > 0) {
      const randomIndex = getRandomItem(baskets);
      setValue('winnerIndex', randomIndex);
    }
  };

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex items-center space-x-2">
        <Field>
          <FieldLabel>Basket's Number</FieldLabel>
          <InputGroup variant="bordered">
            <InputGroupInput {...register('winnerIndex', { valueAsNumber: true })} type="number" />
            <InputGroupAddon align="inline-start">
              <BasketStatus filled hasGift className="size-6" />
            </InputGroupAddon>
            {!!errors.winnerIndex && <FieldError>{errors.winnerIndex.message}</FieldError>}
          </InputGroup>
        </Field>
        <Button variant="plain" type="button" onClick={setRandomBasket}>
          <Dice className="size-6" />
          Random Basket
        </Button>
      </div>
      <div className="mt-2">
        <Typography variant="heading-5">Choose the Asset(s)</Typography>
        <Typography variant="heading-5" className="text-gray-2">
          They will all be added to Basket #{watch('winnerIndex')} as one Gift
        </Typography>
      </div>
      <Field>
        <Controller
          name="tokens"
          control={control}
          render={({ field }) => (
            <AssetsField
              values={field.value ?? []}
              onValueChange={(val) => {
                setValue('tokens', val, {
                  shouldValidate: false,
                  shouldDirty: true
                });
              }}
            />
          )}
        />
      </Field>
      {/* <div className="min-h-36 md:min-h-auto max-h-36 overflow-y-auto scrollbar-hide space-y-4">
        {values.map((asset) => (
          <Field key={asset.tokenId}>
            <Token
              name={tokens.find((i) => i.id === asset.tokenId)?.name}
              tokenId={asset.tokenId}
              size="lg"
            />
            <div className="flex items-center space-x-2">
              <InputGroup variant="bordered" size="sm">
                <InputGroupInput
                  type="number"
                  value={asset.amount}
                  onChange={(e) => onAmountChange(asset.tokenId, Number(e.target.value))}
                />
                <InputGroupAddon align="inline-end">
                  <Typography variant="subtitle-md" className="text-gray-3" asChild>
                    <span className="flex items-center space-x-1">
                      249.14 <UpLeft className="size-4" />
                    </span>
                  </Typography>
                </InputGroupAddon>
              </InputGroup>
              <Typography variant="subtitle-sm" className="text-gray-3 whitespace-nowrap" asChild>
                <span>≈ 86 USDT</span>
              </Typography>
            </div>
          </Field>
        ))}
      </div> */}

      <div className="mt-4 flex flex-col">
        <Button variant="primary" size="sm" type="submit">
          Add Gift
        </Button>
      </div>
    </form>
  );
};
