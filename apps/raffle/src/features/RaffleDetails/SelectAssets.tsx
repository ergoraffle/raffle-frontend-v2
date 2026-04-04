'use client';

import { useLayoutEffect, useRef, useState } from 'react';

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
  const [containerReady, setContainerReady] = useState(false);
  const [value, setValue] = useState<string[]>([]);
  const anchor = useComboboxAnchor();
  const portalContainerRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    if (portalContainerRef.current) {
      setContainerReady(true);
    }
  }, []);

  return (
    <div ref={portalContainerRef}>
      <Combobox multiple autoHighlight items={assets} onValueChange={setValue} value={value}>
        <ComboboxChips ref={anchor}>
          <ComboboxValue>
            {value.map((value: string) => (
              <ComboboxChip key={value}>{value}</ComboboxChip>
            ))}
            <ComboboxChipsInput placeholder="Choose assets" />
          </ComboboxValue>
        </ComboboxChips>
        {containerReady ? (
          <ComboboxContent anchor={anchor} portalContainerRef={portalContainerRef}>
            <ComboboxEmpty>No items found.</ComboboxEmpty>
            <ComboboxList>
              {(item: string) => (
                <ComboboxItem key={item} value={item}>
                  {item}
                </ComboboxItem>
              )}
            </ComboboxList>
          </ComboboxContent>
        ) : null}
      </Combobox>
    </div>
  );
};
