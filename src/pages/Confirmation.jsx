import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Confirmation() {
  const [confirmationData, setConfirmationData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedData = sessionStorage.getItem('confirmationData');
    if (storedData) {
      setConfirmationData(JSON.parse(storedData));
    }
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin text-6xl mb-4">⏳</div>
          <p className="text-brand-pine">Loading confirmation...</p>
        </div>
      </div>
    );
  }

  if (!confirmationData) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-brand-cream/30 to-white flex items-center justify-center px-4">
        <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md">
          <p className="text-xl text-brand-pine mb-6">No booking information found</p>
          <Link to="/" className="btn-primary inline-block">
            Return to Home
          </Link>
        </div>
      </main>
    );
  }

  const bookingInfo = confirmationData.bookingInfo;

  return (
    <main className="min-h-screen bg-gradient-to-b from-brand-cream/30 to-white py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Success Message */}
        <div className="bg-green-50 border-l-4 border-green-500 p-8 rounded-lg mb-8 text-center">
          <div className="text-6xl mb-4">🎉</div>
          <h1 className="text-4xl font-bold text-green-900 mb-4">
            Booking Confirmed!
          </h1>
          <p className="text-green-800 text-lg mb-4">
            Your retreat is booked! A confirmation email has been sent to your inbox.
          </p>
          <p className="text-green-700 text-sm">
            Thank you for choosing Church of the Stars. We look forward to your transformation.
          </p>
        </div>

        {/* Booking Details */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-brand-night mb-6">Booking Details</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-brand-night mb-4">Participant Information</h3>
              <div className="space-y-3 text-brand-pine">
                <div>
                  <p className="text-sm text-brand-forest">Name</p>
                  <p className="font-semibold">{bookingInfo.firstName} {bookingInfo.lastName}</p>
                </div>
                <div>
                  <p className="text-sm text-brand-forest">Email</p>
                  <p className="font-semibold">{bookingInfo.email}</p>
                </div>
                <div>
                  <p className="text-sm text-brand-forest">Phone</p>
                  <p className="font-semibold">{bookingInfo.phone}</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-brand-night mb-4">Retreat Information</h3>
              <div className="space-y-3 text-brand-pine">
                <div>
                  <p className="text-sm text-brand-forest">Retreat</p>
                  <p className="font-semibold">{bookingInfo.retreat.title}</p>
                </div>
                <div>
                  <p className="text-sm text-brand-forest">Dates</p>
                  <p className="font-semibold">
                    {new Date(bookingInfo.retreat.startDate).toLocaleDateString()} - {new Date(bookingInfo.retreat.endDate).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-brand-forest">Participants</p>
                  <p className="font-semibold">{bookingInfo.participants} person(s)</p>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t-2 border-brand-cream mt-6 pt-6">
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold text-brand-night">Total Paid:</span>
              <span className="text-2xl font-bold text-brand-forest">
                ${(550 * bookingInfo.participants).toFixed(2)}
              </span>
            </div>
          </div>

          {bookingInfo.specialRequests && (
            <div className="mt-6 pt-6 border-t-2 border-brand-cream">
              <p className="text-sm text-brand-forest mb-2">Special Requests</p>
              <p className="text-brand-pine">{bookingInfo.specialRequests}</p>
            </div>
          )}
        </div>

        {/* What's Next */}
        <div className="bg-brand-cream/30 rounded-lg shadow-lg p-8 mb-8">
          <h3 className="text-2xl font-bold text-brand-night mb-6">What's Next?</h3>
          
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="w-8 h-8 bg-brand-forest text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                1
              </div>
              <div>
                <h4 className="font-semibold text-brand-night mb-1">Confirmation Email</h4>
                <p className="text-brand-pine">
                  Check your email ({bookingInfo.email}) for a confirmation with your booking reference and retreat details.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-8 h-8 bg-brand-forest text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                2
              </div>
              <div>
                <h4 className="font-semibold text-brand-night mb-1">Packing List</h4>
                <p className="text-brand-pine">
                  You'll receive a detailed packing list and retreat itinerary 2 weeks before your start date.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-8 h-8 bg-brand-forest text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                3
              </div>
              <div>
                <h4 className="font-semibold text-brand-night mb-1">Pre-Retreat Call</h4>
                <p className="text-brand-pine">
                  Our team will reach out 1 week before to answer any questions and prepare you for the experience.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-8 h-8 bg-brand-forest text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                4
              </div>
              <div>
                <h4 className="font-semibold text-brand-night mb-1">Arrival Instructions</h4>
                <p className="text-brand-pine">
                  Detailed arrival information and transportation options will be sent in your confirmation package.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact & FAQ */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h3 className="text-2xl font-bold text-brand-night mb-6">Questions?</h3>
          
          <div className="space-y-4 text-brand-pine">
            <p>
              If you have any questions about your retreat or need to make changes to your booking, please don't hesitate to contact us.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <p className="font-semibold text-brand-night mb-2">📧 Email</p>
                <p><a href="mailto:info@churchofthestars.com" className="text-brand-forest hover:text-brand-pine">info@churchofthestars.com</a></p>
              </div>
              <div>
                <p className="font-semibold text-brand-night mb-2">📞 Phone</p>
                <p><a href="tel:+15551234567" className="text-brand-forest hover:text-brand-pine">(555) 123-4567</a></p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link to="/" className="btn-primary inline-block">
            Return to Home
          </Link>
        </div>
      </div>
    </main>
  );
}
