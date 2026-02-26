import { useRef, useState } from 'react';

import { cn } from '@/lib/utils';

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

export type MultiSelectComboboxItem = { value: string; label: string };

export type MultiSelectComboboxProps = {
  items: MultiSelectComboboxItem[];
  selected: string[];
  onChange: (values: string[]) => void;
  placeholder?: string;
  searchable?: boolean;
  closeOnChange?: boolean;
  className?: string;
};

export const MultiSelectCombobox = ({
  items,
  selected,
  onChange,
  placeholder,
  searchable,
  closeOnChange,
  className
}: MultiSelectComboboxProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const anchorRef = useRef<HTMLDivElement>(null);

  const displayValue = selected
    .map((val) => items.find((i) => i.value === val)?.label || val)
    .join(', ');

  const hasSelected = displayValue.length > 0;

  const onValueChange = (value: string[]) => {
    if (closeOnChange) {
      onChange(value);
      setOpen(false);
    } else {
      onChange(value);
    }
  };

  const toggleOpen = () => {
    setOpen((prev) => !prev);
  };

  return (
    <Combobox
      items={items}
      multiple
      value={selected}
      onValueChange={onValueChange}
      open={closeOnChange ? open : undefined}
      onOpenChange={closeOnChange ? toggleOpen : undefined}
    >
      <div className={cn('flex items-center gap-1 relative', className)} ref={anchorRef}>
        <ComboboxTrigger
          className={`grow rounded-l-lg h-10.5 sm:h-13 flex items-center pl-3 pr-2.5 lg:min-w-40 ${hasSelected ? 'bg-secondary-5' : 'bg-white-3 rounded-r-lg'}`}
        >
          {hasSelected ? (
            <ComboboxValue>
              <span className="whitespace-nowrap pr-1">{displayValue}</span>
            </ComboboxValue>
          ) : (
            <span>{placeholder}</span>
          )}
        </ComboboxTrigger>
        {hasSelected ? (
          <div className="bg-secondary-5 text-primary-1-foreground rounded-r-lg  px-1.5 h-10.5 sm:h-13 flex items-center">
            <ComboboxClear />
          </div>
        ) : null}
      </div>
      <ComboboxContent anchor={anchorRef}>
        {searchable ? <ComboboxInput placeholder={`Search ${placeholder}`} /> : null}
        <ComboboxEmpty>No items found.</ComboboxEmpty>
        <ComboboxList>
          {(item) => (
            <ComboboxItem key={item.value} value={item.value}>
              {item.label}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
};
