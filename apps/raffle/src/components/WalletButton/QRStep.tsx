import { Typography } from '@ergo-raffle/ui-kit';
import { QRCodeSVG } from 'qrcode.react';

export const QRStep = () => {
  const value = 'ergopay://api.ergexplorer.com/ergopay/auth?id=5973&address=#P2PK_ADDRESS#';
  return (
    <div className="flex items-start justify-between">
      <div>
        <Typography variant="subtitle-md">Scan the QR code or follow this link:</Typography>
        <Typography
          variant="subtitle-md"
          className="bg-gray-5 mt-2 rounded-sm px-1.5 py-1 text-ellipsis overflow-hidden max-w-xs whitespace-nowrap"
        >
          {value}
        </Typography>
      </div>
      <QRCodeSVG value={value} />
    </div>
  );
};
