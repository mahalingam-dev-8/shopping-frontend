# 🛒 Shoppy — Frontend

The frontend for [Shoppy](https://github.com/mahalingam-dev-8/shopping-backend), a full-stack e-commerce platform built with Next.js 14.

**Live Demo:** [shopping-frontend-ebon.vercel.app](https://shopping-frontend-ebon.vercel.app)

---

## Tech Stack

- **Next.js 14** — App Router, Server Components, Server Actions
- **TypeScript** — End-to-end type safety
- **Tailwind CSS + Material UI** — Responsive styling and component library
- **Stripe.js** — Client-side payment integration
- **Socket.io Client** — Real-time product updates (development)

---

## Features

- Server-side rendering with Next.js App Router for fast initial loads
- JWT authentication with HttpOnly cookies (managed via Server Actions)
- Role-based UI — admin dashboard for product management, user view for browsing and purchasing
- Stripe Checkout integration for secure payments
- Product image display from AWS S3
- Order history page for users
- Real-time product updates via Socket.io (development environment)
- Middleware-based route protection

---

## Getting Started

```bash
git clone https://github.com/mahalingam-dev-8/shopping-frontend.git
cd shopping-frontend
npm install
```

Create `.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:3000
NEXT_PUBLIC_STRIPE_PUBLIC_KEY=pk_test_...
```

Run the dev server:
```bash
npm run dev
```

Open [http://localhost:3002](http://localhost:3002).

> The backend must be running at the URL specified in `NEXT_PUBLIC_API_URL`. See the [backend repo](https://github.com/mahalingam-dev-8/shopping-backend) for setup instructions.

---

## Deployment

Deployed on **Vercel** with automatic deploys from `main` branch. API requests are proxied to the AWS Elastic Beanstalk backend via Vercel rewrites configured in `vercel.json`.

---

## Related

- **Backend:** [shopping-backend](https://github.com/mahalingam-dev-8/shopping-backend) — NestJS API, PostgreSQL, Stripe, AWS S3
