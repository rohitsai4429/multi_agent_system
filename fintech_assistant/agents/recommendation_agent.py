from typing import Dict, Any, List

class RecommendationAgent:
    def __init__(self):
        pass

    def generate_recommendations(self, analysis: Dict[str, Any], risk: str) -> List[str]:
        """
        Generate financial recommendations based on analysis and risk level.
        """
        recommendations = []

        if analysis['net_savings'] < 0:
            recommendations.append("Your expenses exceed income. Prioritize reducing expenses or increasing income.")

        if risk == 'High':
            recommendations.append("High risk detected. Focus on building emergency savings and reducing debt.")
            recommendations.append("Consider low-risk investments like savings accounts or CDs.")
        elif risk == 'Medium':
            recommendations.append("Medium risk. Diversify investments and maintain a balanced portfolio.")
        else:
            recommendations.append("Low risk. You can consider some higher-risk investments for better returns, but keep savings secure.")

        recommendations.extend(analysis.get('saving_suggestions', []))
        recommendations.append("Follow the 50/30/20 rule for budgeting: 50% essentials, 30% wants, 20% savings.")

        return recommendations