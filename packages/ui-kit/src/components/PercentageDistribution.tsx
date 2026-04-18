import { useCallback } from 'react';

import { Close, Plus } from '@ergo-raffle/icons';

import { Button } from './Button';
import { Input } from './Input';

export type PercentageDistributionItem = {
  id: string;
  count: number;
  percent: number;
};

export type PercentageDistributionProps = {
  items?: PercentageDistributionItem[];
  onChange?: (items: PercentageDistributionItem[]) => void;
};

export const PercentageDistribution = ({ items = [], onChange }: PercentageDistributionProps) => {
  const add = useCallback(() => {
    const item = {
      id: crypto.randomUUID(),
      count: 1,
      percent: 0
    };
    onChange?.([...items, item]);
  }, [items, onChange]);

  const remove = useCallback(
    (id: string) => {
      const filtered = items.filter((item) => item.id !== id);
      onChange?.(filtered);
    },
    [items, onChange]
  );

  const update = useCallback(
    (id: string, field: 'count' | 'percent', value: number) => {
      const filtered = items.map((item) => {
        if (item.id !== id) return item;
        return {
          ...item,
          [field]: value
        };
      });
      onChange?.(filtered);
    },
    [items, onChange]
  );

  return (
    <div className="flex items-center flex-wrap border border-gray-4 rounded-2xlg pt-2 pr-3 pb-2.5 pl-4 gap-2">
      {items.map((item) => (
        <div
          key={item.id}
          className="flex items-center bg-gray-5 text-gray-5-foreground rounded-md px-1.5 py-0.5 gap-2"
        >
          <div className="flex items-center gap-0.5">
            <Input
              type="number"
              min={0}
              value={item.count}
              size="xs"
              className="w-6 sm:w-7 text-center"
              onChange={(event) => update(item.id, 'count', Number(event.target.value))}
            />
            <span>X</span>
          </div>
          <div className="flex items-center gap-0.5">
            <Input
              type="number"
              min={0}
              max={100}
              size="xs"
              value={item.percent}
              className="w-6 sm:w-7 text-center"
              onChange={(event) => update(item.id, 'percent', Number(event.target.value))}
            />
            <span>%</span>
          </div>
          <Button variant="plain" size="icon-xs" onClick={() => remove(item.id)} type="button">
            <Close />
          </Button>
        </div>
      ))}
      <Button variant="plain" size="icon-xs" onClick={add} type="button">
        <Plus />
      </Button>
    </div>
  );
};
