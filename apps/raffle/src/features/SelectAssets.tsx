import {
  ComboboxContent,
  ComboboxItem,
  ComboboxList,
  ComboboxEmpty,
  Combobox,
  ComboboxChips,
  ComboboxValue,
  ComboboxChip,
  ComboboxChipsInput,
  useComboboxAnchor
} from '@ergo-raffle/ui-kit';
import { useState } from 'react';

const assets = ['erg', 'ada', 'btc'];

export const SelectAssets = () => {
  const [value, setValue] = useState<string[]>([]);
  const anchor = useComboboxAnchor();
  return (
    <Combobox multiple autoHighlight items={assets} onValueChange={setValue}>
      <ComboboxChips ref={anchor} className="w-full max-w-xs">
        <ComboboxValue>
          {value.map((value: string) => (
            <ComboboxChip key={value}>{value}</ComboboxChip>
          ))}
          <ComboboxChipsInput />
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
