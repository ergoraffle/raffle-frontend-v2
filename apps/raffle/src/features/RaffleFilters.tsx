'use client';

import type { KeyboardEvent } from 'react';

import type { GetRafflesStatusItem } from '@ergo-raffle/client';
import { Search } from '@ergo-raffle/icons';
import {
  Button,
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  MultiSelectCombobox,
  Tabs,
  TabsList,
  TabsTrigger
} from '@ergo-raffle/ui-kit';

import { useRafflesQuery } from '@/hooks';

const statusFilterItems: { value: GetRafflesStatusItem; label: string }[] = [
  {
    value: 'active',
    label: 'Active'
  },
  {
    value: 'failed',
    label: 'Failed'
  },
  {
    value: 'successful',
    label: 'Successful'
  }
];
const tokenFilterItems = [
  { value: 'erg', label: 'ERG' },
  { value: 'btc', label: 'BTC' },
  { value: 'ada', label: 'ADA' }
];
const categoryFilterItems = [
  { value: 'cat1', label: 'Cat 1' },
  { value: 'cat2', label: 'Cat 2' },
  { value: 'cat3', label: 'Cat 3' }
];

export const RafflesFilters = () => {
  const { search, params, setSearch, setParam } = useRafflesQuery();

  const onSearch = () => {
    setParam('name', search);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearch();
    }
  };
  enum RAFFLE_LIST_TABS {
    ALL = 'All',
    ACTIVE = 'Active',
    HISTORY = 'History',
    PINED = 'Pined'
  }

  return (
    <>
      <Tabs defaultValue={RAFFLE_LIST_TABS.ALL} className="w-full">
        <TabsList>
          <TabsTrigger key={RAFFLE_LIST_TABS.ALL} value={RAFFLE_LIST_TABS.ALL}>
            {RAFFLE_LIST_TABS.ALL}
          </TabsTrigger>
          <TabsTrigger key={RAFFLE_LIST_TABS.ACTIVE} value={RAFFLE_LIST_TABS.ACTIVE}>
            {RAFFLE_LIST_TABS.ACTIVE}
          </TabsTrigger>
          <TabsTrigger key={RAFFLE_LIST_TABS.HISTORY} value={RAFFLE_LIST_TABS.HISTORY}>
            {RAFFLE_LIST_TABS.HISTORY}
          </TabsTrigger>
          <TabsTrigger key={RAFFLE_LIST_TABS.PINED} value={RAFFLE_LIST_TABS.PINED}>
            {RAFFLE_LIST_TABS.PINED}
          </TabsTrigger>
        </TabsList>
      </Tabs>
      <div className="flex flex-col lg:flex-row items-center mb-9 lg:mb-18 gap-2 w-full lg:w-fit mx-auto">
        <div className="flex items-center gap-2 w-full lg:w-fit flex-wrap">
          <MultiSelectCombobox
            items={statusFilterItems}
            selected={(params.status as string[]) ?? []}
            onChange={(values) => setParam('status', values as GetRafflesStatusItem[])}
            placeholder="Status"
            closeOnChange
            className="flex-1 lg:flex-auto"
          />
          <MultiSelectCombobox
            items={tokenFilterItems}
            selected={params.token ?? []}
            onChange={(values) => setParam('token', values as string[])}
            placeholder="Token"
            closeOnChange
            className="flex-1 lg:flex-auto"
          />
          <MultiSelectCombobox
            items={categoryFilterItems}
            selected={params.category ?? []}
            onChange={(values) => setParam('category', values as string[])}
            placeholder="Category"
            closeOnChange
            className="flex-1 lg:flex-auto"
          />
        </div>
        <div className="w-full lg:w-auto">
          <InputGroup className="max-w-full">
            <InputGroupInput
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <InputGroupAddon align="inline-end">
              <Button size="icon-xs" variant="ghost" onClick={onSearch}>
                <Search />
              </Button>
            </InputGroupAddon>
          </InputGroup>
        </div>
      </div>
    </>
  );
};
