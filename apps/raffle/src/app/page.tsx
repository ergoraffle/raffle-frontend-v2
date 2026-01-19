import {
  Badge,
  Button,
  Checkbox,
  ColorPalette,
  EmptyState,
  ExternalLink,
  FilledBasket,
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
    <div className="space-y-2">
      <div className="space-x-2">
        <Button size="sm">Next</Button>
        <Button>Next</Button>
        <Button size="lg">Next</Button>
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
      <div>
        <p>------has-hover</p>
        <Badge variant="outline" asChild size="lg">
          <a>outline</a>
        </Badge>
        <Badge variant="elevated" asChild>
          <a href="/">elevated</a>
        </Badge>
        <Badge variant="primary" asChild>
          <a>primary</a>
        </Badge>
        <Badge variant="secondary" asChild>
          <a>secondary</a>
        </Badge>
      </div>
      <div>
        <p>------focus</p>
        <Badge variant="outline" asChild size="lg">
          <a>outline</a>
        </Badge>
        <Badge variant="elevated" asChild>
          <a href="/">elevated</a>
        </Badge>
        <Badge variant="primary" asChild>
          <a>primary</a>
        </Badge>
        <Badge variant="secondary" asChild>
          <a>secondary</a>
        </Badge>
      </div>
      <div>
        <p>--------disabled</p>
        <Badge variant="outline" asChild size="md">
          <button disabled>outline</button>
        </Badge>
        <Badge variant="elevated" asChild>
          <button disabled>elevated</button>
        </Badge>
        <Badge variant="primary" asChild>
          <button disabled>primary</button>
        </Badge>
        <Badge variant="secondary" asChild>
          <button disabled>secondary</button>
        </Badge>
      </div>
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
    <ExternalLink href="https://google.com">Link Text</ExternalLink>
    <FilledBasket hasGift className="w-12 h-12" />
    <EmptyState />
  </div>
);

export default Home;
