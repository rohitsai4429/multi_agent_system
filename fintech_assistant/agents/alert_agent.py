from typing import Dict, Any, List

class AlertAgent:
    def __init__(self):
        pass

    def generate_alerts(self, financial_data: Dict[str, Any], budget: Dict[str, Any] = None) -> List[Dict[str, Any]]:
        """
        Generate financial alerts based on current data and budget.
        """
        alerts = []
        income = financial_data.get('income', 0)
        expenses = financial_data.get('expenses', {})
        total_expenses = sum(expenses.values())
        savings = financial_data.get('savings', 0)
        debts = financial_data.get('debts', 0)

        # Spending alerts
        if total_expenses > income * 0.9:
            alerts.append({
                'type': 'warning',
                'category': 'spending',
                'message': 'Your total expenses exceed 90% of your income. Consider reducing spending.',
                'severity': 'high'
            })

        # Budget alerts
        if budget:
            for category, details in budget.get('budget_breakdown', {}).items():
                if category in expenses:
                    current = expenses[category]
                    allocated = details.get('allocated', 0)
                    if current > allocated * 1.1:  # 10% over budget
                        alerts.append({
                            'type': 'warning',
                            'category': 'budget',
                            'message': f'Spending in {category} is 10% over budget.',
                            'severity': 'medium'
                        })

        # Savings alerts
        if savings < income * 0.1:
            alerts.append({
                'type': 'info',
                'category': 'savings',
                'message': 'Your savings are below 10% of income. Consider increasing savings.',
                'severity': 'medium'
            })

        # Debt alerts
        if debts > income * 0.5:
            alerts.append({
                'type': 'warning',
                'category': 'debt',
                'message': 'Your debt-to-income ratio is high. Focus on debt reduction.',
                'severity': 'high'
            })

        # Risk alerts (assuming risk level is available)
        risk_level = financial_data.get('risk_level', 'Low')
        if risk_level == 'High':
            alerts.append({
                'type': 'danger',
                'category': 'risk',
                'message': 'High financial risk detected. Review your financial strategy.',
                'severity': 'high'
            })

        return alerts

    def check_threshold_alerts(self, current_value: float, threshold: float, alert_type: str) -> Dict[str, Any]:
        """
        Check if a value exceeds a threshold and generate alert.
        """
        if current_value > threshold:
            return {
                'type': 'warning',
                'category': alert_type,
                'message': f'{alert_type.capitalize()} has exceeded the threshold of {threshold}.',
                'severity': 'medium'
            }
        return None