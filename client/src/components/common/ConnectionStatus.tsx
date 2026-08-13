import { useHealthCheck } from '@/hooks/useHealthCheck';
import { cn } from '@/utils/cn';

const STATE_COPY: Record<string, string> = {
  checking: 'Checking backend connection…',
  connected: 'Backend connected',
  disconnected: 'Backend not reachable',
};

const STATE_DOT: Record<string, string> = {
  checking: 'bg-taupe',
  connected: 'bg-gold',
  disconnected: 'bg-espresso',
};

export function ConnectionStatus() {
  const state = useHealthCheck();

  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-beige bg-cream px-4 py-2 text-xs tracking-wide text-espresso">
      <span className={cn('h-2 w-2 rounded-full', STATE_DOT[state])} />
      {STATE_COPY[state]}
    </div>
  );
}
