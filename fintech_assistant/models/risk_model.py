import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
import joblib
import os

class RiskModel:
    def __init__(self):
        self.model = None
        self.le = LabelEncoder()
        self.model_path = 'models/risk_model.pkl'

    def train_model(self):
        # Synthetic data for training
        data = {
            'income': [50000, 60000, 30000, 80000, 40000, 70000, 20000, 90000, 35000, 55000],
            'total_expenses': [30000, 40000, 25000, 50000, 35000, 45000, 20000, 60000, 30000, 40000],
            'credit_score': [700, 750, 600, 800, 650, 720, 550, 850, 620, 680],
            'loan_amount': [10000, 15000, 5000, 20000, 8000, 18000, 3000, 25000, 6000, 12000],
            'savings': [20000, 25000, 5000, 30000, 10000, 28000, 2000, 35000, 8000, 18000],
            'risk': ['Low', 'Low', 'Medium', 'Low', 'Medium', 'Low', 'High', 'Low', 'Medium', 'Low']
        }
        df = pd.DataFrame(data)
        X = df.drop('risk', axis=1)
        y = self.le.fit_transform(df['risk'])

        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

        self.model = RandomForestClassifier(n_estimators=100, random_state=42)
        self.model.fit(X_train, y_train)

        # Save model
        joblib.dump(self.model, self.model_path)
        joblib.dump(self.le, 'models/label_encoder.pkl')

    def load_model(self):
        if os.path.exists(self.model_path):
            self.model = joblib.load(self.model_path)
            self.le = joblib.load('models/label_encoder.pkl')
        else:
            self.train_model()

    def predict_risk(self, features: pd.DataFrame) -> str:
        if self.model is None:
            self.load_model()
        prediction = self.model.predict(features)
        risk_label = self.le.inverse_transform(prediction)[0]
        return risk_label