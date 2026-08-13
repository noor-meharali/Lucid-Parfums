import { Link } from 'react-router-dom';
import { Container } from '@/components/common/Container';
import { ROUTES } from '@/constants/routes';

export function NotFoundPage() {
  return (
    <Container className="flex min-h-[70vh] flex-col items-center justify-center gap-4 py-24 text-center">
      <span className="font-serif text-4xl text-espresso">404</span>
      <p className="text-sm text-taupe">This page doesn't exist.</p>
      <Link to={ROUTES.HOME} className="text-sm font-medium text-gold underline underline-offset-4">
        Return home
      </Link>
    </Container>
  );
}
