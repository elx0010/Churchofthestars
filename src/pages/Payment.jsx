import PaymentForm from '../components/PaymentForm';

export default function Payment() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-earth-50 to-white py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-earth-900 mb-4 text-center">
            Secure Payment
          </h1>
          <p className="text-center text-earth-700 text-lg">
            Complete your payment to finalize your retreat booking
          </p>
        </div>

        {/* Process Steps */}
        <div className="flex justify-between items-center mb-12 flex-wrap gap-4">
          <div className="flex items-center gap-3 flex-1 min-w-[150px]">
            <div className="w-10 h-10 bg-earth-600 text-white rounded-full flex items-center justify-center font-bold">
              ✓
            </div>
            <span className="font-semibold text-earth-900">Book</span>
          </div>
          <div className="w-12 h-1 bg-earth-600 hidden sm:block flex-1"></div>
          <div className="flex items-center gap-3 flex-1 min-w-[150px]">
            <div className="w-10 h-10 bg-earth-600 text-white rounded-full flex items-center justify-center font-bold">
              2
            </div>
            <span className="font-semibold text-earth-900">Pay</span>
          </div>
          <div className="w-12 h-1 bg-earth-300 hidden sm:block flex-1"></div>
          <div className="flex items-center gap-3 flex-1 min-w-[150px]">
            <div className="w-10 h-10 bg-earth-300 text-earth-900 rounded-full flex items-center justify-center font-bold">
              3
            </div>
            <span className="font-semibold text-earth-600">Confirm</span>
          </div>
        </div>

        {/* Payment Form */}
        <PaymentForm />

        {/* Security Info */}
        <div className="mt-12 bg-earth-50 p-8 rounded-lg shadow-lg">
          <h3 className="text-xl font-bold text-earth-900 mb-6">🔒 Payment Security</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <p className="text-2xl mb-2">🛡️</p>
              <h4 className="font-semibold text-earth-900 mb-2">Secure Encryption</h4>
              <p className="text-earth-700 text-sm">
                Your payment information is protected with industry-standard SSL encryption.
              </p>
            </div>
            <div>
              <p className="text-2xl mb-2">✓</p>
              <h4 className="font-semibold text-earth-900 mb-2">PCI Compliant</h4>
              <p className="text-earth-700 text-sm">
                We comply with all PCI DSS standards for secure payment processing.
              </p>
            </div>
            <div>
              <p className="text-2xl mb-2">🔐</p>
              <h4 className="font-semibold text-earth-900 mb-2">Safe & Secure</h4>
              <p className="text-earth-700 text-sm">
                Your data is never stored on our servers after transaction completion.
              </p>
            </div>
          </div>
        </div>

        {/* Payment Info */}
        <div className="mt-8 bg-white p-8 rounded-lg shadow-lg">
          <h3 className="text-xl font-bold text-earth-900 mb-6">💳 Payment Methods</h3>
          <p className="text-earth-700 mb-4">
            We accept all major credit and debit cards:
          </p>
          <div className="flex flex-wrap gap-6">
            <div className="text-2xl">💳 Visa</div>
            <div className="text-2xl">💳 Mastercard</div>
            <div className="text-2xl">💳 American Express</div>
            <div className="text-2xl">💳 Discover</div>
          </div>
        </div>

        {/* Important Notes */}
        <div className="mt-8 bg-blue-50 border-l-4 border-blue-500 p-6 rounded">
          <h4 className="font-semibold text-blue-900 mb-2">ℹ️ Important Notes</h4>
          <ul className="text-blue-800 space-y-2 text-sm">
            <li>✓ A confirmation email will be sent to your email address after payment</li>
            <li>✓ Please review all booking details before submitting payment</li>
            <li>✓ You'll receive detailed retreat information and a packing list after confirmation</li>
            <li>✓ For questions, contact us at info@churchofthestars.com or (555) 123-4567</li>
          </ul>
        </div>
      </div>
    </main>
  );
}
