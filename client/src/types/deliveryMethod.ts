export interface DeliveryMethod {
  id: string;
  name: string;
  description?: string;
  priceCents: number;
  estimatedDays?: string;
}
