# Lucid Parfums

A premium fragrance e-commerce platform. This repository is being built in parts;
this is the **foundation** — project structure, tooling, and the pieces every
future part builds on.

## Stack

**Client** — React, TypeScript, Vite, Tailwind CSS v4, React Router, Lucide React, Framer Motion
**Server** — Node.js, Express, TypeScript, MongoDB, Mongoose

## Project Structure

```text
lucid-parfums/
├── client/                  React frontend
│   └── src/
│       ├── api/             Fetch wrapper for talking to the backend
│       ├── components/
│       │   ├── common/      Button, Card, Modal, Drawer, Toast, Badge, etc.
│       │   ├── form/        Input, Textarea, Select, Checkbox, Radio, FileUpload
│       │   ├── layout/      Header, Footer, MobileNav, SearchBar
│       │   ├── cart/        CartIcon, CartDrawer, CartItem, QuantityControl
│       │   ├── product/     ProductCard
│       │   └── admin/       (empty — reserved for the Admin Dashboard part)
│       ├── constants/       Route paths, nav links, app config
│       ├── context/         ToastContext
│       ├── data/            Isolated mock data (mockProducts.ts)
│       ├── hooks/           useHealthCheck, useLockBodyScroll, useFocusTrap, etc.
│       ├── layouts/         MainLayout, AdminLayout
│       ├── pages/           One component per route
│       ├── routes/          Router configuration
│       ├── services/        API-calling functions grouped by domain
│       ├── store/           Global state (added as needed)
│       ├── types/           Shared TypeScript types
│       └── utils/           cn, formatPrice, placeholderImage
│
├── server/                  Express API
│   └── src/
│       ├── config/          env.ts, db.ts
│       ├── constants/       Shared backend constants
│       ├── controllers/     Request handlers
│       ├── middleware/      errorHandler, notFound, requestLogger
│       ├── models/          Mongoose schemas (added per part)
│       ├── routes/          Express routers, mounted under /api
│       ├── services/        Business logic, called by controllers
│       ├── types/           Shared TypeScript types
│       ├── utils/           ApiError, asyncHandler, logger
│       ├── validators/      Request validation (added per part)
│       ├── app.ts           Express app assembly
│       └── server.ts        Entry point — connects DB, starts listening
│
├── .env.example              Every environment variable used by both apps
└── .gitignore
```

## Getting Started

### 1. Install dependencies

```bash
cd client && npm install
cd ../server && npm install
```

### 2. Configure environment variables

```bash
cp server/.env.example server/.env
cp client/.env.example client/.env
```

