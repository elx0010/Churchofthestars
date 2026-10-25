# Church of the Stars - Website

A beautiful, responsive website for a wellness and spiritual retreat booking platform. Built with React, Vite, Tailwind CSS, Firebase, and Stripe.

## Features

- **Landing Page**: Hero section, about section, retreat calendar, contact form, and signup form
- **Booking Page**: Retreat selection and comprehensive booking form with FAQ
- **Payment Page**: Secure payment form with order summary
- **Confirmation Page**: Booking confirmation with next steps
- **Responsive Design**: Works seamlessly on mobile, tablet, and desktop
- **Earthy Modern Style**: Custom color palette with earth tones

## Tech Stack

- **Frontend**: React 19, Vite 8
- **Styling**: Tailwind CSS 4
- **Forms**: React Hook Form
- **Routing**: React Router v6
- **Backend (Ready for)**: Firebase (Database), Stripe (Payments), SendGrid (Email)
- **State Management**: Session Storage (development), Firebase (production)

## Project Structure

```
src/
├── components/        # Reusable React components
│   ├── Header.jsx        # Navigation header
│   ├── Footer.jsx        # Footer component
│   ├── RetreatCard.jsx   # Retreat card display
│   ├── ContactForm.jsx   # Contact form
│   ├── SignupForm.jsx    # Quick signup form
│   ├── BookingForm.jsx   # Booking form
│   └── PaymentForm.jsx   # Payment form
├── pages/            # Page components
│   ├── Landing.jsx       # Main landing page
│   ├── Booking.jsx       # Booking page
│   ├── Payment.jsx       # Payment page
│   └── Confirmation.jsx  # Confirmation page
├── config/           # Configuration files
│   ├── firebase.js      # Firebase initialization
│   └── stripe.js        # Stripe configuration
├── lib/              # Utility functions
│   └── utils.js         # Helper functions and mock data
├── App.jsx           # Main app component with routing
├── App.css           # App-specific styles
├── index.css         # Tailwind directives and global styles
└── main.jsx          # Application entry point
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Clone or navigate to the project directory:
```bash
cd churchofthestars
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
# Edit .env.local with your Firebase and Stripe credentials
```

4. Start the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:5173/`

## Environment Variables

Create a `.env.local` file in the project root with the following variables:

```
VITE_FIREBASE_API_KEY=your_key
VITE_FIREBASE_AUTH_DOMAIN=your_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_STRIPE_PUBLIC_KEY=your_stripe_public_key
```

## Backend Integration Notes

### Firebase Setup

The app is ready for Firebase integration:
- Database schema ready in `src/config/firebase.js`
- Mock retreat data in `src/lib/utils.js` (replace with Firestore queries)
- Authentication setup available in firebase config

**Collections to create in Firestore:**
- `retreats` - Retreat information and availability
- `bookings` - User booking records
- `users` - User profile information

### Stripe Payment Integration

Payment processing is currently client-side only. For production:

1. Create a backend endpoint to handle Stripe charge creation
2. Move sensitive keys to backend environment
3. Use Stripe Elements for secure card input (client-side only handles card data)
4. Implement webhook handling for payment confirmations

**Implementation steps:**
- Backend should validate booking data
- Create Stripe PaymentIntent or Charge on backend
- Confirm payment securely
- Store transaction records in Firebase

### SendGrid Email Confirmation

Emails are not currently sent. To implement:

1. Create a backend endpoint for sending emails
2. Use SendGrid API with authentication
3. Create email templates for:
   - Booking confirmation
   - Payment receipt
   - Pre-retreat information
   - Reminder emails

## Styling

The project uses Tailwind CSS with custom colors defined in `tailwind.config.js`:

- **Earth palette**: Browns and warm neutrals
- **Sage palette**: Muted greens (available for accents)

Custom components are defined in `src/index.css`:
- `.btn-primary` - Primary call-to-action button
- `.btn-secondary` - Secondary button style
- `.section-title` - Large section headings
- `.input-field` - Form input styling

## Available Scripts

```bash
npm run dev       # Start development server
npm run build     # Build for production
npm run preview   # Preview production build
npm run lint      # Run ESLint
```

## Current Data

All retreat data and bookings use mock data stored in `sessionStorage` (browser-only storage). To persist data:

1. Move mock data from `src/lib/utils.js` to Firestore
2. Update components to query Firebase instead
3. Implement real-time updates with Firestore listeners

**Current mock retreat cost:** $550 per person (configurable in `src/config/stripe.js`)

## Security Considerations

⚠️ **For Production:**
- Never expose Stripe secret keys in frontend
- Always validate bookings on backend
- Use HTTPS for all connections
- Implement proper authentication before allowing bookings
- Sanitize all user input
- Use Firebase security rules to protect data

## Responsive Design

The website is fully responsive with breakpoints:
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

All components tested on:
- iPhone 12/13
- iPad Air
- Desktop (1440px)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Future Enhancements

- [ ] Email confirmations via SendGrid
- [ ] Payment processing with Stripe
- [ ] Firebase database integration
- [ ] User authentication
- [ ] Admin dashboard for retreat management
- [ ] Email marketing integration
- [ ] Multi-language support
- [ ] Dark mode
- [ ] Analytics and tracking
- [ ] Cancellation policy management
- [ ] Discount codes and promotions

## Troubleshooting

### Port Already in Use
If port 5173 is already in use, Vite will use the next available port.

### OneDrive Sync Issues
If you experience file write errors with Turbopack:
- Move the project outside OneDrive folder, or
- Exclude `.next` and `node_modules` from OneDrive sync

### Build Errors
- Clear cache: `rm -r node_modules .next && npm install`
- Check Node version: `node --version` (should be 18+)

## Support

For questions about the retreat or booking:
- 📧 Email: info@churchofthestars.com
- 📞 Phone: (555) 123-4567
- 🌐 Website: churchofthestars.com

## License

Private - Church of the Stars

---

**Last Updated**: 2026-09-30
**Built with**: Vite + React + Tailwind CSS
