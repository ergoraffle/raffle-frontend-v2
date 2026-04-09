import { Hero } from '@/components';
import { RaffleTabs } from '@/features';
import { WalletProvider } from '@/wallets/useWallet';
import { WalletButton } from '@/wallets/WalletButton';

const Home = async () => (
  <>
    <Hero />
    <WalletProvider>
      <WalletButton />
    </WalletProvider>
    <RaffleTabs />
  </>
);

export default Home;
