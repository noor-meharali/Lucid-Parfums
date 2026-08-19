import { useState, type FormEvent } from 'react';
import { Input } from '@/components/form/Input';
import { Button } from '@/components/common/Button';
import { AuthFormError } from '@/components/auth/AuthFormError';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import { userService } from '@/services/userService';
import { ApiRequestError } from '@/api/client';
import type { User } from '@/types/user';

interface ProfileFormProps {
  user: User;
}

export function ProfileForm({ user }: ProfileFormProps) {
  const { refreshUser } = useAuth();
  const { showToast } = useToast();

  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone ?? '');
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setError(null);
    setFieldErrors({});
    setIsSubmitting(true);

    try {
      await userService.updateProfile({ firstName, lastName, email, phone: phone || undefined });
      await refreshUser();
      showToast('success', 'Profile updated.');
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
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <AuthFormError message={error} />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Input
          label="First Name"
          required
          value={firstName}
          onChange={(event) => setFirstName(event.target.value)}
          error={fieldErrors.firstName}
        />
        <Input
          label="Last Name"
          required
          value={lastName}
          onChange={(event) => setLastName(event.target.value)}
          error={fieldErrors.lastName}
        />
      </div>
      <Input
        type="email"
        label="Email"
        required
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        error={fieldErrors.email}
        helperText={email !== user.email ? 'Changing your email will mark it as unverified.' : undefined}
      />
      <Input
        type="tel"
        label="Phone"
        value={phone}
        onChange={(event) => setPhone(event.target.value)}
        error={fieldErrors.phone}
      />
      <Button type="submit" variant="primary" isLoading={isSubmitting} className="self-start">
        Save Changes
      </Button>
    </form>
  );
}
