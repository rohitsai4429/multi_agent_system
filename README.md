# Multi-Agent FinTech Financial Assistant

An AI-powered financial decision support platform built using Python, FastAPI, machine learning, and a multi-agent architecture. This comprehensive system helps users analyze their finances, predict risks, and make better financial decisions.

## 🚀 Features

### 1. **Financial Data Analysis**
- Analyze user income, expenses, and transactions to identify spending patterns, trends, and financial insights using pandas and statistical methods.

### 2. **Expense Tracking**
- Track where money is being spent, categorize expenses into essentials and non-essentials, and provide detailed breakdowns with percentages.

### 3. **Smart Budget Generation**
- Automatically generate a recommended monthly budget based on income, allocating funds to needs, wants, savings, and investments using the 50/30/20 rule.

### 4. **Financial Health Score**
- Calculate a comprehensive financial health score (0-100) based on savings ratio, debt-to-income ratio, spending patterns, and investment habits with detailed explanations.

### 5. **Financial Goal Planning**
- Allow users to set savings goals (house, car, emergency fund), calculate required monthly savings, and track progress with percentage completion.

### 6. **Risk Prediction**
- Use Random Forest ML model to predict financial risk levels (Low/Medium/High) based on income, expenses, credit score, loan amount, and savings data.

### 7. **Investment Assistance**
- Analyze stock market data using Yahoo Finance, predict trends, assess risk levels, and provide investment recommendations with growth potential estimates.

### 8. **Fraud Detection**
- Detect suspicious transactions using Isolation Forest ML model to identify anomalies in amount, frequency, category patterns, and timing.

### 9. **Personalized Financial Recommendations**
- Generate tailored advice on saving money, reducing expenses, debt management, and safer investment strategies based on individual financial data.

### 10. **Financial Alerts**
- Notify users when spending exceeds budget, risk levels increase, savings are low, or debt ratios are high with categorized alerts (warning, danger, info).

### 11. **Data Visualization Dashboard**
- Generate interactive charts for expense distribution (pie charts), savings trends (line charts), and financial health metrics using Matplotlib and JSON data.

### 12. **Multi-Agent System**
- Utilize 10 specialized AI agents (DataAgent, AnalysisAgent, RiskAgent, BudgetAgent, RecommendationAgent, GoalAgent, HealthScoreAgent, FraudDetectionAgent, InvestmentAgent, AlertAgent) coordinated by an Orchestrator.

### 13. **API-Based Backend**
- Provide RESTful API with 11 endpoints using FastAPI for seamless integration with frontend applications and external financial services.

### 14. **Scalable Architecture**
- Modular design allowing easy addition of new agents, financial services, and features without disrupting existing functionality.

## 🏗️ Architecture

### Backend (Python/FastAPI)
- **Framework**: FastAPI for high-performance APIs
- **ML Models**: Scikit-learn (Random Forest, Isolation Forest)
- **Data Processing**: Pandas, NumPy
- **Financial Data**: YFinance for stock market data
- **Visualization**: Matplotlib for chart generation

### Frontend (React/Vite)
- **Framework**: React 19 with Vite
- **Styling**: Tailwind CSS
- **State Management**: React hooks
- **API Integration**: Axios for backend communication

### Multi-Agent System
```
User Input → Orchestrator → Specialized Agents → Final Insights
                              ↓
                        ┌─────┴─────┐
                        │           │
                ┌───────▼─────┐ ┌───▼────┐
                │ DataAgent   │ │Analysis│
                │             │ │Agent   │
                └───────▲─────┘ └────────┘
                        │
                ┌───────▼─────┐
                │ RiskAgent   │
                └───────▲─────┘
                        │
          ┌─────────────┼─────────────┐
          │             │             │
   ┌──────▼─────┐ ┌─────▼────┐ ┌──────▼─────┐
   │BudgetAgent │ │GoalAgent │ │HealthScore │
   │            │ │          │ │Agent       │
   └────────────┘ └──────────┘ └────────────┘
          │             │             │
   ┌──────▼─────┐ ┌─────▼────┐ ┌──────▼─────┐
   │FraudDetect│ │Investment│ │ AlertAgent │
   │Agent       │ │Agent     │ │            │
   └────────────┘ └──────────┘ └────────────┘
```

