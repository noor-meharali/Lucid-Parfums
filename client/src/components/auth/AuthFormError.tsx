import { AlertCircle } from 'lucide-react';

interface AuthFormErrorProps {
  message: string | null;
}

export function AuthFormError({ message }: AuthFormErrorProps) {
  if (!message) return null;

  return (
    <div role="alert" className="mb-5 flex items-start gap-2 rounded-md border border-destructive/30 bg-destructive-soft px-4 py-3 text-body-sm text-destructive">
      <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
      {message}
    </div>
  );
}
