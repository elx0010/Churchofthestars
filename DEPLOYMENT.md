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
   - `RESEND_API_KEY`
   - `CONTACT_TO_EMAIL`
   - `CONTACT_FROM_EMAIL` (optional)

5. Deploy!

## Before Production

### 1. Booking
Booking and payment are handled by Eventbrite.
- [ ] Set your real Eventbrite organizer URL in `src/config/eventbrite.js`
- [ ] Add an `eventbriteUrl` to each retreat in `src/lib/utils.js`
- [ ] Set up payouts in your Eventbrite organizer settings

### 2. Environment Variables
- [ ] Never commit `.env.local` to version control (already added to .gitignore)
- [ ] Use Vercel's secret management for `RESEND_API_KEY`
- [ ] Local testing of `/api` routes requires `npx vercel dev` (plain `npm run dev` doesn't serve them)

### 3. Testing Checklist
- [ ] Click every booking button and confirm it opens the correct Eventbrite page
- [ ] Verify the contact form sends email in production

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

Only needed for testing the contact form locally. Create `.env.local` with:
```
RESEND_API_KEY=your_resend_api_key
CONTACT_TO_EMAIL=you@example.com
```
