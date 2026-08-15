import { Link } from 'react-router-dom';
import { buttonClasses } from '@/components/common/Button';
import { Container } from '@/components/common/Container';
import { BrandDivider } from '@/components/common/BrandDivider';
import { ROUTES } from '@/constants/routes';

function SprigIllustration() {
  return (
    <svg viewBox="0 0 300 300" className="h-full w-full" role="img" aria-label="Botanical line illustration">
      <circle cx="150" cy="150" r="140" fill="#e3c9a1" opacity="0.25" />
      <path d="M150 240 V90" stroke="#4a3728" strokeWidth="2" fill="none" />
      <path d="M150 200 C120 190 100 165 95 130" stroke="#b08d57" strokeWidth="2" fill="none" />
      <path d="M150 200 C180 190 200 165 205 130" stroke="#b08d57" strokeWidth="2" fill="none" />
      <path d="M150 150 C125 142 108 120 104 92" stroke="#b08d57" strokeWidth="2" fill="none" />
      <path d="M150 150 C175 142 192 120 196 92" stroke="#b08d57" strokeWidth="2" fill="none" />
      <circle cx="150" cy="82" r="7" fill="#4a3728" />
    </svg>
  );
}

export function BrandStory() {
  return (
    <section className="bg-ivory py-20">
      <Container className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
        <div className="mx-auto h-64 w-64 sm:h-80 sm:w-80">
          <SprigIllustration />
        </div>

        <div className="flex flex-col items-start gap-5">
          <span className="text-label uppercase tracking-[0.2em] text-taupe">Our Philosophy</span>
          <h2 className="font-serif text-heading-lg text-espresso sm:text-display-md">
            Composed, not layered.
          </h2>
          <BrandDivider className="ml-0 justify-start" />
          <p className="max-w-md text-body-md text-taupe">
            Most fragrance is built to be noticed from across the room. We build ours around a
            single clear idea — a note, a memory, a mood — and let it sit close to the skin.
            Nothing extraneous, nothing loud.
          </p>
          <p className="max-w-md text-body-md text-taupe">
            Every formula moves through dozens of revisions before it earns the Lucid name, and
            every bottle is finished by hand in small batches.
          </p>
          <Link to={ROUTES.ABOUT} className={buttonClasses('outline', 'md', 'mt-2')}>
            Read Our Story
          </Link>
        </div>
      </Container>
    </section>
  );
}
