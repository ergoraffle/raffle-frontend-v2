import { getInfoBlockchain } from '@ergo-raffle/client';

import { CreateRaffle } from '@/features/CreateRaffle';

const CreateRafflePage = async () => {
  const infoBlockchain = await getInfoBlockchain();
  return <CreateRaffle infoBlockchainData={infoBlockchain} />;
};

export default CreateRafflePage;
