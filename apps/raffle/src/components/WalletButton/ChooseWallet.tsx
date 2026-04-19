import { Right } from '@ergo-raffle/icons';
import { Spinner, Typography } from '@ergo-raffle/ui-kit';

import { useWallet } from '@/hooks/useWallet';
import type { WalletName } from '@/lib';

export const ChooseWallet = () => {
  const wallet = useWallet();
  return (
    <>
      {wallet.wallets.map((item) => (
        <button
          className="flex items-center justify-between bg-gray-5 rounded-lg p-2.5"
          disabled={!!wallet.connecting}
          key={item.name}
          type="button"
          onClick={() => wallet.setCandidate(item.name as WalletName)}
        >
          <div className="flex items-center gap-3">
            <div className="size-6">
              <item.iconReact />
            </div>
            <Typography variant="subtitle-lg" className="flex items-center">
              {item.name}{' '}
              {wallet.connecting && wallet.candidate === item.name ? (
                <>
                  <Spinner className="ml-2 mr-1 size-4" />
                  <Typography asChild variant="subtitle-sm" className="text-gray-2">
                    <span>connecting...</span>
                  </Typography>
                </>
              ) : (
                ''
              )}
            </Typography>
          </div>
          <Right className="size-6" />
        </button>
      ))}
    </>
  );
};
