from typing import Dict, Any

class HealthScoreAgent:
    def __init__(self):
        pass

    def calculate_health_score(self, financial_data: Dict[str, Any]) -> Dict[str, Any]:
        """
        Calculate financial health score (0-100) based on various factors.
        """
        income = financial_data.get('income', 0)
        expenses = financial_data.get('expenses', {})
        savings = financial_data.get('savings', 0)
        debts = financial_data.get('debts', 0)  # Assuming debts are provided
        investments = financial_data.get('investments', 0)
        
        if income == 0:
            return {'score': 0, 'explanation': 'No income data available.'}
        
        # Calculate ratios
        savings_ratio = (savings / income) * 100
        debt_to_income_ratio = (debts / income) * 100
        expense_ratio = (sum(expenses.values()) / income) * 100
        investment_ratio = (investments / income) * 100
        
        # Scoring logic (simple)
        score = 0
        
        # Savings score (up to 30 points)
        if savings_ratio >= 20:
            score += 30
        elif savings_ratio >= 10:
            score += 20
        elif savings_ratio >= 5:
            score += 10
        
        # Debt score (up to 25 points)
        if debt_to_income_ratio <= 20:
            score += 25
        elif debt_to_income_ratio <= 35:
            score += 15
        elif debt_to_income_ratio <= 50:
            score += 5
        
        # Expense score (up to 25 points)
        if expense_ratio <= 70:
            score += 25
        elif expense_ratio <= 85:
            score += 15
        elif expense_ratio <= 100:
            score += 5
        
        # Investment score (up to 20 points)
        if investment_ratio >= 10:
            score += 20
        elif investment_ratio >= 5:
            score += 10
        
        explanation = f"Savings: {savings_ratio:.1f}%, Debt-to-Income: {debt_to_income_ratio:.1f}%, Expenses: {expense_ratio:.1f}%, Investments: {investment_ratio:.1f}%"
        
        return {
            'score': min(score, 100),
            'explanation': explanation,
            'details': {
                'savings_ratio': savings_ratio,
                'debt_to_income_ratio': debt_to_income_ratio,
                'expense_ratio': expense_ratio,
                'investment_ratio': investment_ratio
            }
        }