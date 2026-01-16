import { Typography } from '../typography';
import { EmptyStateIllustration } from './EmptyStateIllustration';

type EmptyStateProps = {
  title?: string;
};

function EmptyState({ title }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center">
      <EmptyStateIllustration />
      <Typography>{title ?? 'No matching results found.'}</Typography>
    </div>
  );
}

export { EmptyState };
