import ContactForm from '../components/ContactForm'
import EventbriteWidget from '../components/EventbriteWidget'
import { EVENTBRITE_ORGANIZER_URL } from '../config/eventbrite'
import landingBackground from '../assets/Landing.jpg'
import starryNight from '../assets/starryNight.jpg'
import Offerings from '../components/Offerings'
import FadeIn from '../components/FadeIn'
import VideoSection from '../components/VideoSection'
import aboutImage from '../assets/aboutImage.png'
import Nazzera from '../assets/Nazzera.jpg'

export default function Landing() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden -mt-28">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${landingBackground})`,
          }}
        ></div>
        {/* Fade overlay - fades from transparent at top to next section color at bottom */}
        <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.5) 25%, rgba(0,0,0,0.55) 35%, rgba(0,0,0,0.55) 55%, rgba(0,0,0,0.4) 65%, color-mix(in srgb, var(--color-brand-night) 10%, transparent) 70%, color-mix(in srgb, var(--color-brand-night) 90%, transparent) 95%, var(--color-brand-night) 100%)' }}></div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="hero-fade font-display text-6xl md:text-8xl font-bold text-brand-cream mb-6 [text-shadow:0_2px_12px_rgba(0,0,0,0.6)]" style={{ letterSpacing: '0.12em', '--hero-delay': '0.1s' }}>
            Church of the Stars
          </h1>
          <p className="hero-fade text-xl md:text-2xl text-brand-cream mb-8 font-medium [text-shadow:0_1px_8px_rgba(0,0,0,0.8)]" style={{ '--hero-delay': '0.6s' }}>
            Transform your spirit. Reconnect with nature. Find your purpose.
          </p>
          <div className="hero-fade" style={{ '--hero-delay': '1.1s' }}>
            <p className="text-lg md:text-xl text-brand-cream mb-12 max-w-2xl mx-auto font-medium [text-shadow:0_1px_8px_rgba(0,0,0,0.8)]">
              Experience a wellness and spiritual retreat in the breathtaking beauty of the mountains.
              A journey of self-discovery awaits.
            </p>
            <div className="flex justify-center">
              <a
                href="#calendar"
                className="btn-primary inline-block"
              >
                View Retreat Dates
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* About, Offerings and Video share one continuous gradient */}
      <div className="bg-gradient-to-b from-brand-night to-brand-forest">
      <section id="about" className="py-20 px-4">
        <FadeIn className="max-w-6xl mx-auto">
          <h2 className="section-title text-center mb-12 text-brand-cream">About Church of the Stars</h2>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="flex justify-center">
              <img
                src={aboutImage}
                alt="Mountain scenery"
                className="rounded-lg shadow-lg w-auto h-auto max-w-[80%] md:max-w-full max-h-140"
              />
            </div>
            <div>
              <p className="text-brand-cream mb-4 leading-relaxed">
                We believe that beneath every belief, name, and tradition, we share the same sky, 
                and at Church of the Stars, we gather to remember that we are all one.
              </p>
              <p className="text-brand-cream mb-4 leading-relaxed">
                We combine meditation, yoga, nature immersion, wellness, and spiritual practices to create
                a unique journey of self-discovery and connection.
              </p>
              <p className="text-brand-cream leading-relaxed">
                Whether you're seeking peace, clarity, community, or a renewed sense of purpose, our experienced
                facilitators are here to guide you through an unforgettable experience.
              </p>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* Our Offerings Section */}
      <Offerings />
      <VideoSection />
      </div>

      {/* Retreat Calendar Section */}
      <section id="calendar" className="py-20 px-4 bg-brand-leaf">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-center gap-4 mb-6" aria-hidden="true">
            <span className="h-px w-24 bg-brand-dCream/60"></span>
            <span className="text-2xl leading-none text-brand-dCream [text-shadow:0_0_12px_rgba(224,198,130,0.9)]">✦</span>
            <span className="h-px w-24 bg-brand-dCream/60"></span>
          </div>
          <h2 className="section-title text-center mb-12">Upcoming Events</h2>

          <EventbriteWidget />
        </div>
      </section>


      <section id="contact" className="py-20 px-4 bg-brand-night">
        <div className="max-w-4xl mx-auto">
          <h2 className="section-title text-center mb-12">Got any Questions?</h2>
          <div>
            <ContactForm />
          </div>
        </div>
      </section>
    </main>
  );
}
