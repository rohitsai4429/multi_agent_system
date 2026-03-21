from typing import Dict, Any
import pandas as pd

class DataAgent:
    def __init__(self):
        pass

    def collect_and_process_data(self, user_data: Dict[str, Any]) -> pd.DataFrame:
        """
        Collect and process financial data from user input.
        Expected keys: income, expenses (dict), credit_score, loan_amount, savings
        """
        # Process expenses into a DataFrame or something
        # For simplicity, return a dict or DataFrame with features for ML
        features = {
            'income': user_data.get('income', 0),
            'total_expenses': sum(user_data.get('expenses', {}).values()),
            'credit_score': user_data.get('credit_score', 0),
            'loan_amount': user_data.get('loan_amount', 0),
            'savings': user_data.get('savings', 0)
        }
        return pd.DataFrame([features])