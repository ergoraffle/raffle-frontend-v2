import { useMemo, useState } from 'react';

import { MultiSelectCombobox } from '@ergo-raffle/ui-kit';

import { useDebounceString, useFetchTokensSearch } from '@/hooks';

export type TokenFilterProps = {
  value: string[];
  onChange: (values: string[]) => void;
};

export const TokensFilter = ({ value, onChange }: TokenFilterProps) => {
  const [tokensQuery, setTokensQuery] = useState<string>('');
  const debouncedTokensQuery = useDebounceString(tokensQuery);
  const filters = useMemo(() => ({ query: debouncedTokensQuery }), [debouncedTokensQuery]);
  const { data: tokensFilterData, isLoading } = useFetchTokensSearch(filters);

  const tokenItems = useMemo(
    () =>
      tokensFilterData?.items.map((item) => ({
        value: item.id,
        label: item.name ?? item.id
      })) ?? [],
    [tokensFilterData]
  );

  return (
    <MultiSelectCombobox
      items={tokenItems}
      selected={value ?? []}
      onChange={onChange}
      placeholder="Token"
      closeOnChange
      searchable
      query={tokensQuery}
      onQueryChange={setTokensQuery}
      minQueryLength={3}
      isLoading={isLoading}
      className="flex-1 lg:flex-auto"
    />
  );
};
