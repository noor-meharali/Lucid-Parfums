import { Container } from '@/components/common/Container';
import { BrandDivider } from '@/components/common/BrandDivider';

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
    <Container className="flex min-h-[60vh] flex-col items-center justify-center gap-4 py-24 text-center">
      <span className="font-serif text-display-md text-espresso">{title}</span>
      <BrandDivider />
      <p className="max-w-md text-body-sm text-taupe">
        {description ?? 'This page will be built in an upcoming part.'}
      </p>
    </Container>
  );
}
