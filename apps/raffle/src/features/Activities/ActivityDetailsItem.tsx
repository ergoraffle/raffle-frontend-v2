import { Identifier, Typography } from '@ergo-raffle/ui-kit';

import { getAddressUrl } from '@/lib';

export const ActivityDetailsItem = () => (
  <div className="flex items-center border border-gray-4 gap-4 rounded-sm px-2 py-1.5">
    <div className="w-40 text-center bg-secondary-6 text-secondary-1 py-3 px-2 rounded-sm">
      Safepay to user
    </div>
    <Identifier
      value="hsrjhguizfgpijweogksfoboghjnogmnlomngdm"
      href={getAddressUrl('hsrjhguizfgpijweogksfoboghjnogmnlomngdm')}
      size="lg"
      className="grow"
    />
    <Typography variant="subtitle-sm" className="text-gray-2">
      12:32 AM
    </Typography>
  </div>
);
