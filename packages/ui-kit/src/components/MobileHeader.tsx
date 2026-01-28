import { DotMenuVertical, Menu } from '@ergo-raffle/icons';
import { Button, Logo, Sheet, SheetContent, SheetTrigger } from '@ergo-raffle/ui-kit';

export const MobileHeader = () => (
  <header className="flex items-center justify-between container">
    <Logo className="h-9" showTypography={false} />

    <div className="flex items-center gap-x-3">
      <Button variant="outline-soft">Set Wallet</Button>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="plain" size="sm">
            <Menu />
          </Button>
        </SheetTrigger>
        <SheetContent side="right" title="title">
          <div className="no-scrollbar overflow-y-auto">
            <ul className="flex flex-col gap-y-4.5 typo-heading-5">
              <li>All raffles</li>
              <li>FAQ</li>
              <li>About/Contact</li>
            </ul>
          </div>
        </SheetContent>
      </Sheet>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="plain" size="sm">
            <DotMenuVertical />
          </Button>
        </SheetTrigger>
        <SheetContent side="bottom" title="title">
          <div className="no-scrollbar overflow-y-auto">
            <ul className="flex flex-col gap-y-4.5 typo-heading-5">
              <li>All raffles</li>
              <li>FAQ</li>
              <li>About/Contact</li>
            </ul>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  </header>
);
