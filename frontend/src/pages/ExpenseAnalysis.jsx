import { useState, useEffect } from 'react';
import { financialApi } from '../services/api';

const ExpenseAnalysis = ({ userData }) => {
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadAnalysis();
  }, [userData]);

  const loadAnalysis = async () => {
    setLoading(true);
    try {
      const response = await financialApi.analyzeExpenses(userData);
      setAnalysis(response.data.analysis);
    } catch (error) {
      console.error('Error loading expense analysis:', error);
    }
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Expense Analysis</h1>
        <button
          onClick={loadAnalysis}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? 'Analyzing...' : 'Refresh Analysis'}
        </button>
      </div>

      {analysis && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Financial Overview */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Financial Overview</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Monthly Income:</span>
                <span className="font-semibold text-green-600">₹{analysis.total_income?.toLocaleString() || '0'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Total Expenses:</span>
                <span className="font-semibold text-red-600">₹{analysis.total_expenses?.toLocaleString() || '0'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Net Savings:</span>
                <span className="font-semibold text-blue-600">₹{analysis.net_savings?.toLocaleString() || '0'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Expense-to-Income Ratio:</span>
                <span className="font-semibold">{analysis.spending_patterns?.expense_to_income_ratio?.toFixed(1) || '0'}%</span>
              </div>
            </div>
          </div>

          {/* Expense Breakdown */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Expense Breakdown</h3>
            <div className="space-y-3">
              {analysis.expense_breakdown && analysis.expense_breakdown.map((item, index) => {
                const percentage = item.percentage;
                return (
                  <div key={index} className="flex justify-between items-center">
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <span className="text-gray-600 capitalize">{item.category}</span>
                        <span className="font-semibold">₹{item.amount?.toLocaleString() || '0'}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                      <span className="text-xs text-gray-500">{percentage}% of total</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Spending Patterns */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Spending Patterns</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Essential Expenses:</span>
                <span className="font-semibold">₹{analysis.essential_expenses?.toLocaleString() || '0'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Non-Essential Expenses:</span>
                <span className="font-semibold">₹{analysis.non_essential_expenses?.toLocaleString() || '0'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Average Transaction:</span>
                <span className="font-semibold">₹{analysis.spending_patterns?.average_transaction?.toFixed(2) || '0'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Largest Category:</span>
                <span className="font-semibold capitalize">{analysis.spending_patterns?.largest_category || '-'}</span>
              </div>
            </div>
          </div>

          {/* Recommendations */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Saving Suggestions</h3>
            <div className="space-y-3">
              {(analysis.saving_suggestions || []).map((suggestion, index) => (
                <div key={index} className="p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-800">{suggestion}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExpenseAnalysis;