import { Button } from '@ergo-raffle/ui';
import { ArrowUp } from 'lucide-react';
export default function Home() {
  return (
    <div className="flex gap-2 p-2 flex-nowrap">
      <Button color="primary" variant={'default'} size="sm">
        click me
      </Button>
      <Button color="primary" variant={'default'} size="lg">
        click me
      </Button>
      <Button color="primary" variant={'default'} size="icon">
        <ArrowUp />
      </Button>
      <Button color="primary" variant={'outline'} size="sm">
        click me
      </Button>
      <Button color="primary" variant={'outline'} size="lg">
        click me
      </Button>
      <Button color="primary" variant={'outline'} size="icon">
        <ArrowUp />
      </Button>
      <Button color="secondary" variant={'default'} size="sm">
        click me
      </Button>
      <Button color="secondary" variant={'default'} size="lg">
        click me
      </Button>
      <Button color="secondary" variant={'default'} size="icon">
        <ArrowUp />
      </Button>
      <Button color="secondary" variant={'outline'} size="sm">
        click me
      </Button>
      <Button color="secondary" variant={'outline'} size="lg">
        click me
      </Button>
      <Button color="secondary" variant={'outline'} size="icon">
        <ArrowUp />
      </Button>
    </div>
  );
}
