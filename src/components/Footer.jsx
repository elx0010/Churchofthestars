export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-night text-brand-cream mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Church of the Stars</h3>
            <p className="text-brand-cream">
              A wellness and spiritual retreat experience in the heart of nature.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="#home" className="text-brand-cream hover:text-white transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#about" className="text-brand-cream hover:text-white transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="#contact" className="text-brand-cream hover:text-white transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <p className="text-brand-cream mb-2">info.churchofthestars@gmail.com</p>
            <p className="text-brand-cream mb-2">(435) 592-2401</p>
            <p className="text-brand-cream">Retreat Center<br />Cedar City, Utah</p>
          </div>
        </div>
        <div className="border-t border-brand-cream/20 pt-8 text-center text-brand-cream/70">
          <p>&copy; {currentYear} Church of the Stars. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