## 📋 API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/analyze-expenses` | POST | Analyze user expenses and spending patterns |
| `/predict-risk` | POST | Predict financial risk using ML model |
| `/get-recommendations` | POST | Get personalized financial recommendations |
| `/full-analysis` | POST | Complete analysis using all agents |
| `/set-goal` | POST | Set and track financial goals |
| `/generate-budget` | POST | Generate smart monthly budget |
| `/health-score` | POST | Calculate financial health score |
| `/detect-fraud` | POST | Detect fraudulent transactions |
| `/analyze-stock/{symbol}` | GET | Analyze stock market data |
| `/dashboard-charts` | POST | Get visualization data for charts |
| `/generate-alerts` | POST | Generate financial alerts and notifications |

## 🚀 Installation & Setup

### Prerequisites
- Python 3.8+
- Node.js 16+
- npm or yarn

### Backend Setup
```bash
cd fintech_assistant
pip install -r requirements.txt
python main.py
```
Backend will run on `http://localhost:8000`

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
Frontend will run on `http://localhost:5173` (or next available port)

## 💡 Usage

### Sample API Request
```json
{
  "income": 50000,
  "expenses": {
    "rent": 1000,
    "food": 500,
    "entertainment": 300,
    "utilities": 200
  },
  "credit_score": 700,
  "loan_amount": 10000,
  "savings": 20000,
  "debts": 5000,
  "investments": 10000
}
```

### Frontend Features
- **Dashboard**: Overview of financial health, recent alerts, and key metrics
- **Expense Analysis**: Detailed spending breakdown and patterns
- **Risk Prediction**: ML-powered risk assessment with explanations
- **Budget Generator**: Automated budget creation with recommendations
- **Goal Planning**: Set and track financial goals
- **Health Score**: Comprehensive financial wellness scoring
- **Fraud Detection**: Transaction anomaly detection
- **Investment Analysis**: Stock market analysis and recommendations
- **Financial Alerts**: Real-time notifications and warnings

## 🤖 AI Agents

### Core Agents
- **DataAgent**: Processes and validates financial input data
- **AnalysisAgent**: Performs expense analysis and pattern recognition
- **RiskAgent**: Uses ML to predict financial risk levels
- **RecommendationAgent**: Generates personalized financial advice

### Specialized Agents
- **BudgetAgent**: Creates optimized budget allocations
- **GoalAgent**: Manages financial goal setting and tracking
- **HealthScoreAgent**: Calculates comprehensive financial health metrics
- **FraudDetectionAgent**: Identifies suspicious transaction patterns
- **InvestmentAgent**: Analyzes stock market data and trends
- **AlertAgent**: Monitors financial metrics and generates alerts

### Orchestrator
Coordinates all agents, manages workflow, and combines insights into comprehensive financial recommendations.

## 📊 Machine Learning Models

- **Risk Prediction**: Random Forest classifier trained on financial data
- **Fraud Detection**: Isolation Forest for anomaly detection
- **Pattern Recognition**: Statistical analysis for spending patterns
- **Trend Analysis**: Time-series analysis for financial trends

## 🔧 Technologies Used

### Backend
- **Python 3.8+**
- **FastAPI**: Modern, fast web framework
- **Scikit-learn**: Machine learning algorithms
- **Pandas**: Data manipulation and analysis
- **NumPy**: Numerical computing
- **YFinance**: Financial market data
- **Matplotlib**: Data visualization
- **Joblib**: Model serialization

### Frontend
- **React 19**: UI framework
- **Vite**: Build tool and dev server
- **Tailwind CSS**: Utility-first CSS framework
- **Axios**: HTTP client for API calls

## 📈 Project Structure

```
multi_agent_system/
├── fintech_assistant/          # Backend
│   ├── agents/                 # AI agents
│   │   ├── data_agent.py
│   │   ├── analysis_agent.py
│   │   ├── risk_agent.py
│   │   ├── recommendation_agent.py
│   │   ├── budget_agent.py
│   │   ├── goal_agent.py
│   │   ├── health_score_agent.py
│   │   ├── fraud_detection_agent.py
│   │   ├── investment_agent.py
│   │   ├── alert_agent.py
│   │   └── orchestrator.py
│   ├── models/                 # ML models
│   ├── utils/                  # Utilities
│   ├── main.py                 # FastAPI app
│   ├── requirements.txt        # Python dependencies
│   └── README.md
├── frontend/                   # React frontend
│   ├── src/
│   │   ├── components/         # Reusable components
│   │   ├── pages/             # Page components
│   │   ├── services/          # API services
│   │   └── App.jsx
│   ├── package.json
│   └── README.md
└── README.md                   # Main project README
```

## 🎯 Future Enhancements

- Real-time financial data integration
- Advanced portfolio optimization
- Cryptocurrency analysis
- Tax optimization recommendations
- Retirement planning
- Mobile app development
- Multi-currency support
- Integration with banking APIs

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

