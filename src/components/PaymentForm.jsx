import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { RETREAT_PRICE } from '../config/stripe';

export default function PaymentForm() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [bookingInfo, setBookingInfo] = useState(null);
  const [submitStatus, setSubmitStatus] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedBooking = sessionStorage.getItem('bookingInfo');
    if (storedBooking) {
      setBookingInfo(JSON.parse(storedBooking));
    } else {
      // Redirect to booking if no booking info
      setTimeout(() => navigate('/booking'), 2000);
    }
  }, [navigate]);

  const totalAmount = bookingInfo ? (RETREAT_PRICE * bookingInfo.participants) / 100 : 0;

  const onSubmit = async (data) => {
    try {
      // In a real implementation, this would call a backend to create a Stripe charge
      // For now, this is just a placeholder form
      
      const paymentData = {
        ...data,
        bookingInfo,
        amount: totalAmount,
        timestamp: new Date().toISOString(),
      };

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Store confirmation data
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
        message: 'Payment failed. Please try again.',
      });
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
        {/* Cardholder Info */}
        <div>
          <h4 className="text-lg font-semibold text-earth-900 mb-4">Payment Information</h4>
          
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-earth-900 font-semibold mb-2">First Name</label>
              <input
                {...register('cardholderFirstName', { required: 'First name is required' })}
                type="text"
                className="input-field"
                defaultValue={bookingInfo.firstName}
              />
              {errors.cardholderFirstName && <p className="text-red-600 text-sm mt-1">{errors.cardholderFirstName.message}</p>}
            </div>
            <div>
              <label className="block text-earth-900 font-semibold mb-2">Last Name</label>
              <input
                {...register('cardholderLastName', { required: 'Last name is required' })}
                type="text"
                className="input-field"
                defaultValue={bookingInfo.lastName}
              />
              {errors.cardholderLastName && <p className="text-red-600 text-sm mt-1">{errors.cardholderLastName.message}</p>}
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-earth-900 font-semibold mb-2">Email</label>
            <input
              {...register('cardholderEmail', { required: 'Email is required' })}
              type="email"
              className="input-field"
              defaultValue={bookingInfo.email}
            />
            {errors.cardholderEmail && <p className="text-red-600 text-sm mt-1">{errors.cardholderEmail.message}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-earth-900 font-semibold mb-2">Card Number</label>
            <input
              {...register('cardNumber', { 
                required: 'Card number is required',
                pattern: { value: /^\d{13,19}$/, message: 'Invalid card number' }
              })}
              type="text"
              className="input-field"
              placeholder="1234 5678 9012 3456"
              maxLength="19"
            />
            {errors.cardNumber && <p className="text-red-600 text-sm mt-1">{errors.cardNumber.message}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-earth-900 font-semibold mb-2">Expiry Date</label>
              <input
                {...register('expiryDate', { 
                  required: 'Expiry date is required',
                  pattern: { value: /^\d{2}\/\d{2}$/, message: 'Format: MM/YY' }
                })}
                type="text"
                className="input-field"
                placeholder="MM/YY"
                maxLength="5"
              />
              {errors.expiryDate && <p className="text-red-600 text-sm mt-1">{errors.expiryDate.message}</p>}
            </div>
            <div>
              <label className="block text-earth-900 font-semibold mb-2">CVV</label>
              <input
                {...register('cvv', { 
                  required: 'CVV is required',
                  pattern: { value: /^\d{3,4}$/, message: 'Invalid CVV' }
                })}
                type="text"
                className="input-field"
                placeholder="123"
                maxLength="4"
              />
              {errors.cvv && <p className="text-red-600 text-sm mt-1">{errors.cvv.message}</p>}
            </div>
          </div>
        </div>

        {/* Billing Address */}
        <div>
          <h4 className="text-lg font-semibold text-earth-900 mb-4">Billing Address</h4>
          
          <div className="mb-4">
            <label className="block text-earth-900 font-semibold mb-2">Address</label>
            <input
              {...register('address', { required: 'Address is required' })}
              type="text"
              className="input-field"
              placeholder="123 Main St"
            />
            {errors.address && <p className="text-red-600 text-sm mt-1">{errors.address.message}</p>}
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-earth-900 font-semibold mb-2">City</label>
              <input
                {...register('city', { required: 'City is required' })}
                type="text"
                className="input-field"
                placeholder="City"
              />
              {errors.city && <p className="text-red-600 text-sm mt-1">{errors.city.message}</p>}
            </div>
            <div>
              <label className="block text-earth-900 font-semibold mb-2">State/Province</label>
              <input
                {...register('state', { required: 'State/Province is required' })}
                type="text"
                className="input-field"
                placeholder="CA"
              />
              {errors.state && <p className="text-red-600 text-sm mt-1">{errors.state.message}</p>}
            </div>
            <div>
              <label className="block text-earth-900 font-semibold mb-2">ZIP/Postal Code</label>
              <input
                {...register('zipCode', { required: 'ZIP code is required' })}
                type="text"
                className="input-field"
                placeholder="12345"
              />
              {errors.zipCode && <p className="text-red-600 text-sm mt-1">{errors.zipCode.message}</p>}
            </div>
          </div>
        </div>

        {/* Terms */}
        <div>
          <label className="flex items-center gap-2">
            <input
              {...register('agreeToPaymentTerms', { required: 'You must agree to payment terms' })}
              type="checkbox"
              className="w-4 h-4"
            />
            <span className="text-earth-700">I agree to the payment terms and cancellation policy</span>
          </label>
          {errors.agreeToPaymentTerms && <p className="text-red-600 text-sm mt-1">{errors.agreeToPaymentTerms.message}</p>}
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

        <button type="submit" className="btn-primary w-full text-lg py-4">
          Pay ${totalAmount.toFixed(2)}
        </button>

        <p className="text-xs text-earth-600 text-center">
          🔒 Your payment information is secure and encrypted.
        </p>
      </form>
    </div>
  );
}
