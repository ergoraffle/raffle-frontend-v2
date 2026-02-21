import { useRef } from 'react';

import {
  Combobox,
  ComboboxClear,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxTrigger,
  ComboboxValue
} from './Combobox';

export type Item = { value: string; label: string };

export type MultiSelectComboboxProps = {
  items: Item[];
  selected: string[];
  onChange: (values: string[]) => void;
  placeholder?: string;
  searchable?: boolean;
};

export const MultiSelectCombobox = ({
  items,
  selected,
  onChange,
  placeholder,
  searchable
}: MultiSelectComboboxProps) => {
  const anchorRef = useRef<HTMLDivElement>(null);

  const displayValue = selected
    .map((val) => items.find((i) => i.value === val)?.label || val)
    .join(', ');

  const hasSelected = displayValue.length > 0;

  return (
    <Combobox items={items} multiple value={selected} onValueChange={onChange}>
      <div className="flex items-center w-full gap-2 relative" ref={anchorRef}>
        <ComboboxTrigger
          className={`grow rounded-l-lg h-11 flex items-center px-2.5 ${hasSelected ? 'bg-secondary-5' : 'bg-white-3 rounded-r-lg'}`}
        >
          {hasSelected ? <ComboboxValue>{displayValue}</ComboboxValue> : <span>{placeholder}</span>}
        </ComboboxTrigger>
        {hasSelected ? (
          <div className="bg-secondary-5 text-primary-1-foreground rounded-r-lg  px-1.5 h-11 flex items-center">
            <ComboboxClear />
          </div>
        ) : null}
      </div>
      <ComboboxContent anchor={anchorRef}>
        {searchable ? <ComboboxInput placeholder={`Search ${placeholder}`} /> : null}
        <ComboboxEmpty>No items found.</ComboboxEmpty>
        <ComboboxList>
          {(item: Item) => (
            <ComboboxItem key={item.value} value={item.value}>
              {item.label}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
};
