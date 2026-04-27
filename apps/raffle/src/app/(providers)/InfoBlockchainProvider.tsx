import { createContext, type ReactNode, useContext, useMemo } from 'react';

import type { InfoBlockchainResponse } from '@ergo-raffle/client';

export const useInfoBlockchain = () => {
  const context = useContext(InfoBlockchainContext);

  if (!context) {
    throw new Error('useInfoBlockchain must be used within InfoBlockchainProvider');
  }

  return context;
};

export type InfoBlockchainContextType = {
  infoBlockchain: InfoBlockchainResponse;
  serviceFee: number;
};

export const InfoBlockchainContext = createContext<InfoBlockchainContextType | undefined>(
  undefined
);

export type InfoBlockchainProvider = {
  children?: ReactNode;
  infoBlockchain: InfoBlockchainResponse;
};

export const InfoBlockchainProvider = ({ children, infoBlockchain }: InfoBlockchainProvider) => {
  const serviceFee = useMemo(
    () => (infoBlockchain ? infoBlockchain.fee.service + infoBlockchain.fee.implementer : 0),
    [infoBlockchain]
  );

  return (
    <InfoBlockchainContext.Provider value={{ infoBlockchain, serviceFee }}>
      {children}
    </InfoBlockchainContext.Provider>
  );
};
