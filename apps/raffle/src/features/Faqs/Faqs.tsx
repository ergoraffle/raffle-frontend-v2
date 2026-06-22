'use client';

import { isValidElement, type PropsWithChildren, type ReactNode, useMemo, useState } from 'react';

import { Search } from '@ergo-raffle/icons';
import {
  Card,
  CardContent,
  Empty,
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Typography
} from '@ergo-raffle/ui-kit';

import { tabs } from './constants';
import { FaqItem } from './FaqItem';

const extractText = (node: ReactNode): string => {
  if (node === null || node === undefined || typeof node === 'boolean') return '';
  if (typeof node === 'string' || typeof node === 'number') return String(node);
  if (Array.isArray(node)) return node.map(extractText).join(' ');
  if (isValidElement<PropsWithChildren>(node)) return extractText(node.props.children);
  return '';
};

export const Faqs = () => {
  const [query, setQuery] = useState('');

  const tabsFiltered = useMemo(() => {
    const q = query.trim().toLowerCase();

    if (!q) return tabs;

    return tabs
      .map((tab) => ({
        ...tab,
        items: tab.items.filter((item) =>
          `${item.question} ${extractText(item.answer)}`.toLowerCase().includes(q)
        )
      }))
      .filter((tab) => tab.items.length > 0);
  }, [query]);

  return (
    <>
      <InputGroup className="mx-auto w-full sm:max-w-sm md:max-w-md lg:max-w-lg">
        <InputGroupInput
          placeholder="Search"
          value={query}
          onInput={(event) => setQuery(event.currentTarget.value)}
        />
        <InputGroupAddon align="inline-end">
          <Search />
        </InputGroupAddon>
      </InputGroup>
      <Card>
        <CardContent>
          <div className="max-w-200 mx-auto my-7">
            {tabsFiltered.length ? (
              <Tabs defaultValue={tabsFiltered[0].value}>
                <TabsList className="lg:gap-1 mb-12">
                  {tabsFiltered.map((tab) => (
                    <TabsTrigger key={tab.value} value={tab.value} className="mx-auto">
                      <span className="sm:hidden">{tab.xsLabel}</span>
                      <span className="hidden sm:inline-block">{tab.label}</span>
                    </TabsTrigger>
                  ))}
                </TabsList>

                {tabsFiltered.map(({ value, items }) => (
                  <TabsContent value={value} className="space-y-3" key={value}>
                    {items.length > 0 ? (
                      items.map((faq) => <FaqItem faq={faq} key={faq.id} />)
                    ) : (
                      <Empty>
                        <Typography variant="heading-3">No matching results found.</Typography>
                      </Empty>
                    )}
                  </TabsContent>
                ))}
              </Tabs>
            ) : (
              <div className="flex justify-center items-center grow my-9">
                <Empty>
                  <Typography variant="heading-3">No matching results found.</Typography>
                </Empty>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </>
  );
};
