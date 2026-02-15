import { Ergo } from '@ergo-raffle/icons';
import { Token, Typography } from '@ergo-raffle/ui-kit';

const Home = () => (
  <>
    <Token name="Erg" />
    <Token name="Erg" tokenId="erg" />
    <Ergo className="h-12 w-12" />
    <Typography>Home Page</Typography>
  </>
);

export default Home;
