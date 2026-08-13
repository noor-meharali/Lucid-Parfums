import { Container } from '@/components/common/Container';
import { ConnectionStatus } from '@/components/common/ConnectionStatus';
import { APP_NAME } from '@/constants/config';

export function HomePage() {
  return (
    <Container className="flex min-h-[80vh] flex-col items-center justify-center gap-6 py-24 text-center">
      <span className="font-serif text-5xl tracking-wide text-espresso sm:text-6xl">
        {APP_NAME}
      </span>
      <p className="max-w-md text-sm text-taupe sm:text-base">
        The foundation is live. The full storefront experience arrives in the parts ahead.
      </p>
      <ConnectionStatus />
    </Container>
  );
}
