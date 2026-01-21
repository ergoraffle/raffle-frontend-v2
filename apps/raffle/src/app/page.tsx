import { Check } from '@ergo-raffle/icons';
import {
  Badge,
  Button,
  Checkbox,
  ColorPalette,
  EmptyState,
  FilledBasket,
  Identifier,
  Switch,
  Typography
} from '@ergo-raffle/ui-kit';

const Home = () => (
  <div className="p-4 space-y-4">
    <div className="space-x-2">
      <Checkbox checked />
      <Checkbox checked disabled />
      <Checkbox />
      <Checkbox disabled />
    </div>
    <div className="w-2xs">
      <Identifier
        link="https://google.com"
        value="sfdsdfsdsfsdsdfsdfsdfsdfsdfsdfsdfssfdsdfsdsfsdsdfsdfsdfsdfsdfsdfsdfssfdsdfsdsfsdsdfsdfsdfsdfsdfsdfsdfs"
        size="lg"
      />
    </div>
    <div className="space-y-2">
      <div className="space-x-2">
        <Button size="sm">Next</Button>
        <Button>Next</Button>
        <Button size="lg">Next</Button>
        <Button size="icon-sm">
          <Check />
        </Button>
        <Button size="icon">
          <Check />
        </Button>
        <Button size="icon-lg">
          <Check />
        </Button>
        <Button size="icon-lg" className="rounded-full">
          <Check />
        </Button>
      </div>
      <div className="space-x-2">
        <Button variant="primary">Next</Button>
        <Button variant="primary-soft">Next</Button>
        <Button variant="outline">Next</Button>
        <Button variant="outline-soft">Next</Button>
        <Button variant="ghost">Next</Button>
      </div>
    </div>
    <div className="space-x-2 space-y-2">
      <Badge variant="outline" size="sm">
        outline
      </Badge>
      <Badge variant="elevated">elevated</Badge>
      <Badge variant="primary">primary</Badge>
      <Badge variant="secondary">secondary</Badge>
      <Badge variant="error">error</Badge>
      <Badge variant="success">success</Badge>
    </div>

    <ColorPalette />
    <div className="space-y-4">
      <Typography variant="display-md">Home Page</Typography>
      <Typography variant="heading-1">Home Page</Typography>
      <Typography variant="heading-2">Home Page</Typography>
      <Typography variant="heading-3">Home Page</Typography>
      <Typography variant="heading-4">Home Page</Typography>
      <Typography variant="heading-5">Home Page</Typography>
      <Typography variant="body-sm">Home Page</Typography>
      <Typography variant="body-md">Home Page</Typography>
      <Typography variant="body-lg">Home Page</Typography>
      <Typography variant="body-button">Home Page</Typography>
      <Typography variant="body-button-bold">Home Page</Typography>
      <Typography variant="subtitle-sm">Home Page</Typography>
      <Typography variant="subtitle-md">Home Page</Typography>
      <Typography variant="subtitle-lg">Home Page</Typography>
    </div>
    <div>
      <Switch checked />
      <Switch />
      <Switch disabled />
    </div>
    <FilledBasket hasGift className="w-12 h-12" />
    <EmptyState />
  </div>
);

export default Home;
