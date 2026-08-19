import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';
import { AuthLayout } from '@/components/auth/AuthLayout';
import { AuthFormError } from '@/components/auth/AuthFormError';
import { Input } from '@/components/form/Input';
import { Button } from '@/components/common/Button';
import { authService } from '@/services/authService';
import { ApiRequestError } from '@/api/client';
import { ROUTES } from '@/constants/routes';

export function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      await authService.forgotPassword({ email });
      setIsSubmitted(true);
    } catch (err) {
      setError(err instanceof ApiRequestError ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isSubmitted) {
    return (
      <AuthLayout title="Check Your Email">
        <div className="flex flex-col items-center gap-3 text-center">
          <CheckCircle2 className="h-8 w-8 text-success" aria-hidden="true" />
          <p className="text-body-sm text-taupe">
            If an account exists for <strong className="text-espresso">{email}</strong>, we&rsquo;ve sent a link to
            reset your password.
          </p>
          <Link to={ROUTES.LOGIN} className="mt-2 text-body-sm font-medium text-espresso underline underline-offset-2">
            Return to sign in
          </Link>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout title="Forgot Password" description="We'll email you a link to reset it.">
      <AuthFormError message={error} />
      <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
        <Input
          type="email"
          label="Email"
          autoComplete="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <Button type="submit" variant="primary" size="lg" isLoading={isSubmitting} className="mt-2 w-full">
          Send Reset Link
        </Button>
      </form>
      <p className="mt-6 text-center text-body-sm text-taupe">
        <Link to={ROUTES.LOGIN} className="font-medium text-espresso underline underline-offset-2">
          Return to sign in
        </Link>
      </p>
    </AuthLayout>
  );
}
