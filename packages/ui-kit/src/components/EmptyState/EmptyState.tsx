import { EmptyStateIllustration } from './EmptyStateIllustration';

type EmptyStateProps = {
  title?: string;
};

export const EmptyState = ({ title }: EmptyStateProps) => (
  <div className="flex flex-col items-center justify-center">
    <EmptyStateIllustration />
    <div className="typo-heading-4 text-gray-1">{title ?? 'No matching results found.'}</div>
  </div>
);
