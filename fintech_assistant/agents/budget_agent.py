from typing import Dict, Any, List

class BudgetAgent:
    def __init__(self):
        pass

    def generate_smart_budget(self, income: float, expenses: Dict[str, float]) -> Dict[str, Any]:
        """
        Generate a recommended monthly budget.
        """
        total_expenses = sum(expenses.values())
        
        # Categorize expenses (simple logic)
        needs_categories = ['rent', 'utilities', 'groceries', 'transportation', 'insurance', 'healthcare']
        wants_categories = ['entertainment', 'dining', 'shopping', 'subscriptions']
        
        needs_expenses = sum(expenses.get(cat, 0) for cat in needs_categories)
        wants_expenses = sum(expenses.get(cat, 0) for cat in wants_categories)
        other_expenses = total_expenses - needs_expenses - wants_expenses
        
        # Recommended allocations (50/30/20 rule + investments)
        needs_budget = income * 0.50
        wants_budget = income * 0.30
        savings_budget = income * 0.15
        investments_budget = income * 0.05
        
        budget_plan = {
            'total_income': income,
            'total_expenses': total_expenses,
            'budget_breakdown': {
                'needs': {
                    'allocated': needs_budget,
                    'current': needs_expenses,
                    'categories': needs_categories
                },
                'wants': {
                    'allocated': wants_budget,
                    'current': wants_expenses,
                    'categories': wants_categories
                },
                'savings': {
                    'allocated': savings_budget,
                    'current': 0  # Assume separate
                },
                'investments': {
                    'allocated': investments_budget,
                    'current': 0
                }
            },
            'recommendations': self._generate_budget_recommendations(income, total_expenses, needs_expenses, wants_expenses)
        }
        
        return budget_plan

    def _generate_budget_recommendations(self, income: float, total_expenses: float, needs: float, wants: float) -> List[str]:
        recommendations = []
        if total_expenses > income * 0.9:
            recommendations.append("Your expenses are too high. Aim to reduce spending by 10-20%.")
        if needs > income * 0.5:
            recommendations.append("Needs expenses are over budget. Consider cheaper alternatives for essentials.")
        if wants > income * 0.3:
            recommendations.append("Wants expenses exceed recommendation. Cut back on non-essentials.")
        return recommendations