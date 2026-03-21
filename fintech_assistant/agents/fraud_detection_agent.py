import pandas as pd
from sklearn.ensemble import IsolationForest
import joblib
import os
from typing import List, Dict, Any
import numpy as np
from datetime import datetime, timedelta

class FraudDetectionAgent:
    def __init__(self):
        self.model = None
        self.model_path = 'models/fraud_model.pkl'
        self.transaction_history = []  # Store user transaction history

    def train_fraud_model(self):
        # Use more realistic credit card fraud detection features
        # Based on common fraud detection patterns
        np.random.seed(42)

        # Normal transactions
        normal_amounts = np.random.exponential(100, 900)  # Most transactions are small
        normal_frequencies = np.random.poisson(2, 900)  # Normal frequency
        normal_times = np.random.uniform(0, 24, 900)  # Time of day
        normal_locations = np.random.uniform(0, 10, 900)  # Location score
        normal_categories = np.random.choice([0, 1, 2, 3], 900)  # Category codes

        # Fraudulent transactions (10% of data)
        fraud_amounts = np.random.exponential(500, 100)  # Larger amounts
        fraud_frequencies = np.random.poisson(5, 100)  # Higher frequency
        fraud_times = np.random.choice([2, 3, 4, 5], 100)  # Unusual hours
        fraud_locations = np.random.uniform(7, 10, 100)  # Unusual locations
        fraud_categories = np.random.choice([4, 5], 100)  # Unusual categories

        # Combine data
        amounts = np.concatenate([normal_amounts, fraud_amounts])
        frequencies = np.concatenate([normal_frequencies, fraud_frequencies])
        times = np.concatenate([normal_times, fraud_times])
        locations = np.concatenate([normal_locations, fraud_locations])
        categories = np.concatenate([normal_categories, fraud_categories])

        # Create features
        data = {
            'amount': amounts,
            'frequency': frequencies,
            'time_of_day': times,
            'location_score': locations,
            'category_code': categories,
            'amount_velocity': amounts / (frequencies + 1),  # Amount per transaction
            'time_anomaly': np.abs(times - 12) / 12,  # Distance from noon
        }

        df = pd.DataFrame(data)

        self.model = IsolationForest(contamination=0.1, random_state=42)
        self.model.fit(df)

        joblib.dump(self.model, self.model_path)

    def load_model(self):
        if os.path.exists(self.model_path):
            self.model = joblib.load(self.model_path)
        else:
            self.train_fraud_model()

    def add_transaction_to_history(self, transaction: Dict[str, Any]):
        """Add transaction to user's history for pattern analysis"""
        self.transaction_history.append({
            **transaction,
            'timestamp': datetime.now()
        })

        # Keep only last 100 transactions
        if len(self.transaction_history) > 100:
            self.transaction_history = self.transaction_history[-100:]

    def detect_fraud(self, transactions: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
        """
        Analyze transactions for fraud using ML model and pattern analysis.
        """
        if self.model is None:
            self.load_model()

        results = []

        for tx in transactions:
            # Add to history
            self.add_transaction_to_history(tx)

            # Extract features
            amount = tx.get('amount', 0)
            user_id = tx.get('user_id', 'unknown')
            location = tx.get('location', 'unknown')
            transaction_type = tx.get('transaction_type', 'purchase')
            timestamp = tx.get('timestamp', datetime.now())

            # Calculate frequency (transactions in last 24 hours)
            recent_transactions = [
                t for t in self.transaction_history
                if (datetime.now() - t['timestamp']).total_seconds() < 86400  # 24 hours
            ]
            frequency = len(recent_transactions)

            # Time of day (0-24)
            if isinstance(timestamp, str):
                try:
                    timestamp = datetime.fromisoformat(timestamp.replace('Z', '+00:00'))
                except:
                    timestamp = datetime.now()

            time_of_day = timestamp.hour + timestamp.minute / 60

            # Location score (simplified - in real system would use geo data)
            location_score = hash(location) % 10 / 10  # Simple hash-based score

            # Category code
            category_map = {
                'purchase': 0, 'payment': 1, 'transfer': 2,
                'withdrawal': 3, 'deposit': 4, 'investment': 5
            }
            category_code = category_map.get(transaction_type.lower(), 0)

            # Amount velocity
            amount_velocity = amount / max(frequency, 1)

            # Time anomaly (distance from usual transaction times)
            usual_times = [t['timestamp'].hour + t['timestamp'].minute / 60 for t in recent_transactions[-10:]]
            time_anomaly = min([abs(time_of_day - ut) for ut in usual_times]) / 12 if usual_times else 0.5

            # Create feature vector
            features = pd.DataFrame([{
                'amount': amount,
                'frequency': frequency,
                'time_of_day': time_of_day,
                'location_score': location_score,
                'category_code': category_code,
                'amount_velocity': amount_velocity,
                'time_anomaly': time_anomaly
            }])

            # Get anomaly score from model
            anomaly_score = self.model.decision_function(features)[0]
            prediction = self.model.predict(features)[0]

            # Convert to risk score (0-100, higher = more fraudulent)
            risk_score = min(100, max(0, (-anomaly_score + 0.5) * 100))

            # Determine decision
            if risk_score > 70:
                decision = "block"
                explanation = "High risk transaction detected"
            elif risk_score > 40:
                decision = "review"
                explanation = "Suspicious transaction requires review"
            else:
                decision = "approve"
                explanation = "Transaction appears normal"

            results.append({
                "transaction": tx,
                "risk_score": risk_score,
                "decision": decision,
                "explanation": explanation,
                "anomaly_score": anomaly_score,
                "features_used": {
                    "amount": amount,
                    "frequency": frequency,
                    "time_of_day": time_of_day,
                    "location_score": location_score,
                    "category_code": category_code
                }
            })

        return results
        
        df = pd.DataFrame(features, columns=['amount', 'frequency', 'category_score', 'time_score'])
        predictions = self.model.predict(df)
        
        suspicious = []
        for i, pred in enumerate(predictions):
            if pred == -1:  # Anomaly
                suspicious.append({
                    'transaction': transactions[i],
                    'fraud_probability': 'High',
                    'reason': 'Unusual transaction pattern detected'
                })
        
        return suspicious

    def get_transaction_history(self):
        """Get the transaction history for display"""
        return self.transaction_history