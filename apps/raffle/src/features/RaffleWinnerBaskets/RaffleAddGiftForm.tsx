'use client';

import { useState } from 'react';

import { Dice, UpLeft } from '@ergo-raffle/icons';
import {
  BasketStatus,
  Button,
  Field,
  FieldLabel,
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  Token,
  Typography
} from '@ergo-raffle/ui-kit';

import { SelectAssets } from '../SelectAssets';

export type RaffleAddGiftFormProps = {
  initialBasketNumber?: string;
};

export const RaffleAddGiftForm = ({ initialBasketNumber }: RaffleAddGiftFormProps) => {
  const [values, setValues] = useState<{
    basketNumber?: string;
    selectedAssets: { name: string; amount: number }[];
  }>({
    basketNumber: initialBasketNumber,
    selectedAssets: [
      { name: 'erg', amount: 0 },
      { name: 'doge', amount: 0 },
      { name: 'ada', amount: 0 },
      { name: 'btc', amount: 0 }
    ]
  });

  const onValueChange = (key: string, value: string) => {
    setValues({ ...values, [key]: value });
  };

  return (
    <>
      <div className="flex items-center space-x-2">
        <Field>
          <FieldLabel>Basket's Number</FieldLabel>
          <InputGroup variant="bordered">
            <InputGroupInput
              value={values.basketNumber}
              onChange={(e) => onValueChange('basketNumber', e.target.value)}
            />
            <InputGroupAddon align="inline-start">
              <BasketStatus filled hasGift className="size-6" />
            </InputGroupAddon>
          </InputGroup>
        </Field>
        <Button variant="plain">
          <Dice className="size-6" />
          Random Basket
        </Button>
      </div>
      <div className="mt-2">
        <Typography variant="heading-5">Choose the Asset(s)</Typography>
        <Typography variant="heading-5" className="text-gray-2">
          They will all be added to Basket #{values.basketNumber} as one Gift
        </Typography>
      </div>
      <Field>
        <SelectAssets />
      </Field>
      <div className="min-h-36 md:min-h-auto max-h-36 overflow-y-auto scrollbar-hide space-y-4">
        {values.selectedAssets.map((asset) => (
          <Field key={asset.name}>
            <Token name={asset.name} tokenId={asset.name} size="lg" />
            <div className="flex items-center space-x-2">
              <InputGroup variant="bordered" size="sm">
                <InputGroupInput
                  value={asset.amount}
                  onChange={(e) => onValueChange('basketNumber', e.target.value)}
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
      </div>
      <div className="mt-4 flex flex-col">
        <Button variant="primary" size="sm">
          Add Gift
        </Button>
      </div>
    </>
  );
};
