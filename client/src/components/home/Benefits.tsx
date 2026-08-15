import { Truck, Leaf, RotateCcw, Sparkles } from 'lucide-react';
import { Container } from '@/components/common/Container';
import { Card } from '@/components/common/Card';

const VALUE_CARDS = [
  { icon: Truck, title: 'Complimentary Shipping', description: 'On every order, no minimum.' },
  { icon: Leaf, title: 'Considered Packaging', description: 'Recyclable materials throughout.' },
  { icon: RotateCcw, title: '60-Day Returns', description: 'Try it at home, risk-free.' },
  { icon: Sparkles, title: 'Small-Batch Crafted', description: 'Finished by hand, not mass-produced.' },
];

export function Benefits() {
  return (
    <section className="bg-cream py-16">
      <Container>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {VALUE_CARDS.map(({ icon: Icon, title, description }) => (
            <Card key={title} interactive className="flex flex-col items-center gap-2 text-center">
              <Icon className="h-5 w-5 text-gold" aria-hidden="true" />
              <p className="text-body-sm font-medium text-espresso">{title}</p>
              <p className="text-body-sm text-taupe">{description}</p>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
