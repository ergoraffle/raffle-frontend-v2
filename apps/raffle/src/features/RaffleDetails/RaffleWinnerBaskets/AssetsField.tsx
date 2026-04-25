'use client';

import { useLayoutEffect, useMemo, useRef, useState } from 'react';

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
  // Field,
  // InputGroup,
  // InputGroupAddon,
  // InputGroupInput,
  // Token,
  // Typography,
  useComboboxAnchor
} from '@ergo-raffle/ui-kit';
// import { UpLeft } from '@ergo-raffle/icons';

const tokens = [{ id: 'erg', name: 'Erg' }];

export type assetsValueType = {
  tokenId: string;
  amount?: number;
};

export type AssetsFieldProps = {
  values: assetsValueType[];
  onValueChange: (values: assetsValueType[]) => void;
};

export const AssetsField = ({ values, onValueChange }: AssetsFieldProps) => {
  const [containerReady, setContainerReady] = useState(false);
  const anchor = useComboboxAnchor();
  const portalContainerRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    if (portalContainerRef.current) {
      setContainerReady(true);
    }
  }, []);

  const tokenMap = useMemo(() => new Map(tokens.map((t) => [t.id, t])), []);

  const selectedIds = values.map((v) => v.tokenId);

  const handleValueChange = (newIds: string[]) => {
    const prevIds = selectedIds;

    const added = newIds.filter((id) => !prevIds.includes(id));
    const removed = prevIds.filter((id) => !newIds.includes(id));

    let next = values.filter((v) => !removed.includes(v.tokenId));

    if (added.length) {
      next = [
        ...next,
        ...added.map((id) => ({
          tokenId: id,
          amount: undefined
        }))
      ];
    }

    onValueChange(next);
  };

  return (
    <div>
      <div ref={portalContainerRef}>
        <Combobox
          multiple
          autoHighlight
          items={tokens}
          value={selectedIds}
          onValueChange={handleValueChange}
        >
          <ComboboxChips ref={anchor}>
            <ComboboxValue>
              {selectedIds.map((id) => (
                <ComboboxChip key={id}>{tokenMap.get(id)?.name ?? id}</ComboboxChip>
              ))}
              <ComboboxChipsInput placeholder="Choose assets" />
            </ComboboxValue>
          </ComboboxChips>
          {containerReady ? (
            <ComboboxContent anchor={anchor} portalContainerRef={portalContainerRef}>
              <ComboboxEmpty>No items found.</ComboboxEmpty>
              <ComboboxList>
                {(item: { id: string; name: string }) => (
                  <ComboboxItem key={item.id} value={item.id}>
                    {item.name}
                  </ComboboxItem>
                )}
              </ComboboxList>
            </ComboboxContent>
          ) : null}
        </Combobox>
      </div>
    </div>
  );
};
