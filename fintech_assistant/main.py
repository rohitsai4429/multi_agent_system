from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Dict, Any, List
from agents.orchestrator import Orchestrator
from agents.analysis_agent import AnalysisAgent
from agents.risk_agent import RiskAgent
from agents.recommendation_agent import RecommendationAgent
from agents.data_agent import DataAgent
from agents.goal_agent import GoalAgent
from agents.budget_agent import BudgetAgent
from agents.health_score_agent import HealthScoreAgent
from agents.fraud_detection_agent import FraudDetectionAgent
from agents.investment_agent import InvestmentAgent
from agents.alert_agent import AlertAgent
from utils.dashboard import DashboardGenerator

app = FastAPI(title="Multi-Agent FinTech Financial Assistant")

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:5174", "http://localhost:5175", "http://localhost:5176"],  # Frontend URLs
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

orchestrator = Orchestrator()
analysis_agent = AnalysisAgent()
risk_agent = RiskAgent()
recommendation_agent = RecommendationAgent()
data_agent = DataAgent()
goal_agent = GoalAgent()
budget_agent = BudgetAgent()
health_score_agent = HealthScoreAgent()
fraud_agent = FraudDetectionAgent()
investment_agent = InvestmentAgent()
alert_agent = AlertAgent()
dashboard_gen = DashboardGenerator()

class UserData(BaseModel):
    income: float
    expenses: Dict[str, float]
    credit_score: int
    loan_amount: float
    savings: float
    debts: float = 0
    investments: float = 0

class GoalData(BaseModel):
    goal_name: str
    target_amount: float
    current_savings: float
    timeframe_months: int

class TransactionData(BaseModel):
    amount: float
    date: str
    category: str
    description: str = ""
    merchant: str = ""

class Transactions(BaseModel):
    transactions: List[Dict[str, Any]]

@app.post("/analyze-expenses")
def analyze_expenses(data: UserData):
    analysis = analysis_agent.analyze_expenses(data.dict())
    return {"analysis": analysis}

@app.post("/predict-risk")
def predict_risk(data: UserData):
    processed_data = data_agent.collect_and_process_data(data.dict())
    risk = risk_agent.predict_risk(processed_data, data.dict())
    return risk

@app.post("/get-recommendations")
def get_recommendations(data: UserData):
    analysis = analysis_agent.analyze_expenses(data.dict())
    processed_data = data_agent.collect_and_process_data(data.dict())
    risk = risk_agent.predict_risk(processed_data)
    recommendations = recommendation_agent.generate_recommendations(analysis, risk)
    return {"recommendations": recommendations}

@app.post("/full-analysis")
def full_analysis(data: UserData):
    result = orchestrator.process_financial_data(data.dict())
    return result

@app.post("/set-goal")
def set_goal(goal: GoalData):
    result = goal_agent.set_financial_goal(goal.dict())
    return result

@app.post("/generate-budget")
def generate_budget(data: UserData):
    budget = budget_agent.generate_smart_budget(data.income, data.expenses)
    return budget

@app.post("/health-score")
def health_score(data: UserData):
    score = health_score_agent.calculate_health_score(data.dict())
    return score

@app.post("/detect-fraud")
def detect_fraud(txns: Transactions):
    suspicious = fraud_agent.detect_fraud(txns.transactions)
    return {"suspicious_transactions": suspicious}

@app.post("/process-transaction")
def process_transaction(transaction: TransactionData):
    # Process individual transaction for fraud detection
    txns = [transaction.dict()]
    suspicious = fraud_agent.detect_fraud(txns)
    
    # Get risk score from the fraud detection
    risk_score = suspicious[0]['risk_score'] if suspicious else 50
    
    # Determine decision based on risk score
    if risk_score < 30:
        decision = "approve"
    elif risk_score < 60:
        decision = "review"
    else:
        decision = "block"
    
    return {
        "decision": decision,
        "risk_score": risk_score,
        "final_score": risk_score,
        "explanation": f"Transaction {decision}d based on risk score of {risk_score}"
    }

@app.get("/analyze-stock/{symbol}")
def analyze_stock(symbol: str, period: str = "1y"):
    analysis = investment_agent.analyze_stock(symbol, period)
    return analysis

@app.post("/dashboard-charts")
def dashboard_charts(data: UserData, savings_history: List[float] = None):
    charts = dashboard_gen.get_chart_data(data.expenses, savings_history)
    return charts

@app.post("/generate-alerts")
def generate_alerts(data: UserData):
    # Get budget for comparison
    budget = budget_agent.generate_smart_budget(data.income, data.expenses)
    alerts = alert_agent.generate_alerts(data.dict(), budget)
    return {"alerts": alerts}

@app.get("/transaction-history")
def get_transaction_history():
    """Get transaction history from fraud detection agent"""
    try:
        history = fraud_agent.get_transaction_history()
        return {"transactions": history}
    except Exception as e:
        return {"transactions": [], "error": str(e)}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)