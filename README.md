# Church of the Stars - Website

A beautiful, responsive website for a wellness and spiritual retreat. Built with React, Vite, and Tailwind CSS. Bookings and payments are handled on Eventbrite.

## Features

- **Landing Page**: Hero section, about section, retreat calendar, and contact form
- **Eventbrite Booking**: Booking buttons link visitors straight to your Eventbrite events
- **Responsive Design**: Works seamlessly on mobile, tablet, and desktop
- **Earthy Modern Style**: Custom color palette with earth tones

## Tech Stack

- **Frontend**: React 19, Vite 8
- **Styling**: Tailwind CSS 4
- **Forms**: React Hook Form
- **Routing**: React Router v6
- **Integrations**: Eventbrite (booking and payment), Resend (contact form email)

## Project Structure

```
src/
├── components/        # Reusable React components
│   ├── Header.jsx        # Navigation header
│   ├── Footer.jsx        # Footer component
│   ├── RetreatCard.jsx   # Retreat card display
│   └── ContactForm.jsx   # Contact form
├── pages/            # Page components
│   └── Landing.jsx       # Main landing page
├── config/           # Configuration files
│   └── eventbrite.js    # Eventbrite organizer URL
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

3. Set your Eventbrite URL in `src/config/eventbrite.js`.

4. Start the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:5173/`

## Environment Variables

Only the contact form API (`api/contact.js`) uses environment variables. See [SETUP_GUIDE.md](SETUP_GUIDE.md).

## Booking

Visitors are sent to Eventbrite to book and pay. The header "Booking" link uses the organizer URL in `src/config/eventbrite.js`. The "Book This Retreat" button uses the retreat's `eventbriteUrl` (set in `src/lib/utils.js`) and falls back to the organizer URL.

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

Retreat information is currently mock data in `src/lib/utils.js`. Ticket prices and availability are managed in Eventbrite.

## Security Considerations

- Use HTTPS for all connections
- Sanitize all user input
- Keep `RESEND_API_KEY` in the backend environment only (never a `VITE_` variable)

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

- [ ] Persistent retreat storage
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
