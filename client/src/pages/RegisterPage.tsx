import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthLayout } from '@/components/auth/AuthLayout';
import { AuthFormError } from '@/components/auth/AuthFormError';
import { Input } from '@/components/form/Input';
import { Button } from '@/components/common/Button';
import { useAuth } from '@/context/AuthContext';
import { ApiRequestError } from '@/api/client';
import { ROUTES } from '@/constants/routes';

export function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setError(null);
    setFieldErrors({});
    setIsSubmitting(true);

    try {
      await register({ firstName, lastName, email, password, confirmPassword });
      navigate(ROUTES.HOME, { replace: true });
    } catch (err) {
      if (err instanceof ApiRequestError) {
        setError(err.message);
        if (err.errors) {
          setFieldErrors(Object.fromEntries(Object.entries(err.errors).map(([key, msgs]) => [key, msgs[0]!])));
        }
      } else {
        setError('Something went wrong. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <AuthLayout title="Create Account" description="Join Lucid Parfums for a faster checkout and order history.">
      <AuthFormError message={error} />
      <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="First Name"
            autoComplete="given-name"
            required
            value={firstName}
            onChange={(event) => setFirstName(event.target.value)}
            error={fieldErrors.firstName}
          />
          <Input
            label="Last Name"
            autoComplete="family-name"
            required
            value={lastName}
            onChange={(event) => setLastName(event.target.value)}
            error={fieldErrors.lastName}
          />
        </div>
        <Input
          type="email"
          label="Email"
          autoComplete="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          error={fieldErrors.email}
        />
        <Input
          type="password"
          label="Password"
          autoComplete="new-password"
          required
          helperText={fieldErrors.password ? undefined : 'At least 8 characters.'}
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          error={fieldErrors.password}
        />
        <Input
          type="password"
          label="Confirm Password"
          autoComplete="new-password"
          required
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
          error={fieldErrors.confirmPassword}
        />
        <Button type="submit" variant="primary" size="lg" isLoading={isSubmitting} className="mt-2 w-full">
          Create Account
        </Button>
      </form>
      <p className="mt-6 text-center text-body-sm text-taupe">
        Already have an account?{' '}
        <Link to={ROUTES.LOGIN} className="font-medium text-espresso underline underline-offset-2">
          Sign in
        </Link>
      </p>
    </AuthLayout>
  );
}
