/**
 * Generates an on-brand inline SVG placeholder — a simple perfume
 * bottle silhouette — as a data URI. Used only by mock product data
 * so the design system never depends on external stock photography.
 * Swapping to real product photography later is just changing the
 * `imageUrl` string; ProductCard and ResponsiveImage don't change.
 */
export function bottlePlaceholder(fill: string, background: string): string {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 400">
      <rect width="300" height="400" fill="${background}" />
      <rect x="130" y="40" width="40" height="24" rx="4" fill="${fill}" opacity="0.85" />
      <rect x="120" y="64" width="60" height="18" rx="3" fill="${fill}" opacity="0.6" />
      <path d="M108 82 h84 a10 10 0 0 1 10 10 v210 a18 18 0 0 1 -18 18 h-68 a18 18 0 0 1 -18 -18 v-210 a10 10 0 0 1 10 -10 z" fill="${fill}" opacity="0.16" stroke="${fill}" stroke-width="2" />
      <line x1="98" y1="150" x2="202" y2="150" stroke="${fill}" stroke-width="1" opacity="0.4" />
    </svg>
  `.trim();

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}
