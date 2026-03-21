from typing import Dict, Any, List
import pandas as pd

class AnalysisAgent:
    def __init__(self):
        pass

    def analyze_expenses(self, user_data: Dict[str, Any]) -> Dict[str, Any]:
        """
        Analyze income and expenses, provide insights.
        """
        income = user_data.get('income', 0)
        expenses = user_data.get('expenses', {})
        total_expenses = sum(expenses.values())

        # Enhanced expense tracking
        expense_breakdown = []
        for category, amount in expenses.items():
            percentage = round((amount / total_expenses * 100), 2) if total_expenses > 0 else 0
            expense_breakdown.append({
                'category': category,
                'amount': amount,
                'percentage': percentage
            })

        # Categorize expenses
        essential_categories = ['rent', 'utilities', 'groceries', 'transportation', 'insurance', 'healthcare']
        non_essential_categories = ['entertainment', 'dining', 'shopping', 'subscriptions', 'travel']

        essential_expenses = sum(expenses.get(cat, 0) for cat in essential_categories)
        non_essential_expenses = sum(expenses.get(cat, 0) for cat in non_essential_categories)

        insights = {
            'total_income': income,
            'total_expenses': total_expenses,
            'net_savings': income - total_expenses,
            'expense_breakdown': expense_breakdown,
            'essential_expenses': essential_expenses,
            'non_essential_expenses': non_essential_expenses,
            'expense_categories': {
                'essentials': essential_categories,
                'non_essentials': non_essential_categories
            },
            'high_spending_areas': [item['category'] for item in expense_breakdown if item['amount'] > income * 0.15],
            'saving_suggestions': self._generate_saving_suggestions(expenses, income),
            'budget_recommendations': self._budget_recommendations(income, expenses),
            'spending_patterns': self._analyze_spending_patterns(expenses, income)
        }
        return insights

    def _generate_saving_suggestions(self, expenses: Dict[str, float], income: float) -> List[str]:
        suggestions = []
        total_expenses = sum(expenses.values())
        
        # Basic suggestions for all users
        if income == 0:
            suggestions.append("Start by entering your monthly income to get personalized savings suggestions.")
        else:
            suggestions.append("Aim to save at least 20% of your income for financial security.")
            suggestions.append("Follow the 50/30/20 rule: 50% needs, 30% wants, 20% savings/debt repayment.")
        
        # Category-specific suggestions
        for category, amount in expenses.items():
            if amount > income * 0.15:
                suggestions.append(f"Consider reducing spending on {category} by 10-20% to improve savings.")
        
        # Overall expense analysis
        if total_expenses > income * 0.8:
            suggestions.append("Your expenses are quite high relative to income. Focus on reducing non-essential spending.")
        elif total_expenses < income * 0.5:
            suggestions.append("Great job keeping expenses low! Consider investing the surplus wisely.")
        
        # Emergency fund suggestion
        if income > 0:
            emergency_fund_target = income * 6  # 6 months of expenses
            suggestions.append(f"Build an emergency fund covering at least 6 months of expenses (target: ₹{emergency_fund_target:,.0f}).")
        
        return suggestions

    def _budget_recommendations(self, income: float, expenses: Dict[str, float]) -> Dict[str, float]:
        # Simple 50/30/20 rule: 50% needs, 30% wants, 20% savings
        recommended = {
            'essentials': income * 0.5,
            'wants': income * 0.3,
            'savings': income * 0.2
        }
        return recommended

    def _analyze_spending_patterns(self, expenses: Dict[str, float], income: float) -> Dict[str, Any]:
        """
        Analyze spending patterns for insights.
        """
        total = sum(expenses.values())
        patterns = {
            'average_transaction': total / len(expenses) if expenses else 0,
            'largest_category': max(expenses, key=expenses.get) if expenses else None,
            'expense_to_income_ratio': (total / income * 100) if income > 0 else 0,
            'categories_count': len(expenses)
        }
        return patterns