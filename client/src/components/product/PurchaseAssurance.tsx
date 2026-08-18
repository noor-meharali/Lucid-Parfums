import { Truck, RotateCcw, ShieldCheck, Headset } from 'lucide-react';
import { Link } from 'react-router-dom';

const ITEMS = [
  { icon: Truck, label: 'Delivery timelines are confirmed at checkout, based on your location.' },
  {
    icon: RotateCcw,
    label: (
      <>
        Unopened items are eligible for return. See our{' '}
        <Link to="/returns" className="underline underline-offset-2 hover:text-espresso">
          return policy
        </Link>
        .
      </>
    ),
  },
  { icon: ShieldCheck, label: 'Secure checkout on every order.' },
  {
    icon: Headset,
    label: (
      <>
        Questions before you buy?{' '}
        <Link to="/contact" className="underline underline-offset-2 hover:text-espresso">
          Contact us
        </Link>
        .
      </>
    ),
  },
];

/**
 * Compact shipping/returns/support/trust block — deliberately terse
 * and free of specific promises (delivery windows, guarantees) that
 * aren't backed by real business configuration yet.
 */
export function PurchaseAssurance() {
  return (
    <ul className="flex flex-col gap-3 rounded-md border border-beige bg-cream p-5">
      {ITEMS.map(({ icon: Icon, label }, index) => (
        <li key={index} className="flex items-start gap-3 text-body-sm text-taupe">
          <Icon className="mt-0.5 h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
          <span>{label}</span>
        </li>
      ))}
    </ul>
  );
}
