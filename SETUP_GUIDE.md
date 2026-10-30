# Church of the Stars - Setup Guide

This guide covers the current Stripe and SendGrid setup. The website currently uses mock retreat data and browser `sessionStorage`; payment processing, persistent booking storage, and email delivery still require a backend.

## Table of Contents

1. [Stripe Setup](#stripe-setup)
2. [SendGrid Setup](#sendgrid-setup)
3. [Backend Requirements](#backend-requirements)
4. [Testing](#testing)
5. [Deployment](#deployment)

---

## Stripe Setup

### Create a Stripe account and get API keys

1. Create an account at [Stripe](https://stripe.com).
2. In the Stripe Dashboard, enable **Test mode**.
3. Open Developers → API keys and copy the publishable key and secret key.

Configure the frontend publishable key in `.env.local`:

```env
VITE_STRIPE_PUBLIC_KEY=pk_test_your_publishable_key
```

Configure the secret key only in the backend environment:

```env
STRIPE_SECRET_KEY=sk_test_your_secret_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
```

Never put secret keys in `VITE_` variables or frontend code.

### Test card details

Use Stripe's test card numbers while in test mode:

- Successful payment: `4242 4242 4242 4242`
- Declined payment: `4000 0000 0000 0002`
- Expiration: any future date
- CVC: any three digits

## SendGrid Setup

1. Create an account at [SendGrid](https://sendgrid.com).
2. Verify a sender identity in Settings → Sender Authentication.
3. Create an API key with Mail Send permissions.
4. Configure these variables on the backend:

```env
SENDGRID_API_KEY=your_sendgrid_api_key
SENDGRID_FROM_EMAIL=your_verified_sender@example.com
```

Send confirmation emails only after the backend has verified payment success.

## Backend Requirements

Before accepting real payments, implement backend endpoints that:

- Validate bookings against trusted retreat and pricing data; never trust the amount sent by the browser.
- Create Stripe PaymentIntents using the server-side secret key.
- Verify Stripe webhook signatures and use payment events to update booking status.
- Persist bookings and payment status in a database.
- Send confirmation emails after payment is verified.

The current frontend payment form is not a completed Stripe integration. The production flow must use Stripe Elements or the Payment Element to collect payment details, and must not show a booking as paid based only on a successful HTTP response.

## Testing

1. Start the frontend with `npm run dev`.
2. Create a test booking and verify the booking details on the payment page.
3. Once the backend and Stripe Elements are implemented, test with Stripe's test card details above.
4. Verify webhook handling, persisted booking status, error states, and email delivery.

## Deployment

1. Configure `VITE_STRIPE_PUBLIC_KEY` in the frontend deployment environment.
2. Configure `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, and SendGrid credentials only in the backend environment.
3. Configure the Stripe webhook endpoint in the Stripe Dashboard.
4. Use HTTPS and test the complete payment flow before accepting live payments.

## Support & Resources

- [Stripe Documentation](https://stripe.com/docs)
- [SendGrid Documentation](https://docs.sendgrid.com)
- [React Hook Form](https://react-hook-form.com)
- [React Router](https://reactrouter.com)
