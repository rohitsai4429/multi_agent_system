import { useState } from 'react';
import { transactionApi } from '../services/api';

const TransactionForm = ({ onSubmit, loading }) => {
  const [formData, setFormData] = useState({
    user_id: 'USR-' + Math.random().toString(36).substr(2, 9).toUpperCase(),
    amount: '',
    merchant_id: '',
    transaction_type: 'purchase',
    location: 'New York, NY',
    device_id: 'DEVICE-' + Math.random().toString(36).substr(2, 9),
    currency: 'INR',
    card_last_4: '',
  });

  const transactionTypes = [
    { value: 'purchase', label: 'Purchase' },
    { value: 'payment', label: 'Payment' },
    { value: 'transfer', label: 'Transfer' },
    { value: 'withdrawal', label: 'Withdrawal' },
    { value: 'deposit', label: 'Deposit' },
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      alert('Please enter a valid amount');
      return;
    }

    await onSubmit({
      ...formData,
      amount: parseFloat(formData.amount),
    });
  };

  const generateRandom = () => {
    const amounts = [15.99, 45.50, 125.00, 500.00, 2500.00, 9999.99];
    const merchants = [
      'AMZN-001',
      'WALMART-042',
      'SHELL-GAS-123',
      'NETFLIX-456',
      'RESTAURANT-789',
      'BESTBUY-012',
    ];
    const txnTypes = ['purchase', 'payment', 'transfer', 'withdrawal', 'deposit'];

    setFormData((prev) => ({
      ...prev,
      user_id: 'USR-' + Math.random().toString(36).substr(2, 9).toUpperCase(),
      device_id: 'DEVICE-' + Math.random().toString(36).substr(2, 9),
      amount: amounts[Math.floor(Math.random() * amounts.length)],
      merchant_id: merchants[Math.floor(Math.random() * merchants.length)],
      transaction_type: txnTypes[Math.floor(Math.random() * txnTypes.length)],
      card_last_4: Math.floor(Math.random() * 10000).toString().padStart(4, '0'),
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Submit Transaction</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* User ID */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            User ID
          </label>
          <input
            type="text"
            name="user_id"
            value={formData.user_id}
            disabled
            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-600 cursor-not-allowed"
          />
        </div>

        {/* Device ID */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Device ID
          </label>
          <input
            type="text"
            name="device_id"
            value={formData.device_id}
            disabled
            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-600 cursor-not-allowed"
          />
        </div>

        {/* Amount */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Amount (₹) <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            name="amount"
            step="0.01"
            min="0"
            placeholder="0.00"
            value={formData.amount}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Currency */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Currency
          </label>
          <input
            type="text"
            name="currency"
            value={formData.currency}
            disabled
            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-600 cursor-not-allowed"
          />
        </div>

        {/* Transaction Type */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Transaction Type <span className="text-red-500">*</span>
          </label>
          <select
            name="transaction_type"
            value={formData.transaction_type}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {transactionTypes.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>

        {/* Merchant ID */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Merchant ID
          </label>
          <input
            type="text"
            name="merchant_id"
            placeholder="e.g., AMZN-001"
            value={formData.merchant_id}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Location <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="location"
            placeholder="e.g., New York, NY"
            value={formData.location}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Card Last 4 */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Card Last 4 Digits
          </label>
          <input
            type="text"
            name="card_last_4"
            maxLength="4"
            placeholder="e.g., 4242"
            value={formData.card_last_4}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-8 flex gap-4">
        <button
          type="submit"
          disabled={loading}
          className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-3 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
        >
          {loading ? '⏳ Analyzing...' : '🔍 Analyze Transaction'}
        </button>
        <button
          type="button"
          onClick={generateRandom}
          disabled={loading}
          className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          🎲 Random Transaction
        </button>
      </div>
    </form>
  );
};

export default TransactionForm;