For questions or support, please open an issue on GitHub.

---

**Built with ❤️ for better financial decision-making**
- LLM Explanation Agent (Gemini, Groq, or HuggingFace)
- Audit Agent (Transaction storage & compliance logging)

✅ **LLM Integration** (Choose any 3)
- **Gemini** - Google's advanced reasoning model
- **Groq** - Ultra-fast inference API
- **HuggingFace** - Open-source models (Mistral, Llama, etc.)

✅ **Real Trained ML Model**
- Trained on 1.3M real credit card fraud transactions
- IsolationForest model: **AUC-ROC 0.8427**
- Persistent model loading for fast inference

✅ **Professional Dashboard**
- Transaction submission form
- Real-time fraud risk analysis
- Transaction history with filtering
- Analytics & insights
- System logs & audit trail

✅ **Production-Ready Backend**
- FastAPI async framework
- PostgreSQL integration (optional local data)
- Graceful fallbacks for Redis & rate limiting
- Comprehensive error handling

## 📁 Project Structure

```
fraud_detection_system/          # Backend (FastAPI)
  ├── app/
  │   ├── main.py               # FastAPI entry point
  │   ├── config.py             # Configuration
  │   ├── agents/               # Multi-agent system
  │   │   ├── transaction_agent.py
  │   │   ├── rule_fraud_agent.py
  │   │   ├── ml_anomaly_agent.py
  │   │   ├── risk_scoring_agent.py
  │   │   ├── explanation_agent.py   # LLM integration here
  │   │   └── audit_agent.py
  │   ├── models/
  │   │   └── trained/
  │   │       └── isolation_forest.pkl  # Pre-trained ML model
  │   └── schemas/
  │       └── transaction.py
  ├── data/
  │   ├── fraudTrain.csv        # 351MB training data
  │   └── fraudTest.csv         # 150MB test data
  └── requirements.txt

frontend/                         # React + Vite + Tailwind
  ├── src/
  │   ├── pages/
  │   │   ├── Dashboard.jsx
  │   │   ├── NewTransaction.jsx
  │   │   ├── TransactionHistory.jsx
  │   │   ├── Analytics.jsx
  │   │   └── SystemLogs.jsx
  │   ├── components/
  │   │   ├── Sidebar.jsx
  │   │   ├── TransactionForm.jsx
  │   │   ├── RiskCard.jsx
  │   │   ├── ExplanationPanel.jsx
  │   │   ├── TransactionTable.jsx
  │   │   └── RiskCharts.jsx
  │   ├── services/
  │   │   └── api.js              # Axios integration
  │   └── App.jsx
  └── package.json
```

## 🚀 Quick Start

### 1️⃣ Backend Setup

#### Option A: Using Gemini (Recommended)
```bash
cd fraud_detection_system

# Set environment variables
$env:GEMINI_API_KEY = "your-gemini-api-key"

# Install dependencies
pip install -r requirements.txt

# Run backend
python -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8001
```

#### Option B: Using Groq
```bash
cd fraud_detection_system

# Set environment variables
$env:GROQ_API_KEY = "your-groq-api-key"

# Install dependencies & run (same as above)
```

#### Option C: Using HuggingFace
```bash
cd fraud_detection_system

# Set environment variables
$env:HUGGINGFACE_API_KEY = "your-huggingface-api-key"

# Install dependencies & run (same as above)
```

### 2️⃣ Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Run development server
npm run dev
```

The frontend runs on **http://localhost:5173**

## 🔑 API Keys Setup

### Gemini (Google AI)
1. Visit: https://aistudio.google.com/app/apikeys
2. Create new API key
3. Set environment variable: `GEMINI_API_KEY=your-key`

### Groq
1. Visit: https://console.groq.com/keys
2. Create new API key
3. Set environment variable: `GROQ_API_KEY=your-key`

### HuggingFace
1. Visit: https://huggingface.co/settings/tokens
2. Create new token (with API read access)
3. Set environment variable: `HUGGINGFACE_API_KEY=your-token`

## 📊 API Endpoints

### Health Check
```
GET /health
```

### Process Transaction
```
POST /transaction/process
Content-Type: application/json

{
  "user_id": "USR-ABC123",
  "amount": 250.50,
  "currency": "INR",
  "location": "New York, NY",
  "device_id": "DEVICE-XYZ",
  "transaction_type": "purchase",
  "merchant_id": "AMZN-001",
  "card_last_4": "4242"
}
```

**Response:**
```json
{
  "transaction_id": "550e8400-e29b-41d4-a716-446655440000",
  "user_id": "USR-ABC123",
  "amount": 250.50,
  "rule_score": 25,
  "ml_score": 12,
  "final_score": 45,
  "decision": "APPROVE",
  "explanation_text": "This transaction appears legitimate...",
  "triggered_rules": [...],
  "processing_time_ms": 542.3
}
```

## 🤖 LLM Integration Details

### Explanation Agent Priority
The system automatically tries LLMs in this order:
1. **Gemini** (if `GEMINI_API_KEY` set)
2. **Groq** (if `GROQ_API_KEY` set)
3. **HuggingFace** (if `HUGGINGFACE_API_KEY` set)

If none are configured, the system uses fallback template explanations.

### Sample Prompt
```
Explain why this transaction (amount: ₹250.50, location: New York, NY) 
was scored 45 out of 100 (low risk - APPROVE):
- Rule violations: 25 points
- ML anomaly: 12 points
- Triggered rules: None
```

## 📈 Transaction Flow

```
User Input
    ↓
Rule Fraud Agent (0-70 pts) ──→ Checks against fraud rules
    ↓
ML Anomaly Agent (0-30 pts) ──→ IsolationForest model prediction
    ↓
Risk Scoring Agent ──→ Combines rule + ML → Final Score (0-100)
    ↓
Decision: APPROVE / REVIEW / BLOCK
    ↓
Explanation Agent ──→ LLM generates human-readable explanation
    ↓
Audit Agent ──→ Store transaction & log results
    ↓
Response to Frontend
```

## 🧪 Test Endpoints

### Using cURL
```bash
curl -X POST "http://127.0.0.1:8001/transaction/process" \
  -H "Content-Type: application/json" \
  -d '{
    "user_id": "user_123",
    "amount": 199.99,
    "currency": "INR",
    "location": "New York, NY",
    "device_id": "device_abc",
    "transaction_type": "purchase",
    "merchant_id": "AMZN-001",
    "card_last_4": "4242"
  }'
```

### Using Python
```python
import requests

response = requests.post(
    "http://localhost:8001/transaction/process",
    json={
        "user_id": "user_123",
        "amount": 199.99,
        "currency": "INR",
        "location": "New York, NY",
        "device_id": "device_abc",
        "transaction_type": "purchase",
        "merchant_id": "AMZN-001",
        "card_last_4": "4242"
    }
)
print(response.json())
```

## 📊 ML Model Info

- **Algorithm:** IsolationForest (anomaly detection)
- **Training Data:** 1.3M real credit card transactions
- **Test AUC-ROC:** 0.8427
- **Training AUC-ROC:** 0.8349
- **Model Size:** ~2MB
- **Inference Time:** <100ms per transaction

## 🛠️ Tech Stack

**Backend:**
- FastAPI (async REST API)
- SQLAlchemy (ORM)
- Pydantic (data validation)
- scikit-learn (ML models)
- Gemini/Groq/HuggingFace APIs (LLM explanations)

**Frontend:**
- React 19+
- Vite (build tool)
- TailwindCSS (styling)
- Axios (HTTP client)

**Data:**
- PostgreSQL (optional transaction storage)
- Redis (optional caching)

## 📝 Example Outputs

### High Risk Transaction (Block)
```
Amount: ₹5,000
Location: Angola (unusual)
Decision: BLOCK (Risk: 89/100)

Explanation: "This transaction exceeds typical spending patterns for 
this user. The high amount combined with a location in Angola (where 
the user has no history) triggered multiple fraud rules. The ML model 
also detected this as an anomalous pattern."
```

### Normal Transaction (Approve)
```
Amount: ₹45.99
Location: New York, NY (home)
Decision: APPROVE (Risk: 15/100)

Explanation: "This transaction appears legitimate. The amount is within 
the user's normal spending range, and the location matches the user's 
registered address. No fraud rules were triggered."
```

## 🔐 Security

- Transaction IDs: UUID v4
- Error messages: Non-revealing (for security)
- Optional database encryption for sensitive data
- Audit logging for compliance (SOC2, PCI-DSS)
- Role-based access control ready

## 📞 Support

For issues or questions:
1. Check `fraud_detection_system/README.md` for detailed documentation
2. Check `fraud_detection_system/QUICKSTART.md` for setup guide
3. Review agent implementations in `fraud_detection_system/app/agents/`

## 📄 License

MIT License - See LICENSE file

---

**The system is now clean, modern, and ready for production fraud detection!** 🎉
