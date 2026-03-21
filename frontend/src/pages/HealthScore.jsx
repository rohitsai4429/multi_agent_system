import { useState, useEffect } from 'react';
import { financialApi } from '../services/api';

const HealthScore = ({ userData }) => {
  const [healthScore, setHealthScore] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadHealthScore();
  }, [userData]);

  const loadHealthScore = async () => {
    setLoading(true);
    try {
      const response = await financialApi.getHealthScore(userData);
      setHealthScore(response.data);
    } catch (error) {
      console.error('Error loading health score:', error);
    }
    setLoading(false);
  };

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Financial Health Score</h1>
        <button
          onClick={loadHealthScore}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? 'Calculating...' : 'Refresh Score'}
        </button>
      </div>

      {healthScore && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Overall Health Score</h3>
            <div className="text-center">
              <div className={`text-6xl font-bold mb-4 ${getScoreColor(healthScore.score)}`}>
                {healthScore.score}
              </div>
              <p className="text-gray-600 mb-4">{healthScore.explanation}</p>
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div
                  className={`h-4 rounded-full ${
                    healthScore.score >= 80 ? 'bg-green-600' :
                    healthScore.score >= 60 ? 'bg-yellow-600' : 'bg-red-600'
                  }`}
                  style={{ width: `${healthScore.score}%` }}
                ></div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Score Breakdown</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Savings Ratio:</span>
                <span className="font-semibold">{healthScore.details.savings_ratio.toFixed(1)}%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Debt-to-Income:</span>
                <span className="font-semibold">{healthScore.details.debt_to_income_ratio.toFixed(1)}%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Expense Ratio:</span>
                <span className="font-semibold">{healthScore.details.expense_ratio.toFixed(1)}%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Investment Ratio:</span>
                <span className="font-semibold">{healthScore.details.investment_ratio.toFixed(1)}%</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HealthScore;