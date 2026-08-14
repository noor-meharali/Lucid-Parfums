import { Link } from 'react-router-dom';
import { Container } from '@/components/common/Container';
import { BrandDivider } from '@/components/common/BrandDivider';
import { buttonClasses } from '@/components/common/Button';
import { ROUTES } from '@/constants/routes';

export function NotFoundPage() {
  return (
    <Container className="flex min-h-[70vh] flex-col items-center justify-center gap-4 py-24 text-center">
      <span className="font-serif text-display-md text-espresso">404</span>
      <BrandDivider />
      <p className="text-body-sm text-taupe">This page doesn't exist.</p>
      <Link to={ROUTES.HOME} className={buttonClasses('outline', 'sm', 'mt-2')}>
        Return home
      </Link>
    </Container>
  );
}
