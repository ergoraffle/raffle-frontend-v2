import { Gift } from '@ergo-raffle/icons';
import { Card, CardContent, Identifier, Typography } from '@ergo-raffle/ui-kit';

export const RaffleActivityItem = () => (
  <div className="flex items-stretch space-x-2">
    <Card padding="xs" className="flex-2">
      <CardContent className="flex items-center space-x-1  my-auto">
        <Gift className="size-6" />
        <Typography variant="body-md">Gift added</Typography>
      </CardContent>
    </Card>
    <Card padding="xs" className="grow">
      <CardContent className="flex items-center justify-between space-x-1 text-gray-2 my-auto">
        <div className="max-w-70">
          <Identifier size="lg" value="sefdrgmpovpsdmspdovmdspvmdpbmdpbmspdmvspbms" />
        </div>
        <Typography variant="subtitle-sm">11:09 AM</Typography>
      </CardContent>
    </Card>
  </div>
);
