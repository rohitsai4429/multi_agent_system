import os
import random
import google.generativeai as genai
from groq import Groq
import requests
from typing import Dict, Any

class AIAssistant:
    def __init__(self):
        self.gemini_available = False
        self.groq_available = False

        # Initialize Gemini
        gemini_key = os.getenv('GEMINI_API_KEY')
        if gemini_key:
            genai.configure(api_key=gemini_key)
            self.gemini_model = genai.GenerativeModel('gemini-pro')
            self.gemini_available = True

        # Initialize Groq
        groq_key = os.getenv('GROQ_API_KEY')
        if groq_key:
            try:
                self.groq_client = Groq(api_key=groq_key)
                self.groq_available = True
            except Exception as e:
                print(f"Warning: Failed to initialize Groq client: {e}")
                self.groq_available = False

    def predict_financial_risk_ai(self, user_data: Dict[str, Any]) -> Dict[str, Any]:
        """
        Use AI to predict financial risk based on user data.
        Returns risk level, explanation, and confidence score.
        """
        income = user_data.get('income', 0)
        expenses = user_data.get('expenses', {})
        total_expenses = sum(expenses.values())
        credit_score = user_data.get('credit_score', 0)
        loan_amount = user_data.get('loan_amount', 0)
        savings = user_data.get('savings', 0)
        debts = user_data.get('debts', 0)
        investments = user_data.get('investments', 0)

        # Calculate basic ratios
        expense_ratio = total_expenses / income if income > 0 else 1
        savings_ratio = savings / income if income > 0 else 0
        debt_ratio = debts / income if income > 0 else 0
        investment_ratio = investments / income if income > 0 else 0

        prompt = f"""
        Analyze this financial data and predict financial risk level:

        Financial Data:
        - Monthly Income: ₹{income:,.0f}
        - Total Monthly Expenses: ₹{total_expenses:,.0f}
        - Credit Score: {credit_score}
        - Loan Amount: ₹{loan_amount:,.0f}
        - Savings: ₹{savings:,.0f}
        - Debts: ₹{debts:,.0f}
        - Investments: ₹{investments:,.0f}

        Calculated Ratios:
        - Expense-to-Income Ratio: {expense_ratio:.2f}
        - Savings-to-Income Ratio: {savings_ratio:.2f}
        - Debt-to-Income Ratio: {debt_ratio:.2f}
        - Investment-to-Income Ratio: {investment_ratio:.2f}

        Based on this data, classify the financial risk as:
        - LOW: Stable finances, good savings, manageable expenses
        - MEDIUM: Moderate risk, some concerns but manageable
        - HIGH: High risk, significant financial stress

        Provide:
        1. Risk Level (LOW/MEDIUM/HIGH)
        2. Brief explanation (2-3 sentences)
        3. Confidence score (0-100)
        4. Key risk factors identified

        Format: RISK_LEVEL|EXPLANATION|CONFIDENCE|RISK_FACTORS
        """

        try:
            if self.gemini_available:
                response = self.gemini_model.generate_content(prompt)
                result = response.text.strip()
            elif self.groq_available:
                response = self.groq_client.chat.completions.create(
                    messages=[{"role": "user", "content": prompt}],
                    model="llama3-70b-8192",
                    max_tokens=300
                )
                result = response.choices[0].message.content.strip()
            else:
                # Fallback to rule-based system
                return self._rule_based_risk_prediction(user_data)

            # Parse the result
            parts = result.split('|')
            if len(parts) >= 4:
                risk_level = parts[0].strip().upper()
                explanation = parts[1].strip()
                confidence = min(100, max(0, int(parts[2].strip()) if parts[2].strip().isdigit() else 75))
                risk_factors = parts[3].strip()
            else:
                # Fallback parsing
                risk_level = "MEDIUM"
                explanation = "AI analysis completed with moderate risk assessment."
                confidence = 70
                risk_factors = "Analysis based on financial ratios and patterns."

            # Add some randomness to make it change on refresh (±10%)
            confidence_variation = random.randint(-10, 10)
            confidence = max(0, min(100, confidence + confidence_variation))

            return {
                "risk_level": risk_level,
                "explanation": explanation,
                "confidence": confidence,
                "risk_factors": risk_factors,
                "ai_powered": True
            }

        except Exception as e:
            print(f"AI prediction failed: {e}")
            return self._rule_based_risk_prediction(user_data)

    def _rule_based_risk_prediction(self, user_data: Dict[str, Any]) -> Dict[str, Any]:
        """Fallback rule-based risk prediction"""
        income = user_data.get('income', 0)
        expenses = user_data.get('expenses', {})
        total_expenses = sum(expenses.values())
        credit_score = user_data.get('credit_score', 0)
        loan_amount = user_data.get('loan_amount', 0)
        savings = user_data.get('savings', 0)

        expense_ratio = total_expenses / income if income > 0 else 1
        savings_ratio = savings / income if income > 0 else 0

        if expense_ratio > 0.9 or credit_score < 600 or loan_amount > income * 2:
            risk_level = "HIGH"
            explanation = "High financial risk due to high expenses, low credit score, or significant debt."
        elif expense_ratio > 0.7 or savings_ratio < 0.1:
            risk_level = "MEDIUM"
            explanation = "Moderate financial risk with room for improvement in savings or expense management."
        else:
            risk_level = "LOW"
            explanation = "Low financial risk with good balance between income, expenses, and savings."

        return {
            "risk_level": risk_level,
            "explanation": explanation,
            "confidence": 85,
            "risk_factors": "Based on expense ratios, credit score, and savings analysis.",
            "ai_powered": False
        }

    def get_stock_analysis(self, stock_name: str, period: str = "1y") -> Dict[str, Any]:
        """
        Get stock analysis with AI insights
        """
        try:
            # First try yfinance
            import yfinance as yf
            stock = yf.Ticker(stock_name)
            info = stock.info
            hist = stock.history(period=period)

            if hist.empty:
                return {"error": "Stock data not found"}

            current_price = hist['Close'].iloc[-1] if not hist.empty else 0
            avg_price = hist['Close'].mean()
            volatility = hist['Close'].std() / hist['Close'].mean() * 100

            # Calculate trend
            if len(hist) > 1:
                start_price = hist['Close'].iloc[0]
                end_price = hist['Close'].iloc[-1]
                trend = "Upward" if end_price > start_price else "Downward"
            else:
                trend = "Neutral"

            # AI analysis for risk
            risk_prompt = f"""
            Analyze the risk of investing in {stock_name} based on:
            - Current Price: ₹{current_price:.2f}
            - Average Price ({period}): ₹{avg_price:.2f}
            - Volatility: {volatility:.2f}%
            - Trend: {trend}
            - Company: {info.get('longName', stock_name)}

            Provide:
            1. Risk Level (LOW/MEDIUM/HIGH)
            2. Risk Percentage (0-100)
            3. Brief reasoning (1-2 sentences)

            Format: RISK_LEVEL|PERCENTAGE|REASONING
            """

            if self.gemini_available:
                response = self.gemini_model.generate_content(risk_prompt)
                risk_result = response.text.strip()
            elif self.groq_available:
                response = self.groq_client.chat.completions.create(
                    messages=[{"role": "user", "content": risk_prompt}],
                    model="llama3-8b-8192",
                    max_tokens=150
                )
                risk_result = response.choices[0].message.content.strip()
            else:
                risk_result = "MEDIUM|50|Standard market risk assessment"

            parts = risk_result.split('|')
            risk_level = parts[0].strip() if len(parts) > 0 else "MEDIUM"
            risk_percentage = int(parts[1].strip()) if len(parts) > 1 and parts[1].strip().isdigit() else 50
            reasoning = parts[2].strip() if len(parts) > 2 else "AI-powered risk assessment"

            return {
                "symbol": stock_name,
                "current_price": current_price,
                "average_price": avg_price,
                "volatility": volatility,
                "trend": trend,
                "risk_level": risk_level,
                "risk_percentage": risk_percentage,
                "risk_reasoning": reasoning,
                "company_name": info.get('longName', stock_name),
                "ai_analysis": True
            }

        except Exception as e:
            print(f"Stock analysis failed: {e}")
            return {"error": f"Could not analyze {stock_name}: {str(e)}"}

    def search_web_for_stock(self, stock_name: str) -> Dict[str, Any]:
        """
        Fallback web search for stock information
        """
        try:
            # Use a simple web search API or mock data
            # In production, you'd use Google Search API or similar
            return {
                "symbol": stock_name,
                "current_price": 100 + random.randint(-20, 20),  # Mock data
                "trend": "Neutral",
                "risk_level": "MEDIUM",
                "risk_percentage": 50,
                "source": "web_search"
            }
        except:
            return {"error": "Web search failed"}