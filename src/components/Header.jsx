import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import logo from '../assets/church-of-the-stars-favicon.svg'

export default function Header() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 bg-brand-night shadow-md">
      <nav className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-14 h-14 rounded-full flex items-center justify-center">
            <img src={logo} alt="Church of the Stars logo" className="w-14 h-14" />
          </div>
          <span className="font-display text-3xl font-medium text-brand-cream hidden sm:inline">Church of the Stars</span>
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
          <Link
            to="/booking"
            className={`font-display text-xl font-medium transition-colors ${
              isActive('/booking') ? 'text-brand-cream' : 'text-brand-cream hover:text-brand-cream/70'
            }`}
          >
            Booking
          </Link>
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
            <Link
              to="/booking"
              className={`font-display text-xl font-medium transition-colors ${
                isActive('/booking') ? 'text-brand-cream' : 'text-brand-cream'
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Booking
            </Link>
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
