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

### 1. Payment Processing (CRITICAL)
**Current Issue:** The payment form needs backend integration for Stripe

**What to do:**
- [ ] Set up a backend API (Node.js, Python, etc.) to handle Stripe payments
- [ ] Use Stripe Elements or Payment Element for card input on frontend
- [ ] Create a payment intent on your backend
- [ ] Send only the payment token to your backend, never raw card data
- [ ] Handle payment confirmation server-side

**Resources:**
- Stripe React documentation: https://stripe.com/docs/stripe-js/react
- Stripe Payment Intent guide: https://stripe.com/docs/payments/payment-intents

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
