import { useState } from 'react';
import RetreatCard from '../components/RetreatCard';
import ContactForm from '../components/ContactForm';
import SignupForm from '../components/SignupForm';
import { mockRetreats, formatDateRange } from '../lib/utils';
import cedarMountain from '../assets/CedarMountainFallColors.webp'
import starryNight from '../assets/starryNight.jpg'

export default function Landing() {
  const [selectedRetreat, setSelectedRetreat] = useState(null);

  return (
    <main className="min-h-screen bg-gradient-to-b from-earth-50 to-white">
      {/* Hero Section */}
      <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${cedarMountain})`,
          }}
        ></div>
        {/* Fade overlay - fades from transparent at top to next section color at bottom */}
        <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.5) 25%, rgba(0,0,0,0.4) 35%, rgba(0,0,0,0.3) 45%, rgba(0,0,0,0.2) 55%, rgba(255,255,255,0.1) 70%, rgba(255,255,255,0.9) 95%, rgba(255,255,255,1) 100%)' }}></div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-6xl md:text-8xl font-serif font-bold text-white mb-6" style={{ fontFamily: 'Georgia, serif', letterSpacing: '0.05em' }}>
            Church of the Stars
          </h1>
          <p className="text-xl md:text-2xl text-white mb-8 font-light" style={{ fontFamily: 'Georgia, serif' }}>
            Transform your spirit. Reconnect with nature. Find your purpose.
          </p>
          <p className="text-lg text-white mb-12 max-w-2xl mx-auto font-light">
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
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="section-title text-center mb-12">About Church of the Stars</h2>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop"
                alt="Mountain scenery"
                className="rounded-lg shadow-lg"
              />
            </div>
            <div>
              <p className="text-earth-700 mb-4 leading-relaxed">
                Church of the Stars is a sanctuary dedicated to holistic wellness and spiritual growth.
                Nestled in the heart of majestic mountains, our retreat center offers a transformative
                experience designed to reconnect you with yourself and nature.
              </p>
              <p className="text-earth-700 mb-4 leading-relaxed">
                Our programs combine meditation, yoga, nature immersion, and wellness practices to create
                a unique journey of self-discovery. Each retreat is carefully designed to provide deep
                relaxation, personal growth, and lasting transformation.
              </p>
              <p className="text-earth-700 leading-relaxed">
                Whether you're seeking peace, clarity, or a renewed sense of purpose, our experienced
                facilitators are here to guide you through an unforgettable experience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Offerings Section */}
      <section className="py-20 px-4 bg-earth-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="section-title text-center mb-16">Our Offerings</h2>

          <div className="space-y-16">
            {/* Meditation Gong Sessions - Image Right */}
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-3xl font-bold text-earth-900 mb-4">Meditation Gong Sessions</h3>
                <p className="text-earth-700 mb-6 leading-relaxed">
                  Immersive gong bath meditations for deep healing and vibrational wellness. Experience the transformative power of sound as ancient gongs resonate through your being, promoting relaxation and spiritual awakening.
                </p>
              </div>
              <div className="h-64 bg-gradient-to-br from-purple-400 to-purple-600 rounded-lg overflow-hidden shadow-lg flex items-center justify-center">
                <span className="text-8xl">🔔</span>
              </div>
            </div>

            {/* Drums and Music - Image Left */}
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="h-64 bg-gradient-to-br from-orange-400 to-red-600 rounded-lg overflow-hidden shadow-lg flex items-center justify-center order-2 md:order-1">
                <span className="text-8xl">🥁</span>
              </div>
              <div className="order-1 md:order-2">
                <h3 className="text-3xl font-bold text-earth-900 mb-4">Drums and Music</h3>
                <p className="text-earth-700 mb-6 leading-relaxed">
                  Rhythmic drumming circles and live music to awaken your spirit. Join our facilitators in sacred musical journeys that connect you to ancient rhythms and the heartbeat of nature itself.
                </p>
              </div>
            </div>

            {/* Spiritual Wellness - Image Right */}
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-3xl font-bold text-earth-900 mb-4">Spiritual Wellness</h3>
                <p className="text-earth-700 mb-6 leading-relaxed">
                  Holistic practices for mental clarity, emotional balance, and spiritual growth. Discover deep insights through teachings rooted in ancient wisdom and modern mindfulness practices.
                </p>
              </div>
              <div className="h-64 bg-gradient-to-br from-green-400 to-emerald-600 rounded-lg overflow-hidden shadow-lg flex items-center justify-center">
                <span className="text-8xl">✨</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Retreat Calendar Section */}
      <section id="calendar" className="py-20 px-4 bg-earth-100">
        <div className="max-w-6xl mx-auto">
          <h2 className="section-title text-center mb-12">Upcoming Retreats</h2>
          
          {mockRetreats.slice(0, 1).map(retreat => (
            <div key={retreat.id} className="grid md:grid-cols-2 gap-12 items-center">
              {/* Left Column - Info */}
              <div className="order-2 md:order-1">
                <h3 className="text-3xl font-bold text-earth-900 mb-6">What is {retreat.title}?</h3>
                <p className="text-earth-700 mb-6 text-lg leading-relaxed">{retreat.description}</p>
                
                <div className="bg-earth-50 p-6 rounded-lg mb-8">
                  <p className="text-earth-700 mb-3">
                    <strong>📅 Dates:</strong> {formatDateRange(retreat.startDate, retreat.endDate)}
                  </p>
                  <p className="text-earth-700">
                    <strong>💺 Available Spots:</strong> {retreat.availableSpots - retreat.bookedSpots}/{retreat.availableSpots}
                  </p>
                </div>
                
                <button
                  onClick={() => setSelectedRetreat(retreat)}
                  className="bg-black text-white font-bold py-3 px-8 hover:bg-earth-900 transition-colors"
                >
                  EXPLORE OUR RETREATS
                </button>
              </div>
              
              {/* Right Column - Image */}
              <div className="order-1 md:order-2">
                <div className="h-71 rounded-lg overflow-hidden shadow-lg flex items-center justify-center">
                  <img src={starryNight} className="rounded-lg"/>
                </div>
              </div>
            </div>
          ))}

          {selectedRetreat && (
            <div className="mt-12 bg-white p-8 rounded-lg shadow-lg">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-bold text-earth-900 mb-4">{selectedRetreat.title}</h3>
                  <p className="text-earth-700 mb-4">{selectedRetreat.description}</p>
                  <div className="space-y-2">
                    <p className="text-earth-700">
                      <strong>Dates:</strong> {selectedRetreat.startDate.toLocaleDateString()} - {selectedRetreat.endDate.toLocaleDateString()}
                    </p>
                    <p className="text-earth-700">
                      <strong>Available Spots:</strong> {selectedRetreat.availableSpots - selectedRetreat.bookedSpots}/{selectedRetreat.availableSpots}
                    </p>
                    <p className="text-earth-700">
                      <strong>Price:</strong> $550 per person
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-center">
                  <a href="/booking" className="btn-primary inline-block">
                    Book This Retreat →
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Signup Section - TODO: Add content later */}

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 bg-white">
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
