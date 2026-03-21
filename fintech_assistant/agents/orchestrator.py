from agents.data_agent import DataAgent
from agents.analysis_agent import AnalysisAgent
from agents.risk_agent import RiskAgent
from agents.recommendation_agent import RecommendationAgent
from typing import Dict, Any

class Orchestrator:
    def __init__(self):
        self.data_agent = DataAgent()
        self.analysis_agent = AnalysisAgent()
        self.risk_agent = RiskAgent()
        self.recommendation_agent = RecommendationAgent()

    def process_financial_data(self, user_data: Dict[str, Any]) -> Dict[str, Any]:
        """
        Orchestrate the multi-agent workflow.
        """
        # Step 1: Data processing
        processed_data = self.data_agent.collect_and_process_data(user_data)

        # Step 2: Analysis
        analysis = self.analysis_agent.analyze_expenses(user_data)

        # Step 3: Risk prediction
        risk = self.risk_agent.predict_risk(processed_data)

        # Step 4: Recommendations
        recommendations = self.recommendation_agent.generate_recommendations(analysis, risk)

        # Final insight
        final_insight = {
            'analysis': analysis,
            'risk_level': risk,
            'recommendations': recommendations
        }

        return final_insight