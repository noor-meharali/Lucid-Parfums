import { useState, type FormEvent } from 'react';
import { Input } from '@/components/form/Input';
import { Button } from '@/components/common/Button';
import { AuthFormError } from '@/components/auth/AuthFormError';
import { useToast } from '@/context/ToastContext';
import { userService } from '@/services/userService';
import { ApiRequestError } from '@/api/client';

export function ChangePasswordForm() {
  const { showToast } = useToast();

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      await userService.changePassword({ currentPassword, newPassword, confirmNewPassword });
      setCurrentPassword('');
      setNewPassword('');
      setConfirmNewPassword('');
      showToast('success', 'Password changed.');
    } catch (err) {
      setError(err instanceof ApiRequestError ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <AuthFormError message={error} />
      <Input
        type="password"
        label="Current Password"
        autoComplete="current-password"
        required
        value={currentPassword}
        onChange={(event) => setCurrentPassword(event.target.value)}
      />
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
      <Button type="submit" variant="primary" isLoading={isSubmitting} className="self-start">
        Change Password
      </Button>
    </form>
  );
}
