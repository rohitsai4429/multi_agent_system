import { useState } from 'react';
import { financialApi } from '../services/api';

const GoalPlanning = ({ userData, updateUserData, setCurrentPage }) => {
  const [goals, setGoals] = useState(() => {
    try {
      const stored = localStorage.getItem('goals');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });
  const [newGoal, setNewGoal] = useState({
    goal_name: '',
    target_amount: '',
    current_savings: '',
    timeframe_months: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const goalData = {
      ...newGoal,
      target_amount: Number(newGoal.target_amount) || 0,
      current_savings: Number(newGoal.current_savings) || 0,
      timeframe_months: Number(newGoal.timeframe_months) || 0
    };

    try {
      // Save locally for demo purposes
      const nextGoals = [...goals, goalData];
      setGoals(nextGoals);
      localStorage.setItem('goals', JSON.stringify(nextGoals));

      // Optional backend persistence if available
      try {
        await financialApi.setGoal(goalData);
      } catch (backendError) {
        console.warn('Backend goal persistence failed:', backendError);
      }

      setNewGoal({ goal_name: '', target_amount: '', current_savings: '', timeframe_months: '' });
      setCurrentPage('dashboard');
    } catch (error) {
      console.error('Error setting goal:', error);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Financial Goal Planning</h1>

      {/* Set New Goal */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Set a New Financial Goal</h3>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Goal Name</label>
            <input
              type="text"
              value={newGoal.goal_name}
              onChange={(e) => setNewGoal({...newGoal, goal_name: e.target.value})}
              className="w-full p-2 border rounded-lg"
              placeholder="e.g., Emergency Fund, House Down Payment"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Target Amount (₹)</label>
            <input
              type="number"
              value={newGoal.target_amount}
              onChange={(e) => setNewGoal({...newGoal, target_amount: parseFloat(e.target.value) || ''})}
              className="w-full p-2 border rounded-lg"
              placeholder="10000"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Current Savings (₹)</label>
            <input
              type="number"
              value={newGoal.current_savings}
              onChange={(e) => setNewGoal({...newGoal, current_savings: parseFloat(e.target.value) || ''})}
              className="w-full p-2 border rounded-lg"
              placeholder="2000"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Timeframe (Months)</label>
            <input
              type="number"
              value={newGoal.timeframe_months}
              onChange={(e) => setNewGoal({...newGoal, timeframe_months: parseInt(e.target.value) || ''})}
              className="w-full p-2 border rounded-lg"
              placeholder="24"
              required
            />
          </div>
          <div className="md:col-span-2">
            <button
              type="submit"
              className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
            >
              Set Goal
            </button>
          </div>
        </form>
      </div>

      {/* Goals List */}
      {goals.length > 0 && (
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Your Goals</h3>
          <div className="space-y-4">
            {goals.map((goal, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-3">
                  <h4 className="font-semibold text-lg">{goal.goal_name}</h4>
                  <span className={`px-2 py-1 rounded text-sm ${
                    goal.status === 'Achieved' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                  }`}>
                    {goal.status}
                  </span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Target:</span>
                    <p className="font-semibold">₹{goal.target_amount?.toLocaleString()}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Current:</span>
                    <p className="font-semibold">₹{goal.current_savings?.toLocaleString()}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Monthly Needed:</span>
                    <p className="font-semibold">₹{goal.monthly_savings_required?.toFixed(2)}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Progress:</span>
                    <p className="font-semibold">{goal.progress_percentage?.toFixed(1)}%</p>
                  </div>
                </div>
                {goal.progress_percentage < 100 && (
                  <div className="mt-3">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-green-600 h-2 rounded-full"
                        style={{ width: `${Math.min(goal.progress_percentage, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default GoalPlanning;