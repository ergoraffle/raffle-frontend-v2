'use client';

import { useState } from 'react';

import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxItem,
  ComboboxList,
  ComboboxValue,
  useComboboxAnchor
} from '@ergo-raffle/ui-kit';

const assets = ['erg', 'ada', 'btc'];

export const SelectAssets = () => {
  const [value, setValue] = useState<string[]>([]);
  const anchor = useComboboxAnchor();

  return (
    <Combobox multiple autoHighlight items={assets} onValueChange={setValue} value={value}>
      <ComboboxChips ref={anchor}>
        <ComboboxValue>
          {value.map((value: string) => (
            <ComboboxChip key={value}>{value}</ComboboxChip>
          ))}
          <ComboboxChipsInput placeholder="Choose assets" />
        </ComboboxValue>
      </ComboboxChips>
      <ComboboxContent anchor={anchor}>
        <ComboboxEmpty>No items found.</ComboboxEmpty>
        <ComboboxList>
          {(item: string) => (
            <ComboboxItem key={item} value={item}>
              {item}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
};
