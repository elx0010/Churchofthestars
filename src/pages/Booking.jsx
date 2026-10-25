import { useState } from 'react';
import BookingForm from '../components/BookingForm';

export default function Booking() {
  const [bookingData, setBookingData] = useState(null);

  const handleBookingSubmit = (data) => {
    setBookingData(data);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-earth-50 to-white py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-earth-900 mb-4 text-center">
            Reserve Your Retreat
          </h1>
          <p className="text-center text-earth-700 text-lg">
            Take the next step on your wellness journey. Fill out the form below to secure your spot.
          </p>
        </div>

        {/* Process Steps */}
        <div className="flex justify-between items-center mb-12 flex-wrap gap-4">
          <div className="flex items-center gap-3 flex-1 min-w-[150px]">
            <div className="w-10 h-10 bg-earth-600 text-white rounded-full flex items-center justify-center font-bold">
              1
            </div>
            <span className="font-semibold text-earth-900">Book</span>
          </div>
          <div className="w-12 h-1 bg-earth-300 hidden sm:block flex-1"></div>
          <div className="flex items-center gap-3 flex-1 min-w-[150px]">
            <div className="w-10 h-10 bg-earth-300 text-earth-900 rounded-full flex items-center justify-center font-bold">
              2
            </div>
            <span className="font-semibold text-earth-600">Pay</span>
          </div>
          <div className="w-12 h-1 bg-earth-300 hidden sm:block flex-1"></div>
          <div className="flex items-center gap-3 flex-1 min-w-[150px]">
            <div className="w-10 h-10 bg-earth-300 text-earth-900 rounded-full flex items-center justify-center font-bold">
              3
            </div>
            <span className="font-semibold text-earth-600">Confirm</span>
          </div>
        </div>

        {/* Booking Form */}
        <BookingForm onBookingSubmit={handleBookingSubmit} />

        {/* FAQ Section */}
        <div className="mt-16 bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-earth-900 mb-8">Frequently Asked Questions</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-earth-900 mb-2">❓ Can I bring a guest?</h3>
              <p className="text-earth-700">
                Yes! Simply select the number of participants in the booking form. Each person must register separately for a full retreat experience.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-earth-900 mb-2">❓ What if I need to cancel?</h3>
              <p className="text-earth-700">
                We offer full refunds if you cancel at least 30 days before your retreat. For cancellations within 30 days, you'll receive a 50% refund.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-earth-900 mb-2">❓ Is accommodation included?</h3>
              <p className="text-earth-700">
                The retreat cost includes accommodation, all meals, and scheduled activities. Detailed information will be sent upon confirmation.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-earth-900 mb-2">❓ What should I bring?</h3>
              <p className="text-earth-700">
                Please bring comfortable clothing, hiking shoes, a water bottle, and any personal medications. A complete packing list will be provided after booking.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-earth-900 mb-2">❓ What about dietary restrictions?</h3>
              <p className="text-earth-700">
                We're happy to accommodate dietary restrictions. Please note any special dietary needs in the "Special Requests" field during booking.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-earth-900 mb-2">❓ Are there age restrictions?</h3>
              <p className="text-earth-700">
                Our retreats welcome adults ages 18 and up. We offer family-friendly retreats in summer. Contact us for more information about family programs.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
