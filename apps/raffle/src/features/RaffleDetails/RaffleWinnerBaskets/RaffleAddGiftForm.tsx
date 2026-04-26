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

import { useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { type AddGiftForm, addGiftSchema } from '@/features/schemas';
import { AssetsField } from './AssetsField';
import { getRandomItem } from '@/lib';
import { useWallet } from '@/hooks';
import { useCallback, useEffect, useState } from 'react';
import type { WalletToken } from '@ergo-raffle/base-wallet';

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
  } = useForm<AddGiftForm>({
    resolver: zodResolver(addGiftSchema),
    defaultValues: {
      winnerIndex: initialBasketNumber
    }
  });
  const { fields: tokenFields } = useFieldArray({
    control,
    name: 'tokens'
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

    const result = tokens.map((token, index) => ({ ...token, balance: balances[index] }));

    return result;
  }, [wallet.selected]);

  useEffect(() => {
    load()
      .then((result) => {
        setAssets(result);
      })
      .catch(() => {
        // biome-ignore lint/suspicious/noAlert: TODO
        alert('TODO');
      });
  }, [load]);

  const setRandomBasket = () => {
    if (baskets && baskets.length > 0) {
      const randomIndex = getRandomItem(baskets);
      setValue('winnerIndex', randomIndex);
    }
  };

  const onSubmit = async (data: AddGiftForm) => {
    try {
      // biome-ignore lint/suspicious/noConsole: TODO
      console.log(data);
      // await addGiftRaffle(data, wallet, infoBlockchainData, raffle);
    } catch (error) {
      // biome-ignore lint/suspicious/noConsole: TODO
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
      <div className="flex items-center space-x-2">
        <Field>
          <FieldLabel>Basket's Number</FieldLabel>
          <InputGroup variant="bordered">
            <InputGroupInput
              min={1}
              {...register('winnerIndex', { valueAsNumber: true })}
              type="number"
            />
            <InputGroupAddon align="inline-start">
              <BasketStatus filled hasGift className="size-6" />
            </InputGroupAddon>
          </InputGroup>
          {!!errors.winnerIndex && <FieldError>{errors.winnerIndex.message}</FieldError>}
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
        <AssetsField
          tokens={assets}
          values={watch('tokens') ?? []}
          onValueChange={(val) => {
            setValue('tokens', val, {
              shouldValidate: false,
              shouldDirty: true
            });
          }}
        />
      </Field>
      <div className="min-h-36 md:min-h-auto max-h-36 overflow-y-auto scrollbar-hide space-y-4">
        {tokenFields.map((asset, index) => (
          <Field key={asset.id}>
            <Token
              name={assets.find((i) => i.id === asset.tokenId)?.name}
              tokenId={asset.id}
              size="lg"
            />
            <div className="flex items-center space-x-2">
              <InputGroup variant="bordered" size="sm">
                <InputGroupInput
                  {...register(`tokens.${index}.amount`, {
                    setValueAs: (v) => (v === '' ? undefined : BigInt(v))
                  })}
                />
                <InputGroupAddon align="inline-end">
                  <Typography variant="subtitle-md" className="text-gray-3" asChild>
                    <span className="flex items-center space-x-1">
                      {getDecimalString(
                        assets.find((i) => i.id === asset.tokenId)?.balance,
                        assets.find((i) => i.id === asset.tokenId)?.decimals
                      )}{' '}
                      <UpLeft className="size-4" />
                    </span>
                  </Typography>
                </InputGroupAddon>
              </InputGroup>
              {/* <Typography variant="subtitle-sm" className="text-gray-3 whitespace-nowrap" asChild>
                <span>≈ 86 USDT</span>
              </Typography> */}
            </div>
            {!!errors.tokens && errors.tokens[index]?.amount && (
              <FieldError>{errors.tokens[index]?.amount?.message}</FieldError>
            )}
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
