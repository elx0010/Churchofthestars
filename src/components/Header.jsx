import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import logo from '../assets/church-of-the-stars-favicon.svg'

export default function Header() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <nav className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-14 h-14 rounded-full flex items-center justify-center">
            <img src={logo} alt="Church of the Stars logo" className="w-14 h-14" />
          </div>
          <span className="text-2xl font-bold text-earth-900 hidden sm:inline">Church of the Stars</span>

        </Link>

        {/* Desktop Navigation */}
        <div className="hidden sm:flex items-center gap-8">
          <Link
            to="/"
            className={`font-semibold transition-colors ${
              isActive('/') ? 'text-earth-600' : 'text-earth-900 hover:text-earth-600'
            }`}
          >
            Home
          </Link>
          <Link
            to="/booking"
            className={`font-semibold transition-colors ${
              isActive('/booking') ? 'text-earth-600' : 'text-earth-900 hover:text-earth-600'
            }`}
          >
            Booking
          </Link>
          <a
            href="/#contact"
            className={`font-semibold transition-colors text-earth-900 hover:text-earth-600`}
          >
            Contact
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="sm:hidden text-earth-900 text-2xl"
        >
          ☰
        </button>
      </nav>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-earth-50 border-t-2 border-earth-200">
          <div className="flex flex-col gap-4 px-4 py-4">
            <Link
              to="/"
              className={`font-semibold transition-colors ${
                isActive('/') ? 'text-earth-600' : 'text-earth-900'
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/booking"
              className={`font-semibold transition-colors ${
                isActive('/booking') ? 'text-earth-600' : 'text-earth-900'
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Booking
            </Link>
            <a
              href="/#contact"
              className={`font-semibold transition-colors text-earth-900`}
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
