import { useState, useEffect } from 'react';
import { financialApi } from '../services/api';

const BudgetGenerator = ({ userData }) => {
  const [budget, setBudget] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadBudget();
  }, [userData]);

  const loadBudget = async () => {
    if (userData.income === 0) {
      alert('Please enter your monthly income first in the Dashboard');
      return;
    }
    
    setLoading(true);
    try {
      const response = await financialApi.generateBudget(userData);
      setBudget(response.data);
    } catch (error) {
      console.error('Error loading budget:', error);
      alert('Error generating budget. Please check your financial data.');
    }
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Smart Budget Generator</h1>
        <button
          onClick={loadBudget}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? 'Generating...' : 'Generate Budget'}
        </button>
      </div>

      {budget && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Budget Overview */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Budget Overview</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Total Income:</span>
                <span className="font-semibold text-green-600">₹{budget.total_income.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Total Expenses:</span>
                <span className="font-semibold text-red-600">₹{budget.total_expenses.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Available for Budget:</span>
                <span className="font-semibold text-blue-600">₹{(budget.total_income - budget.total_expenses).toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Budget Breakdown */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Recommended Budget Allocation</h3>
            <div className="space-y-4">
              {Object.entries(budget.budget_breakdown).map(([category, details]) => (
                <div key={category} className="border rounded-lg p-3">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium capitalize text-gray-700">{category}</span>
                    <span className="text-sm text-gray-500">
                      ₹{details.allocated.toLocaleString()} allocated
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Current: ₹{details.current.toLocaleString()}</span>
                    <span className={`font-semibold ${
                      details.current > details.allocated ? 'text-red-600' : 'text-green-600'
                    }`}>
                      {details.current > details.allocated ? 'Over Budget' : 'Within Budget'}
                    </span>
                  </div>
                  {details.categories && (
                    <div className="mt-2">
                      <span className="text-xs text-gray-500">Categories: </span>
                      <span className="text-xs text-gray-600">{details.categories.join(', ')}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Budget Recommendations */}
          <div className="bg-white rounded-lg shadow p-6 md:col-span-2">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Budget Recommendations</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-blue-800">50% Rule</h4>
                <p className="text-sm text-blue-600">Needs (essentials)</p>
                <p className="text-lg font-bold text-blue-800">₹{(budget.total_income * 0.5).toFixed(0)}</p>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <h4 className="font-semibold text-green-800">30% Rule</h4>
                <p className="text-sm text-green-600">Wants (discretionary)</p>
                <p className="text-lg font-bold text-green-800">₹{(budget.total_income * 0.3).toFixed(0)}</p>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <h4 className="font-semibold text-purple-800">20% Rule</h4>
                <p className="text-sm text-purple-600">Savings & Debt</p>
                <p className="text-lg font-bold text-purple-800">₹{(budget.total_income * 0.2).toFixed(0)}</p>
              </div>
            </div>

            {budget.recommendations && budget.recommendations.length > 0 && (
              <div className="space-y-3">
                <h4 className="font-semibold text-gray-700">Personalized Recommendations:</h4>
                {budget.recommendations.map((rec, index) => (
                  <div key={index} className="p-3 bg-yellow-50 rounded-lg border-l-4 border-yellow-400">
                    <p className="text-sm text-yellow-800">{rec}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default BudgetGenerator;