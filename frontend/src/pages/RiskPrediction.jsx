import { useState, useEffect } from 'react';
import { financialApi } from '../services/api';

const RiskPrediction = ({ userData }) => {
  const [risk, setRisk] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadRiskPrediction();
  }, [userData]);

  const loadRiskPrediction = async () => {
    setLoading(true);
    try {
      const response = await financialApi.predictRisk(userData);
      setRisk(response.data);
    } catch (error) {
      console.error('Error loading risk prediction:', error);
    }
    setLoading(false);
  };

  const getRiskColor = (riskLevel) => {
    const level = (riskLevel || '').toLowerCase();
    switch (level) {
      case 'low': return 'text-green-600 bg-green-50 border-green-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'high': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getRiskIcon = (riskLevel) => {
    const level = (riskLevel || '').toLowerCase();
    switch (level) {
      case 'low': return '🟢';
      case 'medium': return '🟡';
      case 'high': return '🔴';
      default: return '⚪';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Risk Prediction</h1>
        <button
          onClick={loadRiskPrediction}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? 'Analyzing...' : 'Refresh Prediction'}
        </button>
      </div>
      <p className="text-gray-600">AI-powered risk prediction analyzes your financial data to assess the likelihood of financial difficulties. It uses advanced AI models to classify risk as Low, Medium, or High based on your complete financial profile.</p>

      {risk && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Risk Assessment */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">AI Risk Assessment</h3>
            <div className={`p-6 rounded-lg border-2 ${getRiskColor(risk.risk_level)}`}>
              <div className="text-center">
                <div className="text-6xl mb-4">{getRiskIcon(risk.risk_level)}</div>
                <h4 className="text-2xl font-bold mb-2">{risk.risk_level} Risk</h4>
                <p className="text-gray-600 mb-4">
                  {risk.explanation}
                </p>
                <div className="flex items-center justify-center space-x-2">
                  <span className="text-sm text-gray-500">AI Confidence:</span>
                  <span className="font-semibold text-blue-600">{risk.confidence}%</span>
                  {risk.ai_powered && <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">AI Powered</span>}
                </div>
              </div>
            </div>
          </div>

          {/* Risk Factors */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Risk Factors Analyzed</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Income Level:</span>
                <span className="font-semibold">₹{userData.income.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Total Expenses:</span>
                <span className="font-semibold">₹{Object.values(userData.expenses).reduce((a, b) => a + b, 0).toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Credit Score:</span>
                <span className="font-semibold">{userData.credit_score}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Loan Amount:</span>
                <span className="font-semibold">₹{userData.loan_amount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Savings:</span>
                <span className="font-semibold">₹{userData.savings.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Risk Explanation */}
          <div className="bg-white rounded-lg shadow p-6 md:col-span-2">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">AI Risk Analysis</h3>
            <div className="prose max-w-none">
              <div className="bg-blue-50 p-4 rounded-lg mb-4">
                <h4 className="font-semibold text-blue-800 mb-2">AI Assessment</h4>
                <p className="text-blue-700">{risk.explanation}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <h5 className="font-semibold text-gray-700 mb-2">Key Risk Factors</h5>
                  <p className="text-gray-600 text-sm">{risk.risk_factors}</p>
                </div>
                <div>
                  <h5 className="font-semibold text-gray-700 mb-2">Analysis Confidence</h5>
                  <div className="flex items-center space-x-2">
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${risk.confidence}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-semibold">{risk.confidence}%</span>
                  </div>
                </div>
              </div>

              {risk.risk_level === 'LOW' && (
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-800 mb-2">Low Risk Profile</h4>
                  <p className="text-green-700">
                    Your financial situation shows strong stability with good income coverage, manageable expenses,
                    and healthy savings. You have a solid foundation for financial security.
                  </p>
                </div>
              )}

              {risk.risk_level === 'MEDIUM' && (
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-yellow-800 mb-2">Medium Risk Profile</h4>
                  <p className="text-yellow-700">
                    Your financial situation is generally stable but could benefit from some improvements.
                    Consider increasing savings or reducing unnecessary expenses to lower your risk level.
                  </p>
                </div>
              )}

              {risk.risk_level === 'HIGH' && (
                <div className="bg-red-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-red-800 mb-2">High Risk Profile</h4>
                  <p className="text-red-700">
                    Your financial situation requires immediate attention. High expenses relative to income,
                    significant debt, or low savings may be putting you at risk. Consider consulting a financial advisor.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RiskPrediction;