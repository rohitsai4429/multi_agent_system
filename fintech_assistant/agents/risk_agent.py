from models.risk_model import RiskModel
from utils.ai_assistant import AIAssistant
import pandas as pd

class RiskAgent:
    def __init__(self):
        self.model = RiskModel()
        try:
            self.ai_assistant = AIAssistant()
        except Exception as e:
            print(f"Warning: Failed to initialize AI assistant: {e}")
            self.ai_assistant = None

    def predict_risk(self, features: pd.DataFrame, user_data: dict = None) -> dict:
        """
        Predict financial risk using AI and ML models.
        """
        # Get AI-powered risk assessment if available
        if self.ai_assistant:
            ai_risk = self.ai_assistant.predict_financial_risk_ai(user_data or {})
        else:
            # Fallback to basic ML prediction
            ml_risk = self.model.predict_risk(features)
            ai_risk = {
                "risk_level": ml_risk.get("risk_level", "Medium"),
                "explanation": "AI unavailable, using ML model only",
                "confidence": 0.5,
                "risk_factors": ml_risk.get("risk_factors", []),
                "ai_powered": False
            }

        # Also get ML model prediction for comparison
        ml_risk = self.model.predict_risk(features)

        # Combine results
        return {
            "risk_level": ai_risk["risk_level"],
            "explanation": ai_risk["explanation"],
            "confidence": ai_risk["confidence"],
            "risk_factors": ai_risk["risk_factors"],
            "ai_powered": ai_risk["ai_powered"],
            "ml_backup": ml_risk
        }