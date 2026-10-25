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
   - `VITE_FIREBASE_API_KEY`
   - `VITE_FIREBASE_AUTH_DOMAIN`
   - `VITE_FIREBASE_PROJECT_ID`
   - `VITE_FIREBASE_STORAGE_BUCKET`
   - `VITE_FIREBASE_MESSAGING_SENDER_ID`
   - `VITE_FIREBASE_APP_ID`
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

### 3. Firebase Security (MEDIUM)
- [ ] Enable Firebase Security Rules for Firestore
- [ ] Set up proper authentication (currently not fully implemented)
- [ ] Restrict database access to authenticated users only
- [ ] Use environment variables for all Firebase config

### 4. CORS Configuration (MEDIUM)
- [ ] Configure Stripe webhook handling on backend
- [ ] Set proper CORS headers on your backend API
- [ ] Only allow your frontend domain to make requests

### 5. Testing Checklist
- [ ] Test payment flow with Stripe test keys (pk_test_*)
- [ ] Verify environment variables load correctly on Vercel
- [ ] Test error handling and user feedback
- [ ] Verify Firebase connection works on production

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
VITE_FIREBASE_API_KEY=your_key
VITE_FIREBASE_AUTH_DOMAIN=your_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_STRIPE_PUBLIC_KEY=pk_test_your_key
```
