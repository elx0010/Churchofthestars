# Deployment Guide for ChurchOfTheStars

## Vercel Deployment

### Prerequisites
- Vercel account (vercel.com)
- GitHub repository connected to Vercel
- Environment variables ready (see below)

### Steps
1. Push your code to GitHub
2. Go to vercel.com and create a new project
3. Import your GitHub repository
4. Set environment variables in Vercel project settings:
   - `VITE_STRIPE_PUBLIC_KEY`

5. Deploy!

## ⚠️ IMPORTANT Security Issues Before Production

### 1. Payment Processing
Payments use **Stripe Checkout**: the Pay button calls `api/create-checkout-session.js` (price set server-side), redirects to Stripe, and `/confirmation` verifies the payment with `api/verify-session.js`.

**Setup:**
- [ ] In Vercel → Settings → Environment Variables, add `STRIPE_SECRET_KEY` (secret key, `sk_test_...` / `sk_live_...`). Never use a `VITE_` prefix for it.
- [ ] Add `VITE_STRIPE_PUBLIC_KEY` (publishable key) and redeploy
- [ ] In Stripe Dashboard → Settings → Emails, turn on "Successful payments" receipts
- [ ] Test with card `4242 4242 4242 4242` in test mode, then switch both keys to live keys
- [ ] Optional: set `SITE_URL` (e.g. `https://www.churchofthestars.co`) to force the redirect domain
- [ ] Local testing of `/api` routes requires `npx vercel dev` (plain `npm run dev` doesn't serve them)

### 2. Environment Variables (HIGH)
- [ ] Never commit `.env.local` to version control (already added to .gitignore)
- [ ] Use Vercel's secret management for sensitive keys
- [ ] Rotate keys periodically
- [ ] Use Stripe's restricted API keys for frontend

### 3. CORS Configuration (MEDIUM)
- [ ] Configure Stripe webhook handling on backend
- [ ] Set proper CORS headers on your backend API
- [ ] Only allow your frontend domain to make requests

### 4. Testing Checklist
- [ ] Test payment flow with Stripe test keys (pk_test_*)
- [ ] Verify environment variables load correctly on Vercel
- [ ] Test error handling and user feedback
- [ ] Verify payment backend and webhook work in production

## Local Development

```bash
npm install
npm run dev
```

Visit http://localhost:5173

## Build for Production

```bash
npm run build
npm run preview
```

## Environment Variables Template

Create `.env.local` with:
```
VITE_STRIPE_PUBLIC_KEY=pk_test_your_key
```
