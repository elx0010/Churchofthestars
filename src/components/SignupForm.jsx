import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { validateEmail } from '../lib/utils';

export default function SignupForm() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [submitStatus, setSubmitStatus] = useState(null);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      if (!validateEmail(data.email)) {
        setSubmitStatus({ type: 'error', message: 'Invalid email address' });
        return;
      }

      // Store signup info for booking page
      sessionStorage.setItem('signupInfo', JSON.stringify(data));
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));

      setSubmitStatus({
        type: 'success',
        message: 'Great! Let\'s complete your booking.',
      });

      // Redirect to booking page after success
      setTimeout(() => navigate('/booking'), 1500);
      reset();
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: 'Failed to sign up. Please try again.',
      });
    }
  };

  return (
    <div className="bg-gradient-to-b from-brand-cream/30 to-white rounded-lg shadow-lg p-8 max-w-md mx-auto">
      <h3 className="text-2xl font-bold text-brand-night mb-2">Start Your Journey</h3>
      <p className="text-brand-forest mb-6">Join us for a transformative retreat experience</p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-brand-night font-semibold mb-2">First Name</label>
          <input
            {...register('firstName', { required: 'First name is required' })}
            type="text"
            className="input-field"
            placeholder="John"
          />
          {errors.firstName && <p className="text-red-600 text-sm mt-1">{errors.firstName.message}</p>}
        </div>

        <div>
          <label className="block text-brand-night font-semibold mb-2">Last Name</label>
          <input
            {...register('lastName', { required: 'Last name is required' })}
            type="text"
            className="input-field"
            placeholder="Doe"
          />
          {errors.lastName && <p className="text-red-600 text-sm mt-1">{errors.lastName.message}</p>}
        </div>

        <div>
          <label className="block text-brand-night font-semibold mb-2">Email</label>
          <input
            {...register('email', { required: 'Email is required' })}
            type="email"
            className="input-field"
            placeholder="your@email.com"
          />
          {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>}
        </div>

        {submitStatus && (
          <div className={`p-4 rounded-lg text-sm ${
            submitStatus.type === 'success'
              ? 'bg-green-100 text-green-800'
              : 'bg-red-100 text-red-800'
          }`}>
            {submitStatus.message}
          </div>
        )}

        <button type="submit" className="btn-primary w-full">
          Continue to Booking →
        </button>
      </form>

      <p className="text-xs text-brand-forest text-center mt-4">
        We respect your privacy. Your information is secure with us.
      </p>
    </div>
  );
}
