import { Button, ExternalLink, Switch, Typography } from '@ergo-raffle/ui-kit';

const Home = () => (
  <>
    <Typography>Home Page</Typography>
    <Switch />
    <Button variant="outline" size="sm">
      Next
    </Button>
    <ExternalLink href="https://google.com">Link Text</ExternalLink>
  </>
);

export default Home;
