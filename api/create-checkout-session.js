import Stripe from 'stripe';

// Price is defined on the server so the browser can never change it (cents).
const RETREAT_PRICE_CENTS = 55000;
const MAX_PARTICIPANTS = 10;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!process.env.STRIPE_SECRET_KEY) {
    return res.status(500).json({ error: 'Payments are not configured.' });
  }

  try {
    const { name, email, bookingInfo } = req.body || {};
    const participants = Number(bookingInfo?.participants);

    if (!Number.isInteger(participants) || participants < 1 || participants > MAX_PARTICIPANTS) {
      return res.status(400).json({ error: 'Invalid number of participants.' });
    }
    if (typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ error: 'Invalid email address.' });
    }

    const retreatTitle = String(bookingInfo?.retreat?.title || 'Retreat').slice(0, 100);
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

    const proto = req.headers['x-forwarded-proto'] || 'https';
    const origin = process.env.SITE_URL || `${proto}://${req.headers.host}`;

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      customer_email: email,
      line_items: [
        {
          quantity: participants,
          price_data: {
            currency: 'usd',
            unit_amount: RETREAT_PRICE_CENTS,
            product_data: { name: `Church of the Stars - ${retreatTitle}` },
          },
        },
      ],
      metadata: {
        name: String(name || '').slice(0, 200),
        phone: String(bookingInfo?.phone || '').slice(0, 50),
        retreat: retreatTitle,
        participants: String(participants),
        specialRequests: String(bookingInfo?.specialRequests || '').slice(0, 450),
      },
      success_url: `${origin}/confirmation?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/payment`,
    });

    return res.status(200).json({ url: session.url });
  } catch (error) {
    console.error('create-checkout-session failed:', error);
    return res.status(500).json({ error: 'Unable to start payment. Please try again.' });
  }
}
