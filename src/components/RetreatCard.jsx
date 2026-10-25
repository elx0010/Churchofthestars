import { formatDateRange } from '../lib/utils';

export default function RetreatCard({ retreat, onSelect }) {
  const spotsRemaining = retreat.availableSpots - retreat.bookedSpots;
  const isFull = spotsRemaining <= 0;

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow h-full flex flex-col">
      <div className="h-48 bg-gradient-to-b from-earth-400 to-earth-600 flex items-center justify-center">
        <span className="text-6xl">⛰️</span>
      </div>
      <div className="p-6 flex-1 flex flex-col">
        <h3 className="text-2xl font-bold text-earth-900 mb-2">{retreat.title}</h3>
        <p className="text-earth-600 mb-4 flex-1">{retreat.description}</p>
        
        <div className="bg-earth-50 p-4 rounded-lg mb-4">
          <p className="text-sm text-earth-700 mb-2">
            <strong>Dates:</strong> {formatDateRange(retreat.startDate, retreat.endDate)}
          </p>
          <p className="text-sm text-earth-700">
            <strong>Available Spots:</strong> {spotsRemaining}/{retreat.availableSpots}
          </p>
          {spotsRemaining < 5 && spotsRemaining > 0 && (
            <p className="text-sm text-orange-600 font-semibold mt-2">⚠️ Only {spotsRemaining} spots left!</p>
          )}
          {isFull && (
            <p className="text-sm text-red-600 font-semibold mt-2">🔴 This retreat is full</p>
          )}
        </div>

        <button
          onClick={() => onSelect(retreat)}
          disabled={isFull}
          className={`w-full py-3 rounded-lg font-semibold transition-colors ${
            isFull
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-earth-600 text-white hover:bg-earth-700'
          }`}
        >
          {isFull ? 'Retreat Full' : 'Select Retreat'}
        </button>
      </div>
    </div>
  );
}
