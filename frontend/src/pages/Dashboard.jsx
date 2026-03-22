import { useState, useEffect } from 'react';
import { financialApi } from '../services/api';

const Dashboard = ({ userData, updateUserData, setCurrentPage }) => {
  const [analysis, setAnalysis] = useState(null);
  const [risk, setRisk] = useState(null);
  const [healthScore, setHealthScore] = useState(null);
  const [alerts, setAlerts] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [goals, setGoals] = useState(() => {
    try {
      const stored = localStorage.getItem('goals');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadDashboardData();
  }, [userData]);

  const loadDashboardData = async () => {
    setLoading(true);
    try {
      const [analysisRes, riskRes, healthRes, alertsRes, recRes] = await Promise.all([
        financialApi.analyzeExpenses(userData),
        financialApi.predictRisk(userData),
        financialApi.getHealthScore(userData),
        financialApi.generateAlerts(userData),
        financialApi.getRecommendations(userData)
      ]);

      setAnalysis(analysisRes.data);
      setRisk(riskRes.data);
      setHealthScore(healthRes.data);
      setAlerts(alertsRes.data.alerts);
      setRecommendations(recRes.data.recommendations);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    }
    setLoading(false);
  };

  const getHealthScoreColor = (score) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getRiskColor = (riskLevel) => {
    const level = (riskLevel || '').toLowerCase();
    if (level === 'low') return 'text-green-600';
    if (level === 'medium') return 'text-yellow-600';
    if (level === 'high') return 'text-red-600';
    return 'text-gray-600';
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Financial Dashboard</h1>
        <button
          onClick={loadDashboardData}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Refresh Data'}
        </button>
      </div>

      {/* User Input Fields */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Enter Your Financial Data</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Monthly Income (₹)</label>
            <input 
              type="number" 
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" 
              value={userData.income} 
              onChange={(e) => updateUserData({income: parseFloat(e.target.value) || 0})} 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Total Expenses (₹)</label>
            <input 
              type="number" 
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" 
              value={Object.values(userData.expenses).reduce((a, b) => a + b, 0)} 
              onChange={(e) => {
                const total = parseFloat(e.target.value) || 0;
                const currentTotal = Object.values(userData.expenses).reduce((a, b) => a + b, 0);
                if (currentTotal > 0) {
                  const ratio = total / currentTotal;
                  const newExpenses = {};
                  for (const [cat, amt] of Object.entries(userData.expenses)) {
                    newExpenses[cat] = amt * ratio;
                  }
                  updateUserData({expenses: newExpenses});
                } else {
                  updateUserData({expenses: {'misc': total}});
                }
              }} 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Net Savings (₹)</label>
            <input 
              type="number" 
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" 
              value={userData.savings} 
              onChange={(e) => updateUserData({savings: parseFloat(e.target.value) || 0})} 
            />
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Monthly Income</h3>
          <p className="text-2xl font-bold text-green-600">₹{userData.income.toLocaleString()}</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Total Expenses</h3>
          <p className="text-2xl font-bold text-red-600">
            ₹{Object.values(userData.expenses).reduce((a, b) => a + b, 0).toLocaleString()}
          </p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Net Savings</h3>
          <p className="text-2xl font-bold text-blue-600">
            ₹{(userData.income - Object.values(userData.expenses).reduce((a, b) => a + b, 0)).toLocaleString()}
          </p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Financial Health</h3>
          <p className={`text-2xl font-bold ${healthScore ? getHealthScoreColor(healthScore.score) : 'text-gray-600'}`}>
            {healthScore ? `${healthScore.score}/100` : 'Loading...'}
          </p>
          <p className="text-sm text-gray-600 mt-2">Financial health score measures your overall financial well-being based on savings ratio, debt levels, expense management, and investment habits. A higher score indicates better financial health.</p>
        </div>
      </div>

      {/* Financial Goals */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Financial Goals</h3>
        {goals.length > 0 ? (
          <div className="space-y-3">
            {goals.slice(0, 2).map((goal, index) => (
              <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-semibold text-gray-800">{goal.goal_name}</p>
                  <p className="text-sm text-gray-600">Target: ₹{goal.target_amount?.toLocaleString()}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">Monthly: ₹{goal.monthly_savings_required?.toFixed(0)}</p>
                  <div className="w-20 bg-gray-200 rounded-full h-2 mt-1">
                    <div
                      className="bg-green-600 h-2 rounded-full"
                      style={{ width: `${Math.min(goal.progress_percentage || 0, 100)}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No goals set yet. Set your first financial goal!</p>
        )}
        <div className="mt-4 flex gap-4">
          <button
            onClick={() => setCurrentPage('goal-planning')}
            className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
          >
            Manage Goals
          </button>
          <button
            onClick={() => setCurrentPage('budget-generator')}
            className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            View Budget
          </button>
        </div>
      </div>

      {/* Risk and Analysis */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Risk Assessment</h3>
          {risk ? (
            <div>
              <p className={`text-xl font-bold ${getRiskColor(risk.risk_level)}`}>
                {risk.risk_level} Risk
              </p>
              <p className="text-sm text-gray-600 mt-2">
                Based on your financial data and spending patterns
              </p>
            </div>
          ) : (
            <p className="text-gray-500">Loading risk assessment...</p>
          )}
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Top Expense Categories</h3>
          {analysis && analysis.expense_breakdown && analysis.expense_breakdown.length > 0 ? (
            <div className="space-y-2">
              {analysis.expense_breakdown.slice(0, 3).map((item, index) => (
                <div key={index} className="flex justify-between">
                  <span className="text-gray-600 capitalize">{item.category}</span>
                  <span className="font-semibold">₹{item.amount}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">Loading expense analysis...</p>
          )}
        </div>
      </div>

      {/* Financial Alerts */}
      {alerts.length > 0 && (
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Financial Alerts</h3>
          <div className="space-y-3">
            {alerts.map((alert, index) => (
              <div key={index} className={`p-3 rounded-lg border-l-4 ${
                alert.severity === 'high' ? 'border-red-500 bg-red-50' :
                alert.severity === 'medium' ? 'border-yellow-500 bg-yellow-50' :
                'border-blue-500 bg-blue-50'
              }`}>
                <p className="font-medium">{alert.message}</p>
                <p className="text-sm text-gray-600 capitalize">{alert.category} • {alert.type}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Financial Recommendations */}
      {recommendations.length > 0 && (
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Personalized Recommendations</h3>
          <div className="space-y-3">
            {recommendations.map((rec, index) => (
              <div key={index} className="p-3 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                <p className="text-blue-800">{rec}</p>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};

export default Dashboard;
