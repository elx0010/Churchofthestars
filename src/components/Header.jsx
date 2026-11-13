import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import starLogo from '../assets/star-logo.svg'
import { EVENTBRITE_ORGANIZER_URL } from '../config/eventbrite'

export default function Header() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 bg-black/40 backdrop-blur-sm shadow-md">
      <nav className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">
            <img src={starLogo} alt="Church of the Stars star logo" className="w-18 h-18" style={{ filter: 'drop-shadow(0 0 8px rgba(224, 198, 130, 0.9))' }} />
          </div>
          <span className="font-display text-xl font-medium text-brand-cream hidden sm:inline" style={{ letterSpacing: '0.12em' }}>CHURCH OF THE<span className='flex items-center justify-center'>STARS</span></span>
        </Link>

        <div className="hidden sm:flex items-center gap-8">
          <Link
            to="/"
            className={`font-display text-xl font-medium transition-colors ${
              isActive('/') ? 'text-brand-cream' : 'text-brand-cream hover:text-brand-cream/70'
            }`}
          >
            Home
          </Link>
          <a
            href={EVENTBRITE_ORGANIZER_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="font-display text-xl font-medium transition-colors text-brand-cream hover:text-brand-cream/70"
          >
            Booking
          </a>
          <a
            href="/#contact"
            className={`font-display text-xl font-medium transition-colors text-brand-cream hover:text-brand-cream/70`}
          >
            Contact
          </a>
        </div>

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="sm:hidden text-brand-cream text-2xl"
        >
          ☰
        </button>
      </nav>

  
      {mobileMenuOpen && (
        <div className="md:hidden bg-surface-inverse border-t-2 border-brand-forest">
          <div className="flex flex-col gap-4 px-4 py-4">
            <Link
              to="/"
              className={`font-display text-xl font-medium transition-colors ${
                isActive('/') ? 'text-brand-cream' : 'text-brand-cream'
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <a
              href={EVENTBRITE_ORGANIZER_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="font-display text-xl font-medium transition-colors text-brand-cream"
              onClick={() => setMobileMenuOpen(false)}
            >
              Booking
            </a>
            <a
              href="/#contact"
              className={`font-display text-xl font-medium transition-colors text-brand-cream`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
