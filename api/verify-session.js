import Stripe from 'stripe';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const sessionId = req.query.session_id;
  if (!process.env.STRIPE_SECRET_KEY || typeof sessionId !== 'string' || !sessionId.startsWith('cs_')) {
    return res.status(400).json({ error: 'Invalid request.' });
  }

  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    return res.status(200).json({
      paid: session.payment_status === 'paid',
      amountTotal: session.amount_total,
      email: session.customer_details?.email || session.customer_email,
      metadata: session.metadata,
    });
  } catch (error) {
    console.error('verify-session failed:', error);
    return res.status(404).json({ error: 'Payment not found.' });
  }
}