`server/.env` needs a working `DATABASE_URL` (a local MongoDB instance or a
connection string from MongoDB Atlas) to fully start — see [Database](#database) below.

### 3. Run both apps in development

```bash
# Terminal 1
cd server && npm run dev

# Terminal 2
cd client && npm run dev
```

- Client: http://localhost:5173
- Server: http://localhost:5000
- Health check: http://localhost:5000/api/health

The home page shows a live "Backend connected" indicator once both are running.

## Database

The Mongoose connection module (`server/src/config/db.ts`) connects on server
start and fails fast (10s) with a clear message if `DATABASE_URL` is wrong —
bad credentials, wrong cluster address, or (on Atlas) an IP not on the
Network Access list. To run the server with a real database:

- **Local**: install MongoDB Community Edition and leave `DATABASE_URL` pointing
  at `mongodb://127.0.0.1:27017/lucid-parfums`, or
- **Hosted**: create a free cluster on MongoDB Atlas and paste its connection
  string into `DATABASE_URL`.

### Seeding demo products

With a real `.env` in place:

```bash
cd server
npm run seed
```

This populates 15 demo fragrances (upserted by slug), a handful of real
reviews for some of them, and the two delivery methods (Standard/Express)
checkout uses — all safe to re-run. Real product photography can replace the
generated placeholder images later — just update `primaryImage` / `images`
on each product; nothing else changes.

## Available Scripts

**Client** (`client/`)
| Command | Description |
|---|---|
| `npm run dev` | Start the Vite dev server |
| `npm run build` | Type-check and build for production |
| `npm run preview` | Preview the production build locally |

**Server** (`server/`)
| Command | Description |
|---|---|
| `npm run dev` | Start the API with hot reload (tsx watch) |
| `npm run build` | Compile TypeScript to `dist/` |
| `npm start` | Run the compiled server (`dist/server.js`) |
| `npm run typecheck` | Type-check without emitting output |
| `npm run seed` | Populate the database with 15 demo products |

## Design Direction

Premium, elegant, warm, minimal. Palette built around ivory, cream, champagne,
espresso, and muted gold/bronze — no blue. Typography pairs a serif display
face (Cormorant Garamond) with a clean sans body face (Inter). The full design
system, header, footer, and UI kit are built in Part 2.

## Design System (Part 2)

A full visual foundation lives under `client/src/components/`:

- **`common/`** — Button, IconButton, Badge, Card, Modal, Drawer, Toast, Spinner,
  Skeleton, EmptyState, ErrorState, ResponsiveImage, Logo, BrandDivider
- **`form/`** — Input (text/email/password/search), Textarea, Select, Checkbox,
  Radio, FileUpload, all sharing a common FieldShell for label/error/helper text
- **`layout/`** — Header, Footer, MobileNav, SearchBar
- **`cart/`** — CartIcon, CartDrawer, CartItem, QuantityControl, CartSummary
  (visual only — no persistence or checkout logic yet)
- **`product/`** — ProductCard, backed by isolated mock data in `data/mockProducts.ts`

All colors, type sizes, radii, shadows, and easing curves are defined once in
`client/src/index.css` under `@theme`. No blue anywhere in the palette.

## Public Storefront (Part 3)

The homepage now composes real sections under `client/src/components/home/`:

- **Hero** — headline, CTA, and an inline-SVG bottle illustration (no stock photography)
- **CategoryTiles** — shop-by-category entry points for Men, Women, Unisex, Fragrance
- **Benefits** — shipping/returns/packaging value props
- **BrandStory** — brand philosophy section with a botanical line illustration
- **Testimonials** — illustrative customer quotes (clearly marked as placeholder,
  not real reviews — swap in real review data once that feature exists)

Product rows (Featured, New Arrivals, Best Sellers) use the shared
`ProductSection` component (`components/product/ProductSection.tsx`), filtering
`mockProducts` by badge. Swapping in real API data later only means changing
what's passed to `ProductSection` — the component itself doesn't change.

## Products, Shop & Search (Part 4)

Real MongoDB-backed products have replaced the mock catalog:

- **`server/src/models/Product.ts`** — full schema (pricing, sizes, notes,
  fragrance family, stock, flags) with text-search and filter indexes
- **`server/src/routes/product.route.ts`** — `GET /api/products` (list, with
  search/filter/sort/pagination via query params), `GET /api/products/:slug`,
  and admin-only `POST` / `PUT` / `DELETE`
- **Admin write endpoints are guarded** by `middleware/requireAdmin.ts`, which
  fails closed on every request until real authentication exists in a later
  part — there is no way to create, edit, or archive a product without it,
  regardless of what the frontend sends
- **`server/src/seed/`** — 15 realistic demo products across every gender and
  fragrance family. Run `npm run seed` from `server/` (with a real `.env` in
  place) to populate your database
- **Frontend** — `services/productService.ts` + `hooks/useProducts.ts` fetch
  real data; `/shop` has full search/filter/sort/pagination synced to the URL
  (`?gender=women&sort=price-low`), and `/men /women /unisex /fragrance` share
  the same fetching hook instead of duplicating it per page

## Product Details, Reviews & Related Products (Part 5)

`/product/:slug` is now a complete product-detail experience, backed entirely
by the Part 4 API:

- **`ProductGallery`** — thumbnails, previous/next controls, touch swipe, and
  a lightbox, with loading and broken-image fallbacks built in
- **`ProductInfoPanel`** — pricing (with discount %), stock status (never an
  exact inventory count), size selection, quantity, and purchase actions.
  There's no cart store yet (a later part) — Add to Cart / Buy Now give
  honest feedback ("coming in an upcoming part") rather than faking a
  working order flow, the same pattern the Part 2 search UI uses
- **Reviews** — `server/src/models/Review.ts` + `GET/POST /api/reviews`.
  Submission is guarded by `middleware/requireAuth.ts`, which fails closed
  the same way `requireAdmin` does — there is no way to post a review
  without real authentication (Part 6), and the UI says so plainly instead
  of pretending it works
- **Related products** — `productService.getRelated()` picks by relevance
  (fragrance family + gender, then fragrance family, then category) instead
  of showing arbitrary products
- **Recently viewed** — a lightweight, client-only `localStorage` snapshot
  (`hooks/useRecentlyViewed.ts`); nothing is sent to the backend
- **SEO** — `hooks/useProductSeo.ts` sets the document title, meta
  description, and injects Product JSON-LD per product page

## Authentication & Customer Accounts (Part 6)

Real authentication now backs everything the previous parts left guarded:

- **`server/src/models/User.ts`** — `passwordHash` and password-reset fields
  are `select: false`, so they're never accidentally included in a query
  result; `role` defaults to `customer` and is never settable by the client
- **Session** — JWT in an `httpOnly`, `sameSite=lax` cookie (`secure` in
  production). The token only carries a user id; role and account status are
  always re-read from the database on every request, so disabling an account
  or changing a role takes effect immediately, not just after a token expires
- **`middleware/requireAuth.ts` and `middleware/requireAdmin.ts` are now real.**
  These replace the fail-closed stubs from Parts 4 and 5 — the product
  admin routes and review submission now work correctly with **zero changes**
  to their own route files, exactly as those stubs' comments promised
- **Endpoints**: `POST /api/auth/{register,login,logout}`, `GET /api/auth/me`,
  `POST /api/auth/{forgot-password,reset-password}`, and
  `GET/PUT /api/users/me` + `POST /api/users/me/password` for profile
- Login/register/reset endpoints are rate-limited; password reset always
  returns the same response whether or not the email has an account
- Password reset tokens are stored as a SHA-256 hash, never in plain text;
  the raw link is logged to the server's own console in development only
  (there's no real email provider configured yet — see
  `server/src/services/email.service.ts`)
- **Frontend** — `context/AuthContext.tsx` restores the session on load,
  `components/auth/ProtectedRoute.tsx` guards `/account`, `/orders`,
  `/wishlist`, and `/admin` (by role). The header and mobile menu adapt to
  sign-in state, including a conditional Admin link

## Cart, Wishlist, Checkout & Orders (Part 7)

A real, transactional shopping flow — server-side cart, authenticated wishlist,
and order creation that can't be manipulated from the frontend:

- **Cart** (`GET/POST/PUT/DELETE /api/cart*`) — server-side per authenticated
  user only, no localStorage fallback. Every add/update re-checks live stock
  and price against MongoDB; nothing from the frontend is trusted for either.
  `CartContext` replaces the Part 2/3 local-state cart in the header — the
  drawer, page, and icon count are now the same real data everywhere
- **Wishlist** (`GET/POST/DELETE /api/wishlist/:productId`) — duplicate-safe,
  authenticated-only. Guests get a clear sign-in prompt (`useRequireAuthAction`)
  instead of the action silently failing
- **Addresses** (`GET/POST/PUT /api/addresses*`) — every lookup filters by
  `{_id, user}` together, so an address id that belongs to a different
  customer simply matches nothing
- **Order creation** (`POST /api/orders`) — the security-critical piece:
  runs inside a real MongoDB transaction with atomic, conditional stock
  decrements (`$gte` check + `$inc` in one operation), so two customers
  racing for the last unit can't both succeed, and any failure partway
  through an order rolls back every decrement already made in it. Prices,
  totals, and stock are always recalculated server-side from live product
  data — never accepted from the request. `paymentStatus` can only ever be
  `'pending'` right now; nothing marks an order paid without a real payment
  provider, which doesn't exist yet
- **Order numbers** (`LP-2026-000001`) generated via an atomic counter
  document, not by counting existing orders — race-condition-free even
  under concurrent checkouts
- Full flow: `/cart` → `/checkout` (address, delivery method, Cash on
  Delivery — Online Payment is visibly present but disabled, since faking
  a successful online payment isn't acceptable) → `/order-success/:orderNumber`
  → `/orders` → `/orders/:orderNumber`, all behind `ProtectedRoute`

## Status

**Part 1 — Foundation: complete.**
**Part 2 — Design System & Global UI: complete.**
**Part 3 — Public Storefront: complete.**
**Part 4 — Products, Shop, Search, Categories & Filtering: complete.**
**Part 5 — Product Details, Gallery, Reviews & Related Products: complete.**
**Part 6 — Authentication, Customer Accounts & Authorization: complete.**
**Part 7 — Cart, Wishlist, Checkout & Order Creation: complete.**

- [x] Frontend and backend scaffolded with a clean, modular structure
- [x] Tailwind CSS v4 configured with the brand palette and full design tokens
- [x] Full routing foundation with placeholder pages
- [x] Express server with centralized error handling and a working health check
- [x] MongoDB/Mongoose connection module ready, with fast-fail diagnostics on a
      bad connection string
- [x] Environment variable templates for every planned integration
- [x] TypeScript strict mode on both apps, compiling cleanly
- [x] Reusable component library: buttons, forms, cards, badges, modals, drawers,
      toasts, loading/empty/error states
- [x] Responsive header with mobile navigation drawer, and a full footer
- [x] Accessibility basics: focus traps, Escape-to-close, visible focus rings,
      reduced-motion support
- [x] Real homepage: hero, category tiles, featured/new/best-seller product rows,
      brand story, benefits, testimonials
- [x] Real MongoDB product catalog with search, filters, sorting, and pagination
- [x] Shop page and all four collection pages backed by live data
- [x] Full product detail page: gallery, pricing, stock, sizes, fragrance
      notes, ingredients, reviews, related products, recently viewed
- [x] Real JWT cookie-based authentication: register, login, logout, session
      restore, forgot/reset password, profile editing, change password
- [x] Admin and review-write routes now genuinely enforce authorization —
      not just hidden buttons — with zero changes to their route definitions
- [x] Protected frontend routes for account, orders, wishlist, and the
      role-gated admin dashboard
- [x] Real server-side cart and wishlist, wired into the header, product
      cards, and product detail page
- [x] Transactional, stock-safe order creation with atomic order numbers
- [x] Full checkout → order confirmation → order history flow

**Next: Part 8 — Admin Dashboard, Product Management & Order Management.**
