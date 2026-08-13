import { Container } from '@/components/common/Container';

interface PagePlaceholderProps {
  title: string;
  description?: string;
}

/**
 * Marks the location where a future part's page content will live.
 * Every route in the routing foundation renders through this until
 * its dedicated part implements the real page.
 */
export function PagePlaceholder({ title, description }: PagePlaceholderProps) {
  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center gap-3 py-24 text-center">
      <span className="font-serif text-3xl text-espresso sm:text-4xl">{title}</span>
      <p className="max-w-md text-sm text-taupe">
        {description ?? 'This page will be built in an upcoming part.'}
      </p>
    </Container>
  );
}
