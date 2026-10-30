import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { RETREAT_PRICE } from '../config/stripe';

export default function PaymentForm() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [bookingInfo, setBookingInfo] = useState(null);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedBooking = sessionStorage.getItem('bookingInfo');
    if (storedBooking) {
      setBookingInfo(JSON.parse(storedBooking));
    } else {
      setTimeout(() => navigate('/booking'), 2000);
    }
  }, [navigate]);

  const totalAmount = bookingInfo ? (RETREAT_PRICE * bookingInfo.participants) / 100 : 0;

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const paymentData = {
        name: `${data.firstName} ${data.lastName}`,
        email: data.email,
        bookingInfo,
      };

      // The server sets the price; the browser only sends booking details.
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(paymentData),
      });

      const result = await response.json().catch(() => ({}));
      if (!response.ok || !result.url) {
        throw new Error(result.error || 'Unable to start payment. Please try again.');
      }

      sessionStorage.setItem('confirmationData', JSON.stringify(paymentData));
      window.location.assign(result.url);
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: error.message || 'Payment failed. Please try again.',
      });
      setLoading(false);
    }
  };

  if (!bookingInfo) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-brand-pine mb-4">Loading booking information...</p>
          <div className="animate-spin text-4xl">⏳</div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
      <h2 className="section-title">Complete Payment</h2>

      {/* Order Summary */}
      <div className="bg-brand-cream/30 p-6 rounded-lg mb-8">
        <h3 className="text-xl font-bold text-brand-night mb-4">Order Summary</h3>
        <div className="space-y-2 mb-4">
          <div className="flex justify-between">
            <span className="text-brand-pine">Retreat:</span>
            <span className="font-semibold">{bookingInfo.retreat?.title}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-brand-pine">Participants:</span>
            <span className="font-semibold">{bookingInfo.participants}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-brand-pine">Price per person:</span>
            <span className="font-semibold">${(RETREAT_PRICE / 100).toFixed(2)}</span>
          </div>
          <div className="border-t-2 border-brand-cream pt-2 flex justify-between">
            <span className="text-lg font-bold text-brand-night">Total Amount:</span>
            <span className="text-lg font-bold text-brand-forest">${totalAmount.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Contact info; card details are entered on Stripe's secure page */}
        <div>
          <h4 className="text-lg font-semibold text-brand-night mb-4">Contact Information</h4>
          
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-brand-night font-semibold mb-2">First Name</label>
              <input
                {...register('firstName', { required: 'First name is required' })}
                type="text"
                className="input-field"
                defaultValue={bookingInfo?.firstName}
              />
              {errors.firstName && <p className="text-red-600 text-sm mt-1">{errors.firstName.message}</p>}
            </div>
            <div>
              <label className="block text-brand-night font-semibold mb-2">Last Name</label>
              <input
                {...register('lastName', { required: 'Last name is required' })}
                type="text"
                className="input-field"
                defaultValue={bookingInfo?.lastName}
              />
              {errors.lastName && <p className="text-red-600 text-sm mt-1">{errors.lastName.message}</p>}
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-brand-night font-semibold mb-2">Email</label>
            <input
              {...register('email', { required: 'Email is required', pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Invalid email' } })}
              type="email"
              className="input-field"
              defaultValue={bookingInfo?.email}
            />
            {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>}
          </div>
        </div>

        <div className="bg-brand-cream/30 p-6 rounded-lg">
          <h4 className="text-lg font-semibold text-brand-night mb-2">Payment Method</h4>
          <p className="text-brand-pine">
            You&apos;ll be taken to Stripe&apos;s secure checkout page to enter your card details.
          </p>
        </div>

        {/* Terms */}
        <div>
          <label className="flex items-center gap-2">
            <input
              {...register('agreeToTerms', { required: 'You must agree to the terms' })}
              type="checkbox"
              className="w-4 h-4"
            />
            <span className="text-brand-pine">I agree to the payment terms and cancellation policy</span>
          </label>
          {errors.agreeToTerms && <p className="text-red-600 text-sm mt-1">{errors.agreeToTerms.message}</p>}
        </div>

        {submitStatus && (
          <div className={`p-4 rounded-lg ${
            submitStatus.type === 'success'
              ? 'bg-green-100 text-green-800'
              : 'bg-red-100 text-red-800'
          }`}>
            {submitStatus.message}
          </div>
        )}

        <button 
          type="submit" 
          className="btn-primary w-full text-lg py-4 cursor-pointer"
          disabled={loading}
        >
          {loading ? 'Redirecting to Stripe...' : `Pay $${totalAmount.toFixed(2)}`}
        </button>

        <p className="text-xs text-brand-forest text-center">
          🔒 Your information is secure. Card data is encrypted and never stored on our servers.
        </p>
      </form>
    </div>
  );
}
