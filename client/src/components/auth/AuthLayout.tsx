import type { PropsWithChildren } from 'react';
import { Container } from '@/components/common/Container';
import { Logo } from '@/components/common/Logo';
import { BrandDivider } from '@/components/common/BrandDivider';

interface AuthLayoutProps {
  title: string;
  description?: string;
}

/**
 * The shared shell for every auth page (login, register, forgot/reset
 * password) — a centered, branded card rather than a generic SaaS
 * split-screen layout.
 */
export function AuthLayout({ title, description, children }: PropsWithChildren<AuthLayoutProps>) {
  return (
    <Container className="flex min-h-[75vh] items-center justify-center py-16">
      <div className="w-full max-w-md rounded-lg border border-beige bg-ivory p-8 shadow-soft sm:p-10">
        <div className="mb-8 flex flex-col items-center gap-4 text-center">
          <Logo />
          <BrandDivider />
          <div>
            <h1 className="font-serif text-heading-lg text-espresso">{title}</h1>
            {description && <p className="mt-2 text-body-sm text-taupe">{description}</p>}
          </div>
        </div>
        {children}
      </div>
    </Container>
  );
}
