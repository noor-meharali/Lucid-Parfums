import { useState, type FormEvent } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { AuthLayout } from '@/components/auth/AuthLayout';
import { AuthFormError } from '@/components/auth/AuthFormError';
import { Input } from '@/components/form/Input';
import { Button } from '@/components/common/Button';
import { authService } from '@/services/authService';
import { ApiRequestError } from '@/api/client';
import { ROUTES } from '@/constants/routes';

export function ResetPasswordPage() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token') ?? '';
  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      await authService.resetPassword({ token, newPassword, confirmNewPassword });
      navigate(ROUTES.LOGIN, { replace: true });
    } catch (err) {
      setError(err instanceof ApiRequestError ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }

  if (!token) {
    return (
      <AuthLayout title="Reset Password">
        <p className="text-center text-body-sm text-taupe">
          This link is missing its reset code. Please use the link from your email, or{' '}
          <Link to={ROUTES.FORGOT_PASSWORD} className="font-medium text-espresso underline underline-offset-2">
            request a new one
          </Link>
          .
        </p>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout title="Reset Password" description="Choose a new password for your account.">
      <AuthFormError message={error} />
      <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
        <Input
          type="password"
          label="New Password"
          autoComplete="new-password"
          required
          helperText="At least 8 characters."
          value={newPassword}
          onChange={(event) => setNewPassword(event.target.value)}
        />
        <Input
          type="password"
          label="Confirm New Password"
          autoComplete="new-password"
          required
          value={confirmNewPassword}
          onChange={(event) => setConfirmNewPassword(event.target.value)}
        />
        <Button type="submit" variant="primary" size="lg" isLoading={isSubmitting} className="mt-2 w-full">
          Reset Password
        </Button>
      </form>
    </AuthLayout>
  );
}
