# anylib

> Your universal media library — beautifully organized.

Track movies, shows, games, books, albums, and anything else you love. One library, all your memories.

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38BDF8?style=flat-square&logo=tailwindcss)
![Auth0](https://img.shields.io/badge/Auth0-Authenticated-EB5424?style=flat-square&logo=auth0)

## Features

- 📚 **Universal Library** — Track movies, shows, games, books, albums, and more
- 🏷️ **Smart Filtering** — Filter by type, status, genre, and rating
- ⭐ **Rate & Review** — Rate on a 1–10 scale and add personal notes
- 📊 **Library Stats** — Beautiful breakdowns of your entire collection
- 🔒 **Auth0 Authentication** — Secure login/signup with Auth0
- ✨ **Smooth Animations** — GSAP-powered transitions and interactions
- 🌙 **Dark Theme** — Modern glass-morphism UI

## Getting Started

### Prerequisites

- Node.js 20+
- An [Auth0](https://auth0.com) account

### 1. Install dependencies

```bash
npm install
```

### 2. Configure Auth0

1. Create a **Regular Web Application** in your [Auth0 Dashboard](https://manage.auth0.com)
2. Set **Allowed Callback URLs** to `http://localhost:3000/auth/callback`
3. Set **Allowed Logout URLs** to `http://localhost:3000`
4. Copy your credentials to `.env.local`:

```env
AUTH0_SECRET=<run `openssl rand -hex 32` to generate>
APP_BASE_URL=http://localhost:3000
AUTH0_DOMAIN=your-tenant.auth0.com
AUTH0_CLIENT_ID=your-client-id
AUTH0_CLIENT_SECRET=your-client-secret
```

### 3. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Animations**: GSAP
- **Auth**: Auth0 (nextjs-auth0 v4)
- **UI**: Glass-morphism, dark theme

## Project Structure

```
src/
├── app/
│   ├── page.tsx              # Landing page
│   ├── layout.tsx            # Root layout
│   ├── globals.css           # Global styles
│   ├── HeroSection.tsx       # Animated hero
│   ├── FeaturesSection.tsx   # Feature cards
│   ├── library/
│   │   ├── page.tsx          # Library page (protected)
│   │   └── LibraryClient.tsx # Library client component
│   ├── profile/
│   │   ├── page.tsx          # Profile page (protected)
│   │   └── ProfileClient.tsx # Profile client component
│   └── api/
│       └── library/          # Library CRUD API
├── components/
│   ├── Navbar.tsx            # Navigation bar
│   ├── MediaCard.tsx         # Media item card
│   ├── AddMediaModal.tsx     # Add item modal
│   ├── FilterBar.tsx         # Filter controls
│   ├── StatsGrid.tsx         # Stats display
│   └── AnimatedSection.tsx   # GSAP scroll animation wrapper
├── lib/
│   ├── auth0.ts              # Auth0 client
│   ├── library.ts            # Library data store
│   └── types.ts              # TypeScript types
└── middleware.ts              # Auth0 middleware
```

## License

MIT
