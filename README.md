# 🛒 Shoppy — Frontend

Next.js 14 storefront for **Shoppy**, a full-stack e-commerce marketplace.

- **Live Demo:** [shopping-frontend-ebon.vercel.app](https://shopping-frontend-ebon.vercel.app)
- **Backend (Spring Boot):** [shoppy-backend](https://github.com/mahalingam-dev-8/shoppy-backend)

## Demo

▶ [Watch the full flow (≈90 s)](https://www.loom.com/share/9613a8520bd04a83b266ff9ff50295b4): a seller lists a product, a buyer sees it appear live, pays with Stripe, and the order shows up in the buyer's orders and the seller's sales.

---

## Tech Stack

- **Next.js 14:** App Router, Server Components, Server Actions
- **TypeScript:** end-to-end type safety
- **Material UI + Tailwind CSS:** dark theme and responsive layout
- **Stripe Checkout:** hosted, secure payments
- **STOMP over WebSocket** (`@stomp/stompjs`): real-time product updates

---

## Features

- **Auth:** JWT in an HttpOnly cookie, managed through Server Actions, with middleware-based route protection.
- **Roles:**
  - customers browse and buy
  - admins (sellers) list products and track their **Sales** (revenue, orders, customers)
- **Live updates:** new or sold products appear for every shopper without a refresh.
- **Products:** search, ₹ pricing, sold-out and "your listing" states, and image uploads with validation.
- **Checkout:** Stripe Checkout, a payment success page, and order history.
- **UX:**
  - loading skeletons and a top progress bar
  - toasts, and submit buttons that can't be double-clicked
  - a password show/hide toggle

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

> The backend must be running at `NEXT_PUBLIC_API_URL`. See the [backend repo](https://github.com/mahalingam-dev-8/shoppy-backend) for setup instructions.

---

## Deployment

Deployed on **Vercel**, with automatic deploys from the `main` branch.

---

## Related

- **Backend:** [shoppy-backend](https://github.com/mahalingam-dev-8/shoppy-backend). Spring Boot 3, Spring Security, PostgreSQL, Stripe, S3, WebSocket (STOMP).
