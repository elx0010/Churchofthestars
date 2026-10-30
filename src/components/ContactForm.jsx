import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { validateEmail, validatePhone } from '../lib/utils';

export default function ContactForm() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [submitStatus, setSubmitStatus] = useState(null);

  const onSubmit = async (data) => {
    try {
      // Validate email and phone
      if (!validateEmail(data.email)) {
        setSubmitStatus({ type: 'error', message: 'Invalid email address' });
        return;
      }

      if (!validatePhone(data.phone)) {
        setSubmitStatus({ type: 'error', message: 'Invalid phone number' });
        return;
      }

      // In production, this would send to your backend
      console.log('Contact form submitted:', data);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      setSubmitStatus({
        type: 'success',
        message: 'Thank you for contacting us! We will get back to you soon.',
      });
      reset();
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: 'Failed to submit form. Please try again.',
      });
    }
  };

  return (
    <div className="bg-brand-forest rounded-lg shadow-lg p-8 max-w-sm sm:max-w-xl mx-auto">
      <h3 className="text-brand-cream text-left mb-6 text-2xl font-semibold">Get In Touch</h3>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-brand-cream font-semibold mb-2">Name</label>
          <input
            {...register('name', { required: 'Name is required' })}
            type="text"
            className="input-field"
            placeholder="Your Name"
          />
          {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>}
        </div>

        <div>
          <label className="block text-brand-cream font-semibold mb-2">Email</label>
          <input
            {...register('email', { required: 'Email is required' })}
            type="email"
            className="input-field"
            placeholder="your@email.com"
          />
          {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>}
        </div>

        <div>
          <label className="block text-brand-cream font-semibold mb-2">Phone</label>
          <input
            {...register('phone', { required: 'Phone is required' })}
            type="tel"
            className="input-field"
            placeholder="(555) 123-4567"
          />
          {errors.phone && <p className="text-red-600 text-sm mt-1">{errors.phone.message}</p>}
        </div>

        <div>
          <label className="block text-brand-cream font-semibold mb-2">Message</label>
          <textarea
            {...register('message', { required: 'Message is required', minLength: { value: 10, message: 'Message must be at least 10 characters' } })}
            className="input-field resize-none"
            rows="4"
            placeholder="Your message..."
          ></textarea>
          {errors.message && <p className="text-red-600 text-sm mt-1">{errors.message.message}</p>}
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

        <button type="submit" className="btn-primary bg-brand-leaf w-full">
          Send Message
        </button>
      </form>
    </div>
  );
}
