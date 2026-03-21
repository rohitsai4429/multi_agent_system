import yfinance as yf
import pandas as pd
from typing import Dict, Any
from datetime import datetime, timedelta

class InvestmentAgent:
    def __init__(self):
        pass

    def analyze_stock(self, symbol: str, period: str = '1y') -> Dict[str, Any]:
        """
        Analyze stock data and predict trends.
        """
        try:
            stock = yf.Ticker(symbol)
            hist = stock.history(period=period)
            
            if hist.empty:
                return {'error': 'No data available for this symbol'}
            
            # Simple analysis
            current_price = hist['Close'].iloc[-1]
            avg_price = hist['Close'].mean()
            volatility = hist['Close'].std()
            trend = 'Upward' if hist['Close'].iloc[-1] > hist['Close'].iloc[0] else 'Downward'
            
            # Risk assessment
            if volatility > hist['Close'].mean() * 0.1:
                risk_level = 'High'
            elif volatility > hist['Close'].mean() * 0.05:
                risk_level = 'Medium'
            else:
                risk_level = 'Low'
            
            # Growth potential (simplified)
            recent_growth = (hist['Close'].iloc[-1] / hist['Close'].iloc[-30]) - 1 if len(hist) > 30 else 0
            
            return {
                'symbol': symbol,
                'current_price': current_price,
                'average_price': avg_price,
                'volatility': volatility,
                'trend': trend,
                'risk_level': risk_level,
                'growth_potential': recent_growth * 100,  # percentage
                'recommendation': self._get_recommendation(risk_level, trend)
            }
        except Exception as e:
            return {'error': str(e)}

    def _get_recommendation(self, risk_level: str, trend: str) -> str:
        if risk_level == 'Low' and trend == 'Upward':
            return 'Strong Buy'
        elif risk_level == 'Medium' and trend == 'Upward':
            return 'Buy'
        elif risk_level == 'High':
            return 'Hold or Sell'
        else:
            return 'Wait and Monitor'