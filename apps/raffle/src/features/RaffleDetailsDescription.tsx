import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Skeleton
} from '@ergo-raffle/ui-kit';

export type RaffleDetailsDescriptionProps = { description?: string; loading?: boolean };

export const RaffleDetailsDescription = ({
  description,
  loading
}: RaffleDetailsDescriptionProps) =>
  loading ? (
    <Card shadow>
      <CardHeader>
        <CardTitle>Description:</CardTitle>
        <CardDescription>A very short Description.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-1/2 mb-6" />
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-1/2" />
      </CardContent>
    </Card>
  ) : description ? (
    <Card shadow>
      <CardHeader>
        <CardTitle>Description:</CardTitle>
        <CardDescription>A very short Description.</CardDescription>
      </CardHeader>
      <CardContent>{description}</CardContent>
    </Card>
  ) : null;
