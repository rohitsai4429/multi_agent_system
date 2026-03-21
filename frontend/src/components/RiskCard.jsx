const RiskCard = ({ transaction, result }) => {
  const getRiskColor = (score) => {
    if (score < 30) return 'bg-green-500';
    if (score < 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getDecisionColor = (decision) => {
    switch (decision) {
      case 'approve':
        return 'border-green-500 bg-green-50';
      case 'review':
        return 'border-yellow-500 bg-yellow-50';
      case 'block':
        return 'border-red-500 bg-red-50';
      default:
        return 'border-gray-500 bg-gray-50';
    }
  };

  return (
    <div className={`border-l-4 p-6 rounded-lg shadow-lg ${getDecisionColor(result.decision)}`}>
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-bold text-gray-800">{transaction.merchant_id || 'Transaction'}</h3>
          <p className="text-sm text-gray-600">{new Date().toLocaleString()}</p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-gray-900">₹{transaction.amount.toFixed(2)}</p>
          <p className="text-xs text-gray-600">Transaction</p>
        </div>
      </div>

      {/* Risk Score */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-semibold text-gray-700">Risk Score</span>
          <span className="text-lg font-bold text-gray-900">{Math.round(result.final_score)}/100</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className={`h-3 rounded-full transition-all ${getRiskColor(result.final_score)}`}
            style={{ width: `${result.final_score}%` }}
          />
        </div>
      </div>

      {/* Agent Scores */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-white p-3 rounded border border-gray-200">
          <p className="text-xs text-gray-600 mb-1">Rule-Based Score</p>
          <p className="text-xl font-bold">{(result.rule_score || 0).toFixed(1)}/70</p>
        </div>
        <div className="bg-white p-3 rounded border border-gray-200">
          <p className="text-xs text-gray-600 mb-1">ML Anomaly Score</p>
          <p className="text-xl font-bold">{(result.ml_score || 0).toFixed(1)}/30</p>
        </div>
      </div>

      {/* Decision Badge */}
      <div className="flex items-center gap-2">
        <span className="text-sm font-semibold text-gray-700">Decision:</span>
        <span
          className={`px-4 py-2 rounded-full font-bold text-white ${
            result.decision === 'APPROVE'
              ? 'bg-green-500'
              : result.decision === 'REVIEW'
              ? 'bg-yellow-500'
              : 'bg-red-500'
          }`}
        >
          {result.decision}
        </span>
      </div>

      {/* Transaction Details */}
      <div className="mt-4 pt-4 border-t border-gray-200 text-xs text-gray-600 space-y-1">
        <p><strong>User ID:</strong> {transaction.user_id}</p>
        <p><strong>Location:</strong> {transaction.location}</p>
        <p><strong>Type:</strong> {transaction.transaction_type}</p>
      </div>
    </div>
  );
};

export default RiskCard;
