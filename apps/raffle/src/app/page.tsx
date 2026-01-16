import {
  Button,
  Chip,
  ColorPalette,
  EmptyState,
  ExternalLink,
  FilledBasket,
  Switch,
  Typography
} from '@ergo-raffle/ui-kit';

const Home = () => (
  <>
    <Chip variant="elevated">Chip</Chip>
    <ColorPalette />
    <Typography variant="heading-1">Home Page</Typography>
    <Switch />
    <Button variant="outline" size="sm">
      Next
    </Button>
    <ExternalLink href="https://google.com">Link Text</ExternalLink>
    <FilledBasket hasGift className="w-12 h-12" />
    <EmptyState />
  </>
);

export default Home;
