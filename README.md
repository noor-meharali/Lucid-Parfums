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
│       ├── components/      common, layout, product, cart, checkout, admin
│       ├── constants/       Route paths, app config
│       ├── context/         React context providers (added as needed)
│       ├── data/            Static/local data (added as needed)
│       ├── hooks/           Reusable hooks (e.g. useHealthCheck)
│       ├── layouts/         MainLayout, AdminLayout
│       ├── pages/           One component per route
│       ├── routes/          Router configuration
│       ├── services/        API-calling functions grouped by domain
│       ├── store/           Global state (added as needed)
│       ├── types/           Shared TypeScript types
│       └── utils/           Small helper functions
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

This foundation includes the Mongoose connection module (`server/src/config/db.ts`)
but no models yet — those are added in their dedicated parts. To run the server
with a real database:

- **Local**: install MongoDB Community Edition and leave `DATABASE_URL` pointing
  at `mongodb://127.0.0.1:27017/lucid-parfums`, or
- **Hosted**: create a free cluster on MongoDB Atlas and paste its connection
  string into `DATABASE_URL`.

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

## Design Direction

Premium, elegant, warm, minimal. Palette built around ivory, cream, champagne,
espresso, and muted gold/bronze — no blue. Typography pairs a serif display
face (Cormorant Garamond) with a clean sans body face (Inter). The full design
system, header, footer, and UI kit are built in Part 2.

## Status

**Part 1 — Foundation: complete.**

- [x] Frontend and backend scaffolded with a clean, modular structure
- [x] Tailwind CSS v4 configured with the brand palette
- [x] Full routing foundation with placeholder pages
- [x] Express server with centralized error handling and a working health check
- [x] MongoDB/Mongoose connection module ready
- [x] Environment variable templates for every planned integration
- [x] TypeScript strict mode on both apps, compiling cleanly

**Next: Part 2 — Design System, Global UI, Header, Footer, Buttons, Forms, Responsive Layout.**
