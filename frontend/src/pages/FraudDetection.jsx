import { useState, useEffect } from 'react';
import { financialApi } from '../services/api';

const FraudDetection = () => {
  const [transaction, setTransaction] = useState({
    user_id: 1,
    amount: '',
    currency: 'INR',
    location: '',
    device_id: '',
    transaction_type: 'PURCHASE',
    merchant_id: '',
    card_last_4: '',
    timestamp: new Date().toISOString()
  });
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTransaction(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResults(null);

    try {
      const response = await financialApi.processTransaction(transaction);
      setResults(response.data);
    } catch (error) {
      console.error('Error processing transaction:', error);
      setResults({ error: 'Unable to process transaction. Please try again.' });
    }

    setLoading(false);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Fraud Detection</h1>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Process Transaction for Fraud Detection</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                User ID
              </label>
              <input
                type="number"
                name="user_id"
                value={transaction.user_id}
                onChange={handleInputChange}
                className="w-full p-3 border rounded-lg"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Amount
              </label>
              <input
                type="number"
                step="0.01"
                name="amount"
                value={transaction.amount}
                onChange={handleInputChange}
                className="w-full p-3 border rounded-lg"
                placeholder="100.00"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Currency
              </label>
              <select
                name="currency"
                value={transaction.currency}
                onChange={handleInputChange}
                className="w-full p-3 border rounded-lg"
              >
                <option value="INR">INR</option>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="GBP">GBP</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Location
              </label>
              <input
                type="text"
                name="location"
                value={transaction.location}
                onChange={handleInputChange}
                className="w-full p-3 border rounded-lg"
                placeholder="New York, NY"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Device ID
              </label>
              <input
                type="text"
                name="device_id"
                value={transaction.device_id}
                onChange={handleInputChange}
                className="w-full p-3 border rounded-lg"
                placeholder="device123"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Transaction Type
              </label>
              <select
                name="transaction_type"
                value={transaction.transaction_type}
                onChange={handleInputChange}
                className="w-full p-3 border rounded-lg"
              >
                <option value="PURCHASE">Purchase</option>
                <option value="TRANSFER">Transfer</option>
                <option value="WITHDRAWAL">Withdrawal</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Merchant ID
              </label>
              <input
                type="text"
                name="merchant_id"
                value={transaction.merchant_id}
                onChange={handleInputChange}
                className="w-full p-3 border rounded-lg"
                placeholder="merchant123"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Card Last 4 Digits
              </label>
              <input
                type="text"
                name="card_last_4"
                value={transaction.card_last_4}
                onChange={handleInputChange}
                className="w-full p-3 border rounded-lg"
                placeholder="1234"
                maxLength="4"
                required
              />
            </div>
          </div>
          <button
            type="submit"
            className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700"
            disabled={loading}
          >
            {loading ? 'Processing...' : 'Process Transaction'}
          </button>
        </form>
      </div>

      {results && (
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Analysis Results</h3>
          {results.error ? (
            <p className="text-red-600 font-semibold">{results.error}</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Decision</p>
                <p className={`font-semibold ${results.decision === 'approve' ? 'text-green-600' : results.decision === 'review' ? 'text-yellow-600' : 'text-red-600'}`}>
                  {results.decision}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Risk Score</p>
                <p className="font-semibold">{results.risk_score}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Final Score</p>
                <p className="font-semibold">{results.final_score}</p>
              </div>
              <div className="md:col-span-2">
                <p className="text-sm text-gray-600">Explanation</p>
                <p className="font-semibold">{results.explanation}</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FraudDetection;
