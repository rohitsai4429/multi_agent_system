import { useState, useEffect } from 'react';
import { financialApi } from '../services/api';

const FinancialAlerts = ({ userData }) => {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadAlerts();
  }, [userData]);

  const loadAlerts = async () => {
    setLoading(true);
    try {
      const response = await financialApi.generateAlerts(userData);
      setAlerts(response.data.alerts);
    } catch (error) {
      console.error('Error loading alerts:', error);
    }
    setLoading(false);
  };

  const getAlertColor = (type) => {
    switch (type) {
      case 'danger': return 'border-red-500 bg-red-50';
      case 'warning': return 'border-yellow-500 bg-yellow-50';
      case 'info': return 'border-blue-500 bg-blue-50';
      default: return 'border-gray-500 bg-gray-50';
    }
  };

  const getSeverityIcon = (severity) => {
    switch (severity) {
      case 'high': return '🚨';
      case 'medium': return '⚠️';
      case 'low': return 'ℹ️';
      default: return '📢';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Financial Alerts</h1>
        <button
          onClick={loadAlerts}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Refresh Alerts'}
        </button>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Active Financial Alerts</h3>

        {alerts.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-4xl mb-4">✅</div>
            <p className="text-gray-600">No active alerts. Your finances are in good shape!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {alerts.map((alert, index) => (
              <div
                key={index}
                className={`border-l-4 p-4 rounded-r-lg ${getAlertColor(alert.type)}`}
              >
                <div className="flex items-start">
                  <span className="text-2xl mr-3">{getSeverityIcon(alert.severity)}</span>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold text-gray-800 capitalize">
                        {alert.category} Alert
                      </h4>
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${
                        alert.severity === 'high' ? 'bg-red-200 text-red-800' :
                        alert.severity === 'medium' ? 'bg-yellow-200 text-yellow-800' :
                        'bg-blue-200 text-blue-800'
                      }`}>
                        {alert.severity.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-gray-700 mb-2">{alert.message}</p>
                    <div className="text-sm text-gray-600">
                      <span className="capitalize">{alert.type}</span> • {new Date().toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Alert Types</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 border rounded-lg">
            <div className="text-2xl mb-2">🚨</div>
            <h4 className="font-semibold">High Priority</h4>
            <p className="text-sm text-gray-600">Immediate action required</p>
          </div>
          <div className="text-center p-4 border rounded-lg">
            <div className="text-2xl mb-2">⚠️</div>
            <h4 className="font-semibold">Medium Priority</h4>
            <p className="text-sm text-gray-600">Review and consider action</p>
          </div>
          <div className="text-center p-4 border rounded-lg">
            <div className="text-2xl mb-2">ℹ️</div>
            <h4 className="font-semibold">Low Priority</h4>
            <p className="text-sm text-gray-600">Informational alerts</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinancialAlerts;