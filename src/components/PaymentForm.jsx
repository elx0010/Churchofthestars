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
      // IMPORTANT: In production, this must be handled by a backend
      // Never send raw card data through your frontend
      // Use Stripe Elements on the frontend and handle token creation on backend
      
      const paymentData = {
        name: `${data.firstName} ${data.lastName}`,
        email: data.email,
        bookingInfo,
        amount: totalAmount,
        timestamp: new Date().toISOString(),
      };

      // This should call your backend API which creates a Stripe payment intent
      // and handles card tokenization securely
      const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(paymentData),
      });

      if (!response.ok) throw new Error('Payment failed');

      sessionStorage.setItem('confirmationData', JSON.stringify(paymentData));

      setSubmitStatus({
        type: 'success',
        message: 'Payment processed successfully! Confirmation email sent.',
      });

      setTimeout(() => {
        navigate('/confirmation');
      }, 2000);
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: error.message || 'Payment failed. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  if (!bookingInfo) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-earth-700 mb-4">Loading booking information...</p>
          <div className="animate-spin text-4xl">⏳</div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
      <h2 className="section-title">Complete Payment</h2>

      {/* Order Summary */}
      <div className="bg-earth-50 p-6 rounded-lg mb-8">
        <h3 className="text-xl font-bold text-earth-900 mb-4">Order Summary</h3>
        <div className="space-y-2 mb-4">
          <div className="flex justify-between">
            <span className="text-earth-700">Retreat:</span>
            <span className="font-semibold">{bookingInfo.retreat?.title}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-earth-700">Participants:</span>
            <span className="font-semibold">{bookingInfo.participants}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-earth-700">Price per person:</span>
            <span className="font-semibold">${(RETREAT_PRICE / 100).toFixed(2)}</span>
          </div>
          <div className="border-t-2 border-earth-200 pt-2 flex justify-between">
            <span className="text-lg font-bold text-earth-900">Total Amount:</span>
            <span className="text-lg font-bold text-earth-600">${totalAmount.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded mb-6">
          <h4 className="font-semibold text-blue-900 mb-2">⚠️ Development Mode</h4>
          <p className="text-blue-800 text-sm mb-3">
            This payment form is currently in development mode. In production, you must integrate Stripe Elements 
            to securely handle card payments without exposing sensitive data to your frontend.
          </p>
          <p className="text-blue-800 text-sm font-semibold">
            ✓ Use Stripe Elements or Payment Element for card input<br/>
            ✓ Create payment intents on your backend<br/>
            ✓ Never transmit raw card data through your app
          </p>
        </div>

        {/* Cardholder Info - Only Name & Email */}
        <div>
          <h4 className="text-lg font-semibold text-earth-900 mb-4">Contact Information</h4>
          
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-earth-900 font-semibold mb-2">First Name</label>
              <input
                {...register('firstName', { required: 'First name is required' })}
                type="text"
                className="input-field"
                defaultValue={bookingInfo?.firstName}
              />
              {errors.firstName && <p className="text-red-600 text-sm mt-1">{errors.firstName.message}</p>}
            </div>
            <div>
              <label className="block text-earth-900 font-semibold mb-2">Last Name</label>
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
            <label className="block text-earth-900 font-semibold mb-2">Email</label>
            <input
              {...register('email', { required: 'Email is required', pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Invalid email' } })}
              type="email"
              className="input-field"
              defaultValue={bookingInfo?.email}
            />
            {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>}
          </div>
        </div>

        {/* TODO: Replace with Stripe Elements */}
        <div className="bg-amber-50 border border-amber-200 p-6 rounded-lg">
          <h4 className="text-lg font-semibold text-amber-900 mb-4">Payment Method (Stripe Integration Needed)</h4>
          <p className="text-amber-800 mb-4">
            TODO: Integrate Stripe Elements here. Replace with CardElement or PaymentElement component.
          </p>
          <div className="p-4 bg-white border-2 border-dashed border-amber-300 rounded text-center text-amber-700">
            [Stripe CardElement will be rendered here]
          </div>
        </div>

        {/* Terms */}
        <div>
          <label className="flex items-center gap-2">
            <input
              {...register('agreeToTerms', { required: 'You must agree to the terms' })}
              type="checkbox"
              className="w-4 h-4"
            />
            <span className="text-earth-700">I agree to the payment terms and cancellation policy</span>
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
          className="btn-primary w-full text-lg py-4"
          disabled={loading}
        >
          {loading ? 'Processing...' : `Pay $${totalAmount.toFixed(2)}`}
        </button>

        <p className="text-xs text-earth-600 text-center">
          🔒 Your information is secure. Card data is encrypted and never stored on our servers.
        </p>
      </form>
    </div>
  );
}
