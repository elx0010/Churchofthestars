const escapeHtml = (value) =>
  String(value).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { RESEND_API_KEY, CONTACT_TO_EMAIL } = process.env;
  if (!RESEND_API_KEY || !CONTACT_TO_EMAIL) {
    return res.status(500).json({ error: 'Contact form is not configured.' });
  }

  const { name, email, phone, message, website } = req.body || {};

  // Hidden field only bots fill in; pretend success so they move on.
  if (website) return res.status(200).json({ ok: true });

  if (
    typeof name !== 'string' || !name.trim() ||
    typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
    typeof message !== 'string' || message.trim().length < 10
  ) {
    return res.status(400).json({ error: 'Please check your name, email, and message.' });
  }

  const safeName = name.trim().slice(0, 100);
  const safePhone = String(phone || '').slice(0, 50);
  const safeMessage = message.trim().slice(0, 5000);

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM_EMAIL || 'Church of the Stars <onboarding@resend.dev>',
        to: [CONTACT_TO_EMAIL],
        reply_to: email,
        subject: `New contact form message from ${safeName.replace(/[\r\n]/g, ' ')}`,
        html: `
          <p><strong>Name:</strong> ${escapeHtml(safeName)}</p>
          <p><strong>Email:</strong> ${escapeHtml(email)}</p>
          <p><strong>Phone:</strong> ${escapeHtml(safePhone)}</p>
          <p><strong>Message:</strong></p>
          <p>${escapeHtml(safeMessage).replace(/\n/g, '<br>')}</p>
        `,
      }),
    });

    if (!response.ok) {
      console.error('Resend error:', response.status, await response.text());
      return res.status(502).json({ error: 'Unable to send your message. Please try again.' });
    }

    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error('contact failed:', error);
    return res.status(500).json({ error: 'Unable to send your message. Please try again.' });
  }
}
