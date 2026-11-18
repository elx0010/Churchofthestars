import { MdOutlineMailOutline, MdOutlinePhone, MdOutlineLocationOn } from 'react-icons/md';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-forest text-brand-cream mt-auto border-t border-brand-dCream/40 relative" style={{ backgroundImage: 'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.3) 100%)', backgroundColor: 'var(--color-brand-forest)' }}>
      <div className="max-w-7xl mx-auto px-4 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-6">
          {/* Left Column */}
          <div className="text-center border-b md:border-b-0 md:border-r border-brand-dCream/30 pb-6 md:pb-0 md:pr-8 md:mb-0">
            <h3 className="flex flex-col items-center justify-center text-2xl font-semibold mb-3 tracking-widest text-brand-dCream">CHURCH OF THE<span>STARS</span></h3>
            <p className="text-center text-lg text-gray-300 leading-relaxed italic">
              A wellness and spiritual retreat experience in the heart of nature.
            </p>
          </div>

          {/* Middle Column */}
          <div className="text-center border-b md:border-b-0 md:border-r border-brand-dCream/30 pb-6 md:pb-0 md:pr-8 md:mb-0">
            <h4 className="text-2xl font-semibold mb-4 tracking-widest text-brand-dCream">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="#home" className="text-lg text-gray-300 hover:text-brand-dCream transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#about" className="text-lg text-gray-300 hover:text-brand-dCream transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="#contact" className="text-lg text-gray-300 hover:text-brand-dCream transition-colors">
                  Booking
                </a>
              </li>
              <li>
                <a href="#contact" className="text-lg text-gray-300 hover:text-brand-dCream transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Right Column */}
          <div className="text-center">
            <h4 className="text-2xl font-semibold mb-4 tracking-widest text-brand-dCream">Contact</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-center gap-3 pr-4">
                <MdOutlineMailOutline className="text-2xl text-brand-dCream flex-shrink-0" />
                <p className="text-lg text-gray-300">info.churchofthestars@gmail.com</p>
              </div>
              <div className="flex items-center justify-center gap-3 pr-4">
                <MdOutlinePhone className="text-2xl text-brand-dCream flex-shrink-0" />
                <p className="text-lg text-gray-300">(435) 592-2401</p>
              </div>
              <div className="flex items-center justify-center gap-3 pr-4">
                <MdOutlineLocationOn className="text-2xl text-brand-dCream flex-shrink-0" />
                <p className="text-lg text-gray-300">Retreat Center<br />Cedar City, Utah</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-brand-dCream/20 pt-6 text-center">
          <p className="text-lg text-gray-300">© {currentYear} Church of the Stars. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
