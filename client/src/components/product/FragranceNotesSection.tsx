import { cn } from '@/utils/cn';

interface FragranceNotesSectionProps {
  topNotes: string[];
  heartNotes: string[];
  baseNotes: string[];
}

const TIERS: { key: keyof Omit<FragranceNotesSectionProps, never>; label: string }[] = [
  { key: 'topNotes', label: 'Top Notes' },
  { key: 'heartNotes', label: 'Heart Notes' },
  { key: 'baseNotes', label: 'Base Notes' },
];

export function FragranceNotesSection(props: FragranceNotesSectionProps) {
  const hasAnyNotes = props.topNotes.length + props.heartNotes.length + props.baseNotes.length > 0;
  if (!hasAnyNotes) return null;

  return (
    <section>
      <h2 className="font-serif text-heading-lg text-espresso">Fragrance Notes</h2>
      <span className={cn('mt-3 mb-6 block h-px w-16 bg-gold')} aria-hidden="true" />
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
        {TIERS.map(({ key, label }) => {
          const notes = props[key];
          if (notes.length === 0) return null;

          return (
            <div key={key} className="flex flex-col gap-3">
              <span className="text-label uppercase tracking-[0.2em] text-taupe">{label}</span>
              <ul className="flex flex-col gap-1.5">
                {notes.map((note) => (
                  <li key={note} className="text-body-md text-espresso">
                    {note}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </section>
  );
}
