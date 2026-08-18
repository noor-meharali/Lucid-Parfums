interface IngredientsSectionProps {
  ingredients: string[];
}

export function IngredientsSection({ ingredients }: IngredientsSectionProps) {
  if (ingredients.length === 0) return null;

  return (
    <section>
      <h2 className="font-serif text-heading-lg text-espresso">Ingredients</h2>
      <span className="mt-3 mb-6 block h-px w-16 bg-gold" aria-hidden="true" />
      <p className="text-body-sm leading-relaxed text-taupe">{ingredients.join(', ')}</p>
    </section>
  );
}
