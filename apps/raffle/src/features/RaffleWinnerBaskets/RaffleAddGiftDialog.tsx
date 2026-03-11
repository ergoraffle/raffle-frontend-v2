'use client';

import { useState } from 'react';

// import { Search } from '@ergo-raffle/icons';
import {
  BasketStatus,
  // Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  Field,
  FieldLabel,
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  Token,
  Typography
} from '@ergo-raffle/ui-kit';

import { SelectAssets } from '../SelectAssets';

export type RaffleAddGiftDialogProps = {
  open: boolean;
  initialBasketNumber?: string;
  onOpenChange: (open: boolean) => void;
};

export const RaffleAddGiftDialog = ({
  open,
  initialBasketNumber,
  onOpenChange
}: RaffleAddGiftDialogProps) => {
  const [values, setValues] = useState<{
    basketNumber?: string;
    selectedAssets: { name: string; amount: number }[];
  }>({
    basketNumber: initialBasketNumber,
    selectedAssets: [{ name: 'erg', amount: 0 }]
  });

  const onValueChange = (key: string, value: string) => {
    setValues({ ...values, [key]: value });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="min-w-lg">
        <DialogHeader>
          <DialogTitle>Which Basket do you want to add Gift to?</DialogTitle>
        </DialogHeader>
        <Field>
          <FieldLabel>Basket's Number</FieldLabel>
          <InputGroup variant="bordered">
            <InputGroupInput
              value={values.basketNumber}
              onChange={(e) => onValueChange('basketNumber', e.target.value)}
            />
            <InputGroupAddon align="inline-start">
              <BasketStatus filled hasGift />
            </InputGroupAddon>
          </InputGroup>
        </Field>
        <div className="mt-2">
          <Typography variant="heading-5">Choose the Asset(s)</Typography>
          <Typography variant="heading-5" className="text-gray-2">
            They will all be added to Basket #{values.basketNumber} as one Gift
          </Typography>
        </div>
        <Field>
          <SelectAssets />
          {/* <InputGroup variant="bordered">
            <InputGroupInput
              value={values.basketNumber}
              onChange={(e) => onValueChange('basketNumber', e.target.value)}
              placeholder="Choose assets"
            />
            <InputGroupAddon align="inline-end">
              <Button size="icon-xs" variant="plain">
                <Search />
              </Button>
            </InputGroupAddon>
          </InputGroup> */}
        </Field>
        <div>
          {values.selectedAssets.map((asset) => (
            <Field key={asset.name}>
              <Token name={asset.name} tokenId={asset.name} />

              <InputGroup variant="bordered" size="sm">
                <InputGroupInput
                  value={asset.amount}
                  // onChange={(e) => onValueChange('basketNumber', e.target.value)}
                />
                <InputGroupAddon align="inline-end">
                  <Typography variant="subtitle-md" className="text-gray-3" asChild>
                    <span className="">249.14</span>
                  </Typography>
                </InputGroupAddon>
              </InputGroup>
            </Field>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};
