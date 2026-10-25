# Church of the Stars - Backend Setup Guide

This guide covers setting up Firebase, Stripe, and SendGrid for the Church of the Stars retreat booking website.

## Table of Contents

1. [Firebase Setup](#firebase-setup)
2. [Stripe Setup](#stripe-setup)
3. [SendGrid Setup](#sendgrid-setup)
4. [Backend Implementation](#backend-implementation)
5. [Testing](#testing)

---

## Firebase Setup

Firebase is used for storing retreat information, bookings, and user profiles.

### Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project"
3. Enter project name: "Church of the Stars"
4. Disable Google Analytics (optional)
5. Click "Create project"

### Step 2: Register Web App

1. In Firebase Console, click the Web icon `</>`
2. App nickname: "churchofthestars-web"
3. Check "Also set up Firebase Hosting" (optional)
4. Click "Register app"
5. Copy the Firebase config

### Step 3: Update Environment Variables

Replace the values in `.env.local`:

```env
VITE_FIREBASE_API_KEY=YOUR_API_KEY
VITE_FIREBASE_AUTH_DOMAIN=YOUR_PROJECT.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=YOUR_PROJECT_ID
VITE_FIREBASE_STORAGE_BUCKET=YOUR_PROJECT.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=YOUR_SENDER_ID
VITE_FIREBASE_APP_ID=YOUR_APP_ID
```

### Step 4: Create Firestore Database

1. In Firebase Console, go to "Firestore Database"
2. Click "Create database"
3. Select "Start in test mode" (change to production rules later)
4. Choose a location
5. Click "Create"

### Step 5: Create Collections

Create the following Firestore collections:

#### Collection: `retreats`
```
Document structure:
{
  id: (auto-generated)
  title: "Spring Renewal Retreat",
  description: "Connect with nature...",
  startDate: Timestamp,
  endDate: Timestamp,
  availableSpots: 25,
  bookedSpots: 8,
  price: 55000, // in cents
  location: "Colorado Rocky Mountains",
  activities: ["Yoga", "Hiking", "Meditation"],
  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

#### Collection: `bookings`
```
Document structure:
{
  id: (auto-generated)
  retreatId: "retreat_document_id",
  firstName: "John",
  lastName: "Doe",
  email: "john@example.com",
  phone: "+15551234567",
  participants: 2,
  specialRequests: "Vegetarian meals",
  totalAmount: 110000, // in cents
  paymentStatus: "pending", // or "completed", "failed"
  stripePaymentId: "pi_1234567890",
  bookingDate: Timestamp,
  bookedAt: Timestamp,
  status: "confirmed" // or "cancelled", "completed"
}
```

#### Collection: `users` (optional, for future auth)
```
Document structure:
{
  id: (auto-generated, should match Firebase Auth UID)
  email: "user@example.com",
  firstName: "John",
  lastName: "Doe",
  phone: "+15551234567",
  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

### Step 6: Set Firestore Security Rules

In Firebase Console, go to Firestore → Rules and update:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow anyone to read retreats (public info)
    match /retreats/{document=**} {
      allow read;
      allow write: if request.auth.uid != null; // Only authenticated users can write
    }
    
    // Allow users to read/write their own bookings
    match /bookings/{document=**} {
      allow read, write: if request.auth.uid != null;
    }
    
    // Allow users to read/write their own profile
    match /users/{userId} {
      allow read, write: if request.auth.uid == userId;
    }
    
    // Deny all other access
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

Click "Publish"

---

## Stripe Setup

Stripe handles payment processing securely.

### Step 1: Create Stripe Account

1. Go to [Stripe.com](https://stripe.com)
2. Click "Start now"
3. Sign up with your email
4. Verify your email
5. Complete account setup

### Step 2: Get API Keys

1. Go to [Stripe Dashboard](https://dashboard.stripe.com)
2. Make sure you're in **Test mode** (toggle in top-right)
3. Go to Developers → API Keys
4. Copy "Publishable key" and "Secret key"

### Step 3: Update Environment Variables

```env
# Frontend (.env.local)
VITE_STRIPE_PUBLIC_KEY=pk_test_your_public_key

# Backend (server/.env or equivalent)
STRIPE_SECRET_KEY=sk_test_your_secret_key
STRIPE_WEBHOOK_SECRET=whsec_test_your_webhook_secret
```

### Step 4: Test Payment Processing

Use Stripe test card numbers:

- **Success**: 4242 4242 4242 4242
- **Decline**: 4000 0000 0000 0002
- Expiry: Any future date
- CVC: Any 3 digits

---

## SendGrid Setup

SendGrid sends confirmation emails to users.

### Step 1: Create SendGrid Account

1. Go to [SendGrid.com](https://sendgrid.com)
2. Sign up for free account
3. Verify your email
4. Complete account setup

### Step 2: Set Up Sender Identity

1. In SendGrid Dashboard, go to Settings → Sender Authentication
2. Click "Verify a Single Sender"
3. Fill in sender details:
   - From Email: noreply@churchofthestars.com
   - From Name: Church of the Stars
   - Reply To: info@churchofthestars.com
4. Click "Create"
5. Verify by clicking the link in your email

### Step 3: Create API Key

1. Go to Settings → API Keys
2. Click "Create API Key"
3. Name: "churchofthestars-booking"
4. Permissions: Check "Mail Send"
5. Click "Create & View"
6. Copy the API key

### Step 4: Update Backend Environment Variables

```env
SENDGRID_API_KEY=SG.your_api_key_here
SENDGRID_FROM_EMAIL=noreply@churchofthestars.com
SENDGRID_FROM_NAME=Church of the Stars
```

### Step 5: Create Email Templates

Create templates in SendGrid for:

1. **Booking Confirmation**
   - Subject: "Your Retreat Booking is Confirmed!"
   - Content: Booking details, dates, cost, next steps

2. **Payment Receipt**
   - Subject: "Payment Received - Retreat Confirmation"
   - Content: Amount paid, retreat info, booking reference

3. **Pre-Retreat Email** (send 1 week before)
   - Subject: "Your Retreat Starts Soon - What to Expect"
   - Content: Itinerary, packing list, arrival instructions

4. **Cancellation Email**
   - Subject: "Your Retreat Booking Has Been Cancelled"
   - Content: Refund information, contact details

---

## Backend Implementation

### Example Node.js/Express Backend for Payment Processing

```javascript
// File: server/routes/payment.js
const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const admin = require('firebase-admin');
const router = express.Router();

// Create payment intent
router.post('/create-payment-intent', async (req, res) => {
  try {
    const { bookingId, amount, email } = req.body;

    // Validate booking in Firestore
    const bookingRef = admin.firestore().collection('bookings').doc(bookingId);
    const bookingSnap = await bookingRef.get();
    
    if (!bookingSnap.exists) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    // Create Stripe payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount, // in cents
      currency: 'usd',
      metadata: {
        bookingId: bookingId,
        email: email
      }
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Handle payment confirmation
router.post('/confirm-payment', async (req, res) => {
  try {
    const { bookingId, paymentIntentId } = req.body;

    // Verify payment with Stripe
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
    
    if (paymentIntent.status !== 'succeeded') {
      return res.status(400).json({ error: 'Payment not successful' });
    }

    // Update booking in Firestore
    const bookingRef = admin.firestore().collection('bookings').doc(bookingId);
    await bookingRef.update({
      paymentStatus: 'completed',
      stripePaymentId: paymentIntentId,
      completedAt: admin.firestore.FieldValue.serverTimestamp()
    });

    // Send confirmation email
    await sendConfirmationEmail(bookingId);

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
```

### Example SendGrid Email Function

```javascript
// File: server/utils/email.js
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const admin = require('firebase-admin');

async function sendConfirmationEmail(bookingId) {
  try {
    // Get booking details
    const bookingSnap = await admin
      .firestore()
      .collection('bookings')
      .doc(bookingId)
      .get();
    
    const booking = bookingSnap.data();

    // Get retreat details
    const retreatSnap = await admin
      .firestore()
      .collection('retreats')
      .doc(booking.retreatId)
      .get();
    
    const retreat = retreatSnap.data();

    // Send email
    await sgMail.send({
      to: booking.email,
      from: process.env.SENDGRID_FROM_EMAIL,
      subject: 'Your Retreat Booking is Confirmed!',
      html: `
        <h2>Welcome to Church of the Stars!</h2>
        <p>Your booking for <strong>${retreat.title}</strong> is confirmed.</p>
        
        <h3>Booking Details:</h3>
        <ul>
          <li><strong>Retreat:</strong> ${retreat.title}</li>
          <li><strong>Dates:</strong> ${formatDate(retreat.startDate)} - ${formatDate(retreat.endDate)}</li>
          <li><strong>Participants:</strong> ${booking.participants}</li>
          <li><strong>Total Cost:</strong> $${(booking.totalAmount / 100).toFixed(2)}</li>
          <li><strong>Booking Reference:</strong> ${bookingId}</li>
        </ul>
        
        <h3>What's Next?</h3>
        <ol>
          <li>Look for detailed retreat information in your next email</li>
          <li>Prepare your packing list (email 2 weeks before)</li>
          <li>Join our pre-retreat call (1 week before)</li>
          <li>Arrive refreshed and ready to transform!</li>
        </ol>
        
        <p>Questions? Reply to this email or contact us at (555) 123-4567</p>
      `
    });

    console.log(`Confirmation email sent to ${booking.email}`);
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
}

module.exports = { sendConfirmationEmail };
```

---

## Testing

### Test Payment Flow

1. Start development server: `npm run dev`
2. Go to landing page, click "Begin Your Journey"
3. Fill in signup form with test email
4. Click "Continue to Booking"
5. Fill in booking form
6. Click "Proceed to Payment"
7. Use Stripe test card: `4242 4242 4242 4242`
8. Click "Pay"
9. Confirm booking shows in Firestore

### Test Email Sending

1. Send a test email from SendGrid Dashboard
2. Verify it arrives in your inbox
3. Create email templates and test them

### Monitor Firebase

1. Go to Firebase Console
2. Check Firestore data is being created
3. Review security rules are working
4. Check logs for any errors

---

## Deployment

When ready for production:

1. **Get live Stripe keys** from dashboard (not test mode)
2. **Update environment variables** in production
3. **Set Firebase to production mode** in security rules
4. **Verify email domain** in SendGrid (not test mode)
5. **Set up HTTPS** for all endpoints
6. **Enable Firebase Authentication** if needed
7. **Test with real payment data** (small test transactions)

---

## Support & Resources

- [Firebase Documentation](https://firebase.google.com/docs)
- [Stripe Documentation](https://stripe.com/docs)
- [SendGrid Documentation](https://docs.sendgrid.com)
- React Hook Form: https://react-hook-form.com
- React Router: https://reactrouter.com

---

**Last Updated**: 2026-09-30
