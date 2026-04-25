'use client';

import { Dice, UpLeft } from '@ergo-raffle/icons';
import {
  BasketStatus,
  Button,
  Field,
  FieldError,
  FieldLabel,
  getDecimalString,
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  Token,
  Typography
} from '@ergo-raffle/ui-kit';

import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { type AddGiftSchema, addGiftSchema } from '@/features/schemas';
import { AssetsField } from './AssetsField';
import { getRandomItem } from '@/lib';
import { useWallet } from '@/hooks';
import { useCallback, useEffect, useState } from 'react';
import { WalletToken } from '@ergo-raffle/base-wallet';
import { addGiftRaffle } from '@/features/services';

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

  const wallet = useWallet();

  const [assets, setAssets] = useState<(WalletToken & { balance?: string })[]>([]);

  const load = useCallback(async () => {
    if (wallet.selected?.name !== 'Nautilus') {
      throw new Error('Must be connected to Nautilus wallet.');
    }

    const tokens = await wallet.selected.fetchTokens();

    const promises = tokens.map((token) => wallet.selected?.fetchBalance(token.id));

    const balances = await Promise.all(promises);

    const result = tokens.map((token, index) => ({...token, balance: balances[index]}));

    return result;
  }, [wallet.selected]);

  useEffect(() => {
    load()
      .then((result) => {
        setAssets(result)
      })
      .catch(() => {
        // biome-ignore lint/suspicious/noAlert: TODO
        alert('TODO')
      })
  }, [load]);

  const setRandomBasket = () => {
    if (baskets && baskets.length > 0) {
      const randomIndex = getRandomItem(baskets);
      setValue('winnerIndex', randomIndex);
    }
  };

  const onSubmit = async (data: AddGiftSchema) => {
    try {
      // biome-ignore lint/suspicious/noConsole: TODO
      console.log(data);
      // await addGiftRaffle(data, wallet, infoBlockchainData, raffle);
    }
    catch (error) {
      // biome-ignore lint/suspicious/noConsole: TODO
      console.log(error);
    }
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
      <div className="min-h-36 md:min-h-auto max-h-36 overflow-y-auto scrollbar-hide space-y-4">
        {assets.map((asset) => (
          <Field key={asset.id}>
            <Token name={asset.name} tokenId={asset.name} size="lg" />
            <div className="flex items-center space-x-2">
              <InputGroup variant="bordered" size="sm">
                <InputGroupInput
                  type="number"
                  // value={asset.amount}
                  // onChange={(e) => onAmountChange(asset.tokenId, Number(e.target.value))}
                />
                <InputGroupAddon align="inline-end">
                  <Typography variant="subtitle-md" className="text-gray-3" asChild>
                    <span className="flex items-center space-x-1">
                      {getDecimalString(asset.balance, asset.decimals)} <UpLeft className="size-4" />
                    </span>
                  </Typography>
                </InputGroupAddon>
              </InputGroup>
              {/* <Typography variant="subtitle-sm" className="text-gray-3 whitespace-nowrap" asChild>
                <span>≈ 86 USDT</span>
              </Typography> */}
            </div>
          </Field>
        ))}
      </div>

      <div className="mt-4 flex flex-col">
        <Button variant="primary" size="sm" type="submit">
          Add Gift
        </Button>
      </div>
    </form>
  );
};
