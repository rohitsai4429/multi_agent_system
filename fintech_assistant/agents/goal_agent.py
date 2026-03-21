from typing import Dict, Any
from datetime import datetime

class GoalAgent:
    def __init__(self):
        pass

    def set_financial_goal(self, goal_data: Dict[str, Any]) -> Dict[str, Any]:
        """
        Set a financial goal and calculate required monthly savings.
        Expected: goal_name, target_amount, current_savings, timeframe_months
        """
        goal_name = goal_data.get('goal_name', 'Unnamed Goal')
        target_amount = goal_data.get('target_amount', 0)
        current_savings = goal_data.get('current_savings', 0)
        timeframe_months = goal_data.get('timeframe_months', 12)

        remaining_amount = target_amount - current_savings
        if remaining_amount <= 0:
            return {
                'goal_name': goal_name,
                'status': 'Achieved',
                'message': 'Goal already achieved!'
            }

        monthly_savings = remaining_amount / timeframe_months
        progress_percentage = (current_savings / target_amount) * 100 if target_amount > 0 else 0

        return {
            'goal_name': goal_name,
            'target_amount': target_amount,
            'current_savings': current_savings,
            'remaining_amount': remaining_amount,
            'timeframe_months': timeframe_months,
            'monthly_savings_required': monthly_savings,
            'progress_percentage': progress_percentage,
            'status': 'In Progress'
        }

    def track_progress(self, goal_data: Dict[str, Any], current_savings: float) -> Dict[str, Any]:
        """
        Track progress towards a goal.
        """
        goal_data['current_savings'] = current_savings
        return self.set_financial_goal(goal_data)