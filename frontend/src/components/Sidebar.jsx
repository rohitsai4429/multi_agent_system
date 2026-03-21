import { useState } from 'react';

// Sidebar now controlled by parent via props
const Sidebar = ({ currentPage, setCurrentPage, isExpanded, toggleExpand }) => {

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'expense-analysis', label: 'Expense Analysis', icon: '💰' },
    { id: 'risk-prediction', label: 'Risk Prediction', icon: '⚠️' },
    { id: 'budget-generator', label: 'Budget Generator', icon: '📋' },
    { id: 'goal-planning', label: 'Goal Planning', icon: '🎯' },
    { id: 'health-score', label: 'Health Score', icon: '❤️' },
    { id: 'fraud-detection', label: 'Fraud Detection', icon: '🛡️' },
    { id: 'investment-analysis', label: 'Investment Analysis', icon: '📈' },
    { id: 'financial-alerts', label: 'Financial Alerts', icon: '🚨' },
  ];

  return (
    <div className={`${isExpanded ? 'w-64' : 'w-20'} bg-gradient-to-b from-green-900 to-green-950 text-white h-screen transition-all duration-300 shadow-2xl z-50 flex flex-col`}>
      {/* Logo Section */}
      <div className="p-4 border-b border-green-800 flex items-center justify-between">
        {isExpanded && (
          <div>
            <h1 className="text-xl font-bold text-emerald-400">💰 FinTech AI</h1>
            <p className="text-xs text-green-300">Financial Assistant</p>
          </div>
        )}
        <button
          onClick={toggleExpand}
          className="p-2 hover:bg-green-800 rounded-lg transition"
        >
          {isExpanded ? '←' : '→'}
        </button>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setCurrentPage(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
              currentPage === item.id
                ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/50'
                : 'text-green-100 hover:bg-green-800'
            }`}
          >
            <span className="text-xl">{item.icon}</span>
            {isExpanded && <span className="font-medium">{item.label}</span>}
          </button>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-blue-800">
        {isExpanded && (
          <div className="text-xs text-blue-300 space-y-2">
            <p>🟢 System Online</p>
            <p className="text-cyan-400">ML Model: v2.1</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
