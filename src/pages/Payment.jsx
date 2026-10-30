import PaymentForm from '../components/PaymentForm';

export default function Payment() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-brand-cream/30 to-white py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-brand-night mb-4 text-center">
            Secure Payment
          </h1>
          <p className="text-center text-brand-pine text-lg">
            Complete your payment to finalize your retreat booking
          </p>
        </div>

        {/* Process Steps */}
        <div className="flex justify-between items-center mb-12 flex-wrap gap-4">
          <div className="flex items-center gap-3 flex-1 min-w-[150px]">
            <div className="w-10 h-10 bg-brand-forest text-white rounded-full flex items-center justify-center font-bold">
              ✓
            </div>
            <span className="font-semibold text-brand-night">Book</span>
          </div>
          <div className="w-12 h-1 bg-brand-forest hidden sm:block flex-1"></div>
          <div className="flex items-center gap-3 flex-1 min-w-[150px]">
            <div className="w-10 h-10 bg-brand-forest text-white rounded-full flex items-center justify-center font-bold">
              2
            </div>
            <span className="font-semibold text-brand-night">Pay</span>
          </div>
          <div className="w-12 h-1 bg-brand-cream hidden sm:block flex-1"></div>
          <div className="flex items-center gap-3 flex-1 min-w-[150px]">
            <div className="w-10 h-10 bg-brand-cream text-brand-night rounded-full flex items-center justify-center font-bold">
              3
            </div>
            <span className="font-semibold text-brand-forest">Confirm</span>
          </div>
        </div>

        {/* Payment Form */}
        <PaymentForm />

        {/* Payment Info */}
        <div className="mt-8 bg-white p-8 rounded-lg shadow-lg">
          <h3 className="text-xl font-bold text-brand-night mb-6">Payment Methods</h3>
          <p className="text-brand-pine mb-4">
            We accept all major credit and debit cards:
          </p>
          <div className="flex flex-wrap gap-6">
            <div className="text-2xl">Visa</div>
            <div className="text-2xl">Mastercard</div>
            <div className="text-2xl">American Express</div>
            <div className="text-2xl">Discover</div>
          </div>
        </div>

        {/* Important Notes */}
        <div className="mt-8 bg-blue-50 border-l-4 border-blue-500 p-6 rounded">
          <h4 className="font-semibold text-blue-900 mb-2">Important Notes</h4>
          <ul className="text-blue-800 space-y-2 text-sm">
            <li>✓ A confirmation email will be sent to your email address after payment</li>
            <li>✓ Please review all booking details before submitting payment</li>
            <li>✓ You'll receive detailed retreat information and a packing list after confirmation</li>
            <li>✓ For questions, contact us at gmail or (111) 123-4567</li>
          </ul>
        </div>
      </div>
    </main>
  );
}
