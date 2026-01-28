import { Moon, Recent, Wallet } from '@ergo-raffle/icons';
import { Button, Logo } from '@ergo-raffle/ui-kit';

export const DesktopHeader = () => (
  <header className="flex items-center justify-between container py-5 mx-auto">
    <Logo className="h-12" />
    <ul className="flex items-center gap-x-10 typo-heading-5">
      <li>All raffles</li>
      <li>FAQ</li>
      <li>About/Contact</li>
    </ul>
    <div className="flex items-center gap-x-3">
      <Button variant="primary-soft" size="icon">
        <Moon />
      </Button>
      <Button variant="primary-soft">
        <Recent />
        Activity
      </Button>
      <Button variant="outline-soft">
        <Wallet />
        Connect Wallet
      </Button>
    </div>
  </header>
);
