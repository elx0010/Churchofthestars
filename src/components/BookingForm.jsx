import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockRetreats } from '../lib/utils';

export default function BookingForm({ onBookingSubmit }) {
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const [submitStatus, setSubmitStatus] = useState(null);
  const navigate = useNavigate();
  const selectedRetreatId = watch('retreatId');

  const selectedRetreat = selectedRetreatId 
    ? mockRetreats.find(r => r.id === parseInt(selectedRetreatId))
    : null;

  const onSubmit = async (data) => {
    try {
      const bookingData = {
        ...data,
        retreat: selectedRetreat,
        bookingDate: new Date().toISOString(),
      };

      // Store booking info for payment page
      sessionStorage.setItem('bookingInfo', JSON.stringify(bookingData));
      
      // Simulate API call to save booking
      await new Promise(resolve => setTimeout(resolve, 1000));

      setSubmitStatus({
        type: 'success',
        message: 'Booking confirmed! Proceeding to payment...',
      });

      setTimeout(() => {
        if (onBookingSubmit) onBookingSubmit(bookingData);
        navigate('/payment');
      }, 1500);
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: 'Failed to process booking. Please try again.',
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-brand-forest rounded-lg shadow-lg p-8 max-w-2xl mx-auto">
      <h2 className="section-title text-brand-cream">Complete Your Booking</h2>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-brand-cream font-semibold mb-2">First Name</label>
          <input
            {...register('firstName', { required: 'First name is required' })}
            type="text"
            className="input-field text-brand-cream"
            placeholder="John"
          />
          {errors.firstName && <p className="text-red-600 text-sm mt-1">{errors.firstName.message}</p>}
        </div>

        <div>
          <label className="block text-brand-cream font-semibold mb-2">Last Name</label>
          <input
            {...register('lastName', { required: 'Last name is required' })}
            type="text"
            className="input-field text-brand-cream"
            placeholder="Doe"
          />
          {errors.lastName && <p className="text-red-600 text-sm mt-1">{errors.lastName.message}</p>}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-brand-cream font-semibold mb-2">Email</label>
          <input
            {...register('email', { required: 'Email is required', pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Invalid email' } })}
            type="email"
            className="input-field text-brand-cream"
            placeholder="your@email.com"
          />
          {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>}
        </div>

        <div>
          <label className="block text-brand-cream font-semibold mb-2">Phone</label>
          <input
            {...register('phone', { required: 'Phone is required' })}
            type="tel"
            className="input-field text-brand-cream"
            placeholder="(555) 123-4567"
          />
          {errors.phone && <p className="text-red-600 text-sm mt-1">{errors.phone.message}</p>}
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-brand-cream font-semibold mb-2">Select Retreat</label>
        <select
          {...register('retreatId', { required: 'Please select a retreat' })}
          className="input-field text-brand-cream has-[option[value='']:checked]:text-brand-cream/50"
        >
          <option className="bg-brand-forest text-brand-cream" value="">-- Choose a retreat --</option>
          {mockRetreats.slice(0, 1).map(retreat => (
            <option key={retreat.id} value={retreat.id} className="bg-brand-forest text-brand-cream">
              {retreat.title} ({retreat.startDate.toLocaleDateString()})
            </option>
          ))}
        </select>
        {errors.retreatId && <p className="text-red-600 text-sm mt-1">{errors.retreatId.message}</p>}
      </div>

      {selectedRetreat && (
        <div className="bg-brand-cream/50 p-4 rounded-lg mb-6">
          <h4 className="font-semibold text-brand-night text-xl mb-2">{selectedRetreat.title}</h4>
          <p className="text-brand-night mb-2">{selectedRetreat.description}</p>
          <p className="text-brand-night text-lg font-semibold">Cost: $550.00 per person</p>
        </div>
      )}

      <div className="mb-6">
        <label className="block text-brand-cream font-semibold mb-2">Number of Participants</label>
        <input
          {...register('participants', { required: 'Number of participants is required', min: { value: 1, message: 'At least 1 participant required' } })}
          type="number"
          min="1"
          max="10"
          className="input-field text-brand-cream"
          placeholder="1"
        />
        {errors.participants && <p className="text-red-600 text-sm mt-1">{errors.participants.message}</p>}
      </div>

      <div className="mb-6">
        <label className="block text-brand-cream font-semibold mb-2">Special Requests</label>
        <textarea
          {...register('specialRequests')}
          className="input-field resize-none text-brand-cream"
          rows="3"
          placeholder="Any special dietary needs, accessibility requirements, etc."
        ></textarea>
      </div>

      <div className="hidden mb-6">
        <label className="flex items-center gap-2">
          <input
            {...register('agreeToTerms')}
            type="checkbox"
            className="w-4 h-4"
          />
          <span className="text-brand-cream">I agree to the booking terms and conditions</span>
        </label>
        {errors.agreeToTerms && <p className="text-red-600 text-sm mt-1">{errors.agreeToTerms.message}</p>}
      </div>

      {submitStatus && (
        <div className={`p-4 rounded-lg mb-6 ${
          submitStatus.type === 'success'
            ? 'bg-green-100 text-green-800'
            : 'bg-red-100 text-red-800'
        }`}>
          {submitStatus.message}
        </div>
      )}

      <button type="submit" className="btn-primary bg-brand-leaf w-full cursor-pointer">
        Proceed to Payment →
      </button>
    </form>
  );
}
