import {
  Card,
  CardContent,
  Empty,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Typography
} from '@ergo-raffle/ui-kit';

import { TABS } from './constants';
import { FAQItem } from './FAQItem';

export const FAQs = () => (
  <Card>
    <CardContent>
      <div className="max-w-200 mx-auto my-7">
        <Tabs defaultValue={TABS[0].value}>
          <TabsList className="lg:gap-1 mb-12">
            {TABS.map((tab) => (
              <TabsTrigger key={tab.value} value={tab.value} className="mx-auto">
                <span className="sm:hidden">{tab.xsLabel}</span>
                <span className="hidden sm:inline-block">{tab.label}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {TABS.map(({ value, items }) => (
            <TabsContent value={value} className="space-y-3" key={value}>
              {items.length > 0 ? (
                items.map((faq) => <FAQItem faq={faq} key={faq.id} />)
              ) : (
                <Empty>
                  <Typography variant="heading-3">No matching results found.</Typography>
                </Empty>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </CardContent>
  </Card>
);
