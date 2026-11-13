# Church of the Stars - Setup Guide

Booking and payment are handled by Eventbrite. The website only links visitors to your Eventbrite events. The only backend is the contact form endpoint (`api/contact.js`), which sends email through Resend.

## Eventbrite

1. Create your events in Eventbrite and set up your payout details (bank account or PayPal) in your organizer settings.
2. Set your organizer page URL in `src/config/eventbrite.js`. The header "Booking" link uses it.
3. For a per-event link, add an `eventbriteUrl` field to the retreat in `src/lib/utils.js`. The "Book This Retreat" button uses it, and falls back to the organizer URL if the field is missing.

Ticket prices, fees, refunds, confirmation emails and attendee lists are all managed in Eventbrite.

## Contact form (Resend)

Set these in the Vercel project (or via `npx vercel dev` locally):

```env
RESEND_API_KEY=your_resend_api_key
CONTACT_TO_EMAIL=where_messages_should_go@example.com
CONTACT_FROM_EMAIL=Church of the Stars <you@your-verified-domain.com>
```

`CONTACT_FROM_EMAIL` is optional and defaults to Resend's onboarding sender.

## Resources

- [Eventbrite Help Center](https://www.eventbrite.com/help/)
- [Resend Documentation](https://resend.com/docs)
