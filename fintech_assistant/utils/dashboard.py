import matplotlib.pyplot as plt
import io
import base64
from typing import Dict, Any, List
import pandas as pd

class DashboardGenerator:
    def __init__(self):
        pass

    def generate_spending_pie_chart(self, expenses: Dict[str, float]) -> str:
        """
        Generate base64 encoded pie chart for spending distribution.
        """
        labels = list(expenses.keys())
        sizes = list(expenses.values())
        
        fig, ax = plt.subplots()
        ax.pie(sizes, labels=labels, autopct='%1.1f%%', startangle=90)
        ax.axis('equal')
        
        buf = io.BytesIO()
        fig.savefig(buf, format='png')
        buf.seek(0)
        image_base64 = base64.b64encode(buf.read()).decode('utf-8')
        plt.close(fig)
        
        return f"data:image/png;base64,{image_base64}"

    def generate_savings_trend_chart(self, savings_history: List[float]) -> str:
        """
        Generate line chart for savings trend.
        """
        fig, ax = plt.subplots()
        ax.plot(savings_history, marker='o')
        ax.set_title('Savings Trend')
        ax.set_xlabel('Time Period')
        ax.set_ylabel('Savings Amount')
        
        buf = io.BytesIO()
        fig.savefig(buf, format='png')
        buf.seek(0)
        image_base64 = base64.b64encode(buf.read()).decode('utf-8')
        plt.close(fig)
        
        return f"data:image/png;base64,{image_base64}"

    def get_chart_data(self, expenses: Dict[str, float], savings_history: List[float] = None) -> Dict[str, Any]:
        """
        Return chart data as JSON for frontend rendering.
        """
        # Pie chart data
        pie_data = {
            'labels': list(expenses.keys()),
            'datasets': [{
                'data': list(expenses.values()),
                'backgroundColor': ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF']
            }]
        }
        
        # Line chart data
        line_data = None
        if savings_history:
            line_data = {
                'labels': [f'Period {i+1}' for i in range(len(savings_history))],
                'datasets': [{
                    'label': 'Savings',
                    'data': savings_history,
                    'borderColor': '#36A2EB',
                    'fill': False
                }]
            }
        
        return {
            'spending_pie': pie_data,
            'savings_trend': line_data
        }