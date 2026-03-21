# Multi-Agent FinTech Financial Assistant

[![Python](https://img.shields.io/badge/Python-3.8+-blue.svg)](https://www.python.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.104.1-green.svg)](https://fastapi.tiangolo.com/)
[![React](https://img.shields.io/badge/React-19.2.0-blue.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-rolldown--vite@7.2.5-purple.svg)](https://vitejs.dev/)
[![Scikit-learn](https://img.shields.io/badge/Scikit--learn-1.3.2-orange.svg)](https://scikit-learn.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.19-38B2AC.svg)](https://tailwindcss.com/)

An AI-powered, full-stack financial decision support platform built with a sophisticated multi-agent architecture. This comprehensive system integrates machine learning, real-time financial data, and personalized AI recommendations to help users manage finances, predict risks, detect fraud, and achieve financial goals.

## 📋 Table of Contents

- [🎯 Executive Summary](#-executive-summary)
- [🚀 Key Features](#-key-features)
- [🏗️ System Architecture](#️-system-architecture)
- [🛠️ Technology Stack](#️-technology-stack)
- [📦 Installation & Setup](#-installation--setup)
- [💻 Usage Guide](#-usage-guide)
- [🔌 API Reference](#-api-reference)
- [📊 Data Models](#-data-models)
- [⚙️ Configuration](#️-configuration)
- [🔧 Troubleshooting](#-troubleshooting)
- [📁 Project Structure](#-project-structure)
- [🚀 Future Enhancements](#-future-enhancements)
- [📄 License](#-license)
- [🤝 Contributing](#-contributing)

## 🎯 Executive Summary

The Multi-Agent FinTech Financial Assistant is a cutting-edge financial management platform that leverages:

- **11 Specialized AI Agents**: Each handling distinct financial tasks from expense analysis to fraud detection
- **Hybrid AI/ML Approach**: Combines Google Gemini, Groq LLMs with Scikit-learn models for robust predictions
- **Real-time Financial Data**: Yahoo Finance integration for stock analysis and market insights
- **Comprehensive Risk Assessment**: Multi-model risk prediction with AI-powered explanations
- **Interactive Web Interface**: Modern React 19 frontend with responsive design
- **RESTful API Backend**: FastAPI-powered microservices with automatic documentation

The system processes user financial data through a coordinated agent pipeline, providing personalized insights, risk assessments, budget recommendations, and fraud detection in real-time.

## 🚀 Key Features

### Core Financial Analysis
- **Expense Pattern Recognition**: Categorizes spending into essentials/non-essentials with percentage breakdowns
- **Smart Budget Generation**: 50/30/20 rule-based budget allocation (50% needs, 30% wants, 20% savings/investments)
- **Financial Health Scoring**: 0-100 health metric based on savings ratio, debt levels, and spending habits
- **Goal Planning & Tracking**: Set savings targets with monthly contribution calculations and progress monitoring

### AI-Powered Intelligence
- **Risk Prediction Engine**: Dual-model approach using AI (Gemini/Groq) + ML (RandomForest) for financial risk assessment
- **Personalized Recommendations**: Context-aware financial advice based on user profile and risk level
- **Fraud Detection System**: IsolationForest ML model analyzing 7-dimensional transaction features
- **Investment Analysis**: Stock trend analysis with volatility assessment and buy/hold/sell recommendations

### Advanced Capabilities
- **Multi-Agent Orchestration**: 11 specialized agents working in coordinated workflows
- **Real-time Alerts**: Categorized notifications for budget overruns, high risk levels, and savings opportunities
- **Data Visualization**: Interactive charts for expense distribution and savings trends
- **Transaction Security**: Anomaly detection with approve/review/block decisions
- **Scalable Architecture**: Modular design for easy extension with new financial services

### Technical Excellence
- **High-Performance Backend**: FastAPI with async processing and automatic API documentation
- **Modern Frontend**: React 19 with Vite, Tailwind CSS, and responsive design
- **Machine Learning Pipeline**: Automated model training, persistence, and inference
- **External API Integration**: Yahoo Finance, Google Gemini, Groq LLM services
- **Comprehensive Error Handling**: Graceful degradation and fallback mechanisms

## 🏗️ System Architecture

### Overall Architecture Pattern

```
┌─────────────────────────────────────────────────────────────┐
│                    Frontend (React 19/Vite)                 │
│  ┌──────────────────────────────────────────────────────┐   │
│  │ Pages: Dashboard, Analysis, Risk, Budget, Goals etc  │   │
│  │ Components: Sidebar, RiskCard, TransactionForm       │   │
│  │ State Management: React Context (AuthContext)        │   │
│  │ HTTP Client: Axios (fintechApi)                      │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                            ↑ ↓ (REST API)
┌─────────────────────────────────────────────────────────────┐
│              Backend (Python/FastAPI/Uvicorn)               │
│  ┌──────────────────────────────────────────────────────┐   │
│  │                   Orchestrator                       │   │
│  │         (Coordinates multi-agent workflows)          │   │
│  └──────────────────────────────────────────────────────┘   │
│         ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓                             │
│  ┌─────────────────────────────────────────────────────┐    │
│  │              Specialized Agents (11 total)          │    │
│  ├─────────────────────────────────────────────────────┤    │
│  │ • DataAgent: Data collection & preprocessing         │    │
│  │ • AnalysisAgent: Expense analysis & insights         │    │
│  │ • RiskAgent: Risk prediction (AI + ML hybrid)       │    │
│  │ • BudgetAgent: Smart 50/30/20 budget generation     │    │
│  │ • RecommendationAgent: Personalized advice          │    │
│  │ • GoalAgent: Goal setting & progress tracking       │    │
│  │ • HealthScoreAgent: Financial health metrics        │    │
│  │ • FraudDetectionAgent: Anomaly detection (ML)       │    │
│  │ • InvestmentAgent: Stock analysis (Yahoo Finance)   │    │
│  │ • AlertAgent: Alert generation & notifications      │    │
│  │ • DashboardGenerator: Chart generation (Matplotlib) │    │
│  └─────────────────────────────────────────────────────┘    │
│         ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓                             │
│  ┌─────────────────────────────────────────────────────┐    │
│  │           ML Models & Data Processing               │    │
│  ├─────────────────────────────────────────────────────┤    │
│  │ • RandomForestClassifier (Risk Prediction)          │    │
│  │ • IsolationForest (Fraud Detection)                 │    │
│  │ • Pandas DataFrames (Data manipulation)             │    │
│  │ • NumPy (Numerical computations)                    │    │
│  │ • Joblib (Model serialization/persistence)          │    │
│  │ • External APIs: Yahoo Finance, Google Gemini, Groq │    │
│  └─────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
```

### Multi-Agent System Design

The platform employs an **agent-based architecture** where specialized agents handle distinct financial tasks:

**Agent Orchestration Flow:**
1. User submits financial data via Frontend
2. Orchestrator receives request and creates execution pipeline
3. DataAgent validates and preprocesses the data
4. Multiple agents work in parallel or sequence based on requirements
5. Results are aggregated and returned to Frontend

**Agent Communication:**
- Agents communicate through structured Python objects (Pydantic models)
- State flows through the orchestrator pipeline
- Each agent is independent but can access shared processed data

### Backend Stack Deep Dive

**Framework Layer:**
- **FastAPI**: High-performance async web framework with automatic OpenAPI documentation
- **Uvicorn**: ASGI server for serving the FastAPI application
- **Pydantic**: Data validation using BaseModel classes (UserData, GoalData, TransactionData)

**CORS Configuration:**
- Allowed origins: `http://localhost:5173`, `5174`, `5175`, `5176` (Frontend dev/build ports)
- Credentials enabled for authentication
- All HTTP methods and headers allowed for flexibility

**Data Processing:**
- **Pandas**: DataFrames for financial data manipulation and analysis
- **NumPy**: Numerical operations, synthetic data generation for ML training

**Machine Learning:**
- **Scikit-learn**: RandomForestClassifier (risk prediction), IsolationForest (fraud detection)
- **Joblib**: Model persistence and loading from `.pkl` files

**AI Integration (Triple-Provider Strategy):**
- **Primary**: Google Gemini API (gemini-pro model) for detailed risk analysis
- **Secondary**: Groq API (llama3-70b-8192 model) for fast LLM responses
- **Fallback**: Rule-based predictions when APIs unavailable

**Financial Data:**
- **YFinance**: Real-time stock data, historical prices, technical indicators

**Visualization:**
- **Matplotlib**: Generates PNG charts (pie charts, line charts) as Base64-encoded data URIs

### Frontend Stack Deep Dive

**Build & Runtime:**
- **Vite**: Lightning-fast build tool and dev server using rolldown instead of esbuild
- **React 19**: Latest React with functional components, hooks, and new features
- **React DOM**: DOM rendering

**Styling:**
- **Tailwind CSS 3.4**: Utility-first CSS framework for responsive design
- **PostCSS**: CSS transformations with autoprefixer for vendor compatibility

**HTTP Communication:**
- **Axios 1.13**: HTTP client with two instances:
  - `fintechApi`: Main financial API endpoint (localhost:8000)
  - `fraudApi`: Fraud detection endpoint (localhost:8001, defined but not primarily used)

**State Management:**
- **React Context API**: AuthContext.jsx for authentication state management
- **React Hooks**: useState for component state, useContext for context consumption

**Routing:**
- Manual routing via conditional rendering based on `currentPage` state
- No React Router (kept simple for this prototype)

**Code Quality:**
- **ESLint 9.39**: Linting with React plugins and custom rules
- **React Hooks Plugin**: Ensures hooks are called correctly
- **React Refresh Plugin**: Hot module reloading in development

## 🛠️ Technology Stack

### Backend (Python 3.x)

| Category | Technology | Version | Purpose |
|----------|-----------|---------|---------|
| **Web Framework** | FastAPI | Latest | REST API, auto OpenAPI docs |
| **ASGI Server** | Uvicorn | Latest | Application server |
| **Validation** | Pydantic | Latest | Type validation, serialization |
| **Data Processing** | Pandas | Latest | DataFrames, data manipulation |
| **Numerical** | NumPy | Latest | Arrays, ML data preparation |
| **ML - Classification** | Scikit-learn | Latest | RandomForest, IsolationForest |
| **Model Persistence** | Joblib | Latest | Serialize .pkl files |
| **HTTP Client** | Requests | Latest | External API calls |
| **Financial Data** | YFinance | Latest | Yahoo Finance data |
| **Visualization** | Matplotlib | Latest | Chart generation as PNG/Base64 |
| **AI - Primary** | google-generativeai | Latest | Google Gemini API |
| **AI - Secondary** | Groq | Latest | Groq LLM API |
| **NLP/Transformer** | Transformers | Latest | Future NLP capabilities |
| **Deep Learning** | PyTorch | Latest | Future ML enhancements |

**Dependencies File**: [fintech_assistant/requirements.txt](fintech_assistant/requirements.txt)
```
fastapi
pandas
numpy
scikit-learn
uvicorn
pydantic
joblib
yfinance
matplotlib
google-generativeai
groq
transformers
torch
requests
```

### Frontend (JavaScript/Node.js)

| Category | Technology | Version | Purpose |
|----------|-----------|---------|---------|
| **Framework** | React | 19.2.0 | UI components, hooks |
| **ReactDOM** | react-dom | 19.2.0 | DOM rendering |
| **Build Tool** | Vite | rolldown-vite@7.2.5 | Lightning-fast bundler |
| **CSS Framework** | Tailwind CSS | 3.4.19 | Utility-first styling |
| **CSS Processor** | PostCSS | 8.5.6 | CSS transformations |
| **Vendor Prefixes** | Autoprefixer | 10.4.23 | Cross-browser compatibility |
| **HTTP Client** | Axios | 1.13.2 | API requests |
| **Linter** | ESLint | 9.39.1 | Code quality |
| **React Hooks Plugin** | eslint-plugin-react-hooks | 7.0.1 | Hooks best practices |
| **React Refresh** | eslint-plugin-react-refresh | 0.4.24 | Hot reloading |
| **TypeScript Defs** | @types/react | 19.2.5 | Type hints for IDE |
| **TypeScript Defs** | @types/react-dom | 19.2.3 | DOM type hints |

**Package Configuration**: [frontend/package.json](frontend/package.json)

### Environment Variables Required

```plaintext
# .env file (fintech_assistant root)
GEMINI_API_KEY=<your-google-generativeai-key>
GROQ_API_KEY=<your-groq-api-key>
OPEN_ROUTER_API_KEY=<optional-openrouter-key>
DATABASE_URL=<optional-postgres-url>
REDIS_URL=<optional-redis-url>
```

## 📦 Installation & Setup

### Prerequisites
- Python 3.8+ (for backend)
- Node.js 16+ (for frontend)
- pip (Python package manager)
- npm (Node package manager)
- Git

### Backend Setup (Python/FastAPI)

**Step 1: Navigate to Backend Directory**
```bash
cd fintech_assistant
```

**Step 2: Create Virtual Environment** (Recommended)
```bash
# Windows
python -m venv venv
venv\Scripts\activate

# Linux/Mac
python -m venv venv
source venv/bin/activate
```

**Step 3: Install Dependencies**
```bash
pip install -r requirements.txt
```

**Step 4: Configure Environment Variables**
```bash
# Create .env file in fintech_assistant/
GEMINI_API_KEY=your_gemini_api_key_here
GROQ_API_KEY=your_groq_api_key_here
OPEN_ROUTER_API_KEY=your_openrouter_key_here
```

**Step 5: Create Models Directory (if not exists)**
```bash
mkdir -p models
```

**Step 6: Run FastAPI Server**
```bash
# Development with auto-reload
uvicorn main:app --reload

# Or specify host and port
uvicorn main:app --host 0.0.0.0 --port 8000

# Production mode (without reload)
uvicorn main:app --host 0.0.0.0 --port 8000 --workers 4
```

**Server runs at**: `http://localhost:8000`
**API Documentation**: `http://localhost:8000/docs` (Swagger UI)
**Alternative Docs**: `http://localhost:8000/redoc` (ReDoc)

### Frontend Setup (React/Vite)

**Step 1: Navigate to Frontend Directory**
```bash
cd frontend
```

**Step 2: Install Dependencies**
```bash
npm install
```

**Step 3: Configure API Endpoint** (if backend on different port)
Edit [src/services/api.js](frontend/src/services/api.js):
```javascript
const FINTECH_API_BASE_URL = 'http://localhost:8000';
```

**Step 4: Run Development Server**
```bash
npm run dev
```

**Development server runs at**: `http://localhost:5173`

**Step 5: Build for Production** (Optional)
```bash
npm run build
# Output in 'dist/' directory

npm run preview  # Preview production build locally
```

### Verification Checklist

After setup, verify:
- [ ] Backend running on `http://localhost:8000`
- [ ] `/docs` API docs accessible
- [ ] Frontend running on `http://localhost:5173`
- [ ] Frontend loads without console errors
- [ ] API requests from frontend to backend succeed
- [ ] ML models create .pkl files in `models/` directory
- [ ] No 401/403 errors (unless auth required)

## 💻 Usage Guide

### Using the Web Interface

**Login/Signup**
1. Navigate to `http://localhost:5173`
2. Create new account (Signup) or use credentials
3. Authentication state managed via AuthContext

**Main Dashboard**
1. Default page after login
2. Shows financial overview
3. Can update userData directly
4. Displays key metrics

**Navigation**
- **Sidebar**: Collapsible navigation menu with 9 financial modules
- Modules accessible from sidebar:
  - Dashboard
  - Expense Analysis
  - Risk Prediction
  - Budget Generator
  - Goal Planning
  - Health Score
  - Fraud Detection
  - Investment Analysis
  - Financial Alerts

**Workflow Example: Complete Financial Analysis**
1. **Dashboard**: Enter income, expenses, credit score, savings
2. **Expense Analysis**: View categorized spending breakdown
3. **Risk Prediction**: See AI-powered financial risk assessment
4. **Budget Generator**: Get 50/30/20 budget recommendations
5. **Health Score**: Calculate 0-100 financial health rating
6. **Goal Planning**: Set savings goals with monthly targets
7. **Financial Alerts**: Receive tailored financial warnings
8. **Fraud Detection**: Upload transactions for security check
9. **Investment Analysis**: Analyze stocks and trends

### Using the REST API Directly

**Via cURL (Windows PowerShell)**
```powershell
# Full analysis
$body = @{
    income = 50000
    expenses = @{rent=15000; groceries=8000; entertainment=3000}
    credit_score = 750
    loan_amount = 0
    savings = 20000
} | ConvertTo-Json

Invoke-WebRequest -Uri "http://localhost:8000/full-analysis" `
  -Method POST `
  -Headers @{"Content-Type"="application/json"} `
  -Body $body
```

**Via Python (requests)**
```python
import requests

url = "http://localhost:8000/full-analysis"
data = {
    "income": 50000,
    "expenses": {"rent": 15000, "groceries": 8000},
    "credit_score": 750,
    "loan_amount": 0,
    "savings": 20000
}
response = requests.post(url, json=data)
print(response.json())
```

**Via Axios (JavaScript)**
```javascript
const axios = require('axios');

const data = {
    income: 50000,
    expenses: {rent: 15000, groceries: 8000},
    credit_score: 750,
    loan_amount: 0,
    savings: 20000
};

axios.post('http://localhost:8000/full-analysis', data)
    .then(response => console.log(response.data))
    .catch(error => console.error(error));
```

### Common Use Cases

#### Use Case 1: Personal Financial Assessment
```
1. POST /analyze-expenses → Understand spending
2. POST /predict-risk → Know financial risk level
3. POST /health-score → Get health score
4. POST /get-recommendations → Get advice
```

#### Use Case 2: Goal-Based Planning
```
1. POST /set-goal → Define savings target
2. POST /generate-budget → Get budget plan
3. Track progress with periodic `/set-goal` calls
```

#### Use Case 3: Investment Decision Making
```
1. GET /analyze-stock/AAPL → Analyze stock
2. GET /analyze-stock/GOOGL → Compare with another
3. POST /get-recommendations → Get investment advice based on risk
```

#### Use Case 4: Transaction Security
```
1. POST /detect-fraud → Check multiple transactions
2. POST /process-transaction → Single transaction decision
3. GET /transaction-history → View checked transactions
```

## 🔌 API Reference

### Complete Endpoint Listing with Details

| # | Endpoint | Method | Purpose | Input | Output |
|---|----------|--------|---------|-------|--------|
| 1 | `/analyze-expenses` | POST | Expense analysis and categorization | UserData | Analysis dict with breakdowns |
| 2 | `/predict-risk` | POST | Financial risk prediction (AI+ML) | UserData | Risk level, confidence, factors |
| 3 | `/get-recommendations` | POST | Generate personalized recommendations | UserData | List of tailored recommendations |
| 4 | `/full-analysis` | POST | Complete orchestrated multi-agent analysis | UserData | Combined insights from all agents |
| 5 | `/set-goal` | POST | Set and track financial goals | GoalData | Goal details with calculations |
| 6 | `/generate-budget` | POST | Generate 50/30/20 smart budget | UserData | Budget breakdowns and recommendations |
| 7 | `/health-score` | POST | Calculate financial health (0-100) | UserData | Score, explanation, ratios |
| 8 | `/detect-fraud` | POST | Batch fraud detection on transactions | Transactions | List of suspicious transactions |
| 9 | `/process-transaction` | POST | Single transaction fraud check + decision | TransactionData | Decision (approve/review/block) |
| 10 | `/analyze-stock/{symbol}` | GET | Stock analysis and trends | Query: period | Price trends, volatility, recommendation |
| 11 | `/dashboard-charts` | POST | Generate chart data for visualization | UserData + savings_history | Pie and line chart JSON data |
| 12 | `/generate-alerts` | POST | Generate financial alerts | UserData + budget | List of categorized alerts |
| 13 | `/transaction-history` | GET | Retrieve user transaction history | None | Historical transactions list |

### Detailed Endpoint Examples

#### 1. POST `/analyze-expenses`
**Purpose**: Analyze spending patterns and provide insights
**Request**:
```json
{
  "income": 50000,
  "expenses": {"rent": 15000, "groceries": 8000, ...},
  "credit_score": 750,
  "loan_amount": 0,
  "savings": 20000
}
```

#### 2. POST `/predict-risk`
**Purpose**: Predict financial risk using AI (Gemini/Groq) + ML (RandomForest)
**Processing**:
- Queries AI service for detailed risk analysis
- Falls back to ML model if AI unavailable
- Returns dual-model results for comparison

#### 3. POST `/full-analysis`
**Purpose**: Execute complete multi-agent workflow
**Execution Order**:
1. Data processing
2. Expense analysis
3. Risk prediction
4. Recommendation generation
5. Return aggregated results

#### 4. GET `/analyze-stock/{symbol}?period=1y`
**Purpose**: Analyze stock and predict investment recommendation
**Example**: `/analyze-stock/AAPL?period=1y`
**Returns**: Current price, trend, volatility, risk level, recommendation

#### 5. POST `/process-transaction`
**Purpose**: Single transaction fraud check with decision
**Decision Logic**:
- Risk <30: Approve
- Risk 30-60: Review
- Risk >60: Block

## 📊 Data Models

### Core Pydantic Models (main.py)

#### **UserData Model**
```python
class UserData(BaseModel):
    income: float                      # Monthly income in currency units
    expenses: Dict[str, float]        # Expense categories -> amounts
    credit_score: int                 # Credit score (typically 300-850)
    loan_amount: float                # Outstanding loan amount
    savings: float                    # Current savings amount
    debts: float = 0                  # Total debts (optional)
    investments: float = 0            # Investment amount (optional)
```

**Example**:
```json
{
  "income": 50000,
  "expenses": {
    "rent": 15000,
    "groceries": 8000,
    "transportation": 5000,
    "entertainment": 3000,
    "utilities": 4000
  },
  "credit_score": 750,
  "loan_amount": 0,
  "savings": 20000,
  "debts": 0,
  "investments": 50000
}
```

#### **GoalData Model**
```python
class GoalData(BaseModel):
    goal_name: str                    # Name of financial goal
    target_amount: float              # Target amount to reach
    current_savings: float            # Current progress towards goal
    timeframe_months: int             # Duration to achieve goal
```

#### **TransactionData Model**
```python
class TransactionData(BaseModel):
    amount: float                     # Transaction amount
    date: str                         # Date of transaction
    category: str                     # Transaction category
    description: str = ""             # Optional description
    merchant: str = ""                # Optional merchant name
```

#### **Transactions Model** (Batch)
```python
class Transactions(BaseModel):
    transactions: List[Dict[str, Any]]  # List of transaction objects
```

### Agent Response Models

#### **Analysis Response**
```python
{
  "total_income": 50000,
  "total_expenses": 35000,
  "net_savings": 15000,
  "expense_breakdown": [
    {
      "category": "rent",
      "amount": 15000,
      "percentage": 42.86
    }
  ],
  "essential_expenses": 32000,
  "non_essential_expenses": 3000,
  "high_spending_areas": ["rent"],
  "saving_suggestions": [
    "Aim to save at least 20% of your income...",
  ],
  "budget_recommendations": {
    "essentials": 25000,
    "wants": 15000,
    "savings": 10000
  },
  "spending_patterns": {
    "average_transaction": 7000,
    "largest_category": "rent",
    "expense_to_income_ratio": 70.0,
    "categories_count": 5
  }
}
```

#### **Risk Response**
```python
{
  "risk_level": "LOW",
  "explanation": "Low financial risk with good balance...",
  "confidence": 78,
  "risk_factors": "Stable income, good savings ratio...",
  "ai_powered": true,
  "ml_backup": {
    "risk_level": "LOW",
    "risk_factors": [...]
  }
}
```

#### **Health Score Response**
```python
{
  "score": 72,
  "explanation": "Savings: 40.0%, Debt-to-Income: 0.0%, Expenses: 70.0%, Investments: 100.0%",
  "details": {
    "savings_ratio": 40.0,
    "debt_to_income_ratio": 0.0,
    "expense_ratio": 70.0,
    "investment_ratio": 100.0
  }
}
```

#### **Fraud Detection Response**
```python
{
  "transaction": {
    "amount": 5000,
    "date": "2024-03-21",
    "category": "purchase",
  },
  "risk_score": 25,
  "decision": "approve",
  "explanation": "Transaction appears normal",
  "anomaly_score": -0.5,
  "features_used": {
    "amount": 5000,
    "frequency": 2,
    "time_of_day": 14.5,
    "location_score": 0.7,
    "category_code": 0
  }
}
```

#### **Stock Analysis Response**
```python
{
  "symbol": "AAPL",
  "current_price": 150.25,
  "average_price": 145.30,
  "volatility": 8.75,
  "trend": "Upward",
  "risk_level": "Medium",
  "growth_potential": 5.2,
  "recommendation": "Buy"
}
```

## ⚙️ Configuration

### Environment Configuration

**Backend (.env file)**
```plaintext
# AI Service Keys
GEMINI_API_KEY=your-google-generativeai-key
GROQ_API_KEY=your-groq-api-key
OPEN_ROUTER_API_KEY=your-openrouter-key

# Optional Database (Future)
DATABASE_URL=postgresql://user:password@localhost/dbname
REDIS_URL=redis://localhost:6379/0
```

**Frontend (frontend/src/services/api.js)**
```javascript
// API Endpoints Configuration
const FINTECH_API_BASE_URL = 'http://localhost:8000';
const FRAUD_API_BASE_URL = 'http://localhost:8001';
```

### FastAPI Configuration

**CORS Settings** (main.py)
```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",  # Primary frontend port
        "http://localhost:5174",  # Build output port
        "http://localhost:5175",  # Alternative port
        "http://localhost:5176"   # Backup port
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

### Machine Learning Configuration

**Risk Model** ([models/risk_model.py](fintech_assistant/models/risk_model.py))
- **Algorithm**: RandomForestClassifier
- **Parameters**: n_estimators: 100 trees, random_state: 42
- **Classes**: Low, Medium, High risk
- **Training**: Synthetic data with 10 samples
- **Persistence**: models/risk_model.pkl, models/label_encoder.pkl

**Fraud Model** ([agents/fraud_detection_agent.py](fintech_assistant/agents/fraud_detection_agent.py))
- **Algorithm**: IsolationForest
- **Parameters**: contamination: 0.1, random_state: 42
- **Features**: 7-dimensional (amount, frequency, time, location, category, velocity, anomaly)
- **Training**: 1000 synthetic transactions (900 normal, 100 fraudulent)
- **Persistence**: models/fraud_model.pkl
- **History**: Maintains 100 most recent transactions

### AI Service Configuration

**Priority Order**:
1. **Primary**: Google Gemini (gemini-pro model)
2. **Secondary**: Groq (llama3-70b-8192 model)
3. **Fallback**: Rule-based system

## 🔧 Troubleshooting

| Issue | Cause | Solution |
|-------|-------|----------|
| Backend won't start | Port 8000 in use | `lsof -i :8000` then kill process, or use different port |
| CORS errors | Frontend on wrong port | Check CORS origins in main.py match your frontend port |
| Gemini API errors | Invalid API key | Verify GEMINI_API_KEY in .env, regenerate from Google Cloud |
| Groq API errors | No Groq account | Create account at groq.com, add API key to .env |
| Models not found | First run, no training | Models auto-train on first request to endpoints |
| Frontend won't load | Vite dev server issues | Delete `node_modules`, `package-lock.json`, reinstall with `npm install` |
| No API responses | Backend not running | Check backend running: `uvicorn main:app --reload` |
| ESLint errors | Code style issues | Run `npm run lint -- --fix` to auto-fix |
| Stock analysis fails | Invalid ticker | Use valid Yahoo Finance symbols (AAPL, GOOGL, etc.) |
| Transaction history empty | No fraud detection run | Send transaction to `/process-transaction` first |

## 📁 Project Structure

```
multi_agent_system/
├── PROJECT_OVERVIEW.md                  # Project documentation
├── README.md                            # This file
├── TECH_STACK.md                        # Technology details
│
├── fintech_assistant/                   # Python Backend
│   ├── main.py                          # FastAPI app + 13 endpoints
│   ├── requirements.txt                 # 14 Python dependencies
│   │
│   ├── agents/                          # 11 Agent classes
│   │   ├── orchestrator.py              # Multi-agent coordinator
│   │   ├── data_agent.py                # Data collection & processing
│   │   ├── analysis_agent.py            # Expense analysis
│   │   ├── risk_agent.py                # AI + ML risk prediction
│   │   ├── budget_agent.py              # 50/30/20 budgeting
│   │   ├── recommendation_agent.py      # Personalized advice
│   │   ├── goal_agent.py                # Goal tracking
│   │   ├── health_score_agent.py        # 0-100 health metric
│   │   ├── fraud_detection_agent.py     # IsolationForest anomaly detection
│   │   ├── investment_agent.py          # Yahoo Finance stock analysis
│   │   └── alert_agent.py               # Financial alert generation
│   │
│   ├── models/                          # ML Models
│   │   ├── risk_model.py                # RandomForest classifier
│   │   ├── risk_model.pkl               # Serialized risk model
│   │   ├── label_encoder.pkl            # Risk label encoder
│   │   └── fraud_model.pkl              # Serialized fraud model
│   │
│   ├── utils/                           # Utility classes
│   │   ├── ai_assistant.py              # Gemini/Groq integration
│   │   └── dashboard.py                 # Chart generation
│   │
│   └── data/                            # Data storage (empty)
│
├── frontend/                            # React Frontend
│   ├── package.json                     # 3 deps, 12 devDeps
│   ├── vite.config.js                   # Vite configuration
│   ├── tailwind.config.js               # Tailwind CSS config
│   ├── postcss.config.js                # PostCSS config
│   ├── eslint.config.js                 # ESLint rules
│   │
│   ├── src/
│   │   ├── main.jsx                     # React app entry point
│   │   ├── App.jsx                      # Main app component
│   │   ├── App.css                      # App styling
│   │   │
│   │   ├── contexts/
│   │   │   └── AuthContext.jsx          # Authentication provider
│   │   │
│   │   ├── services/
│   │   │   └── api.js                   # Axios API wrapper
│   │   │
│   │   ├── pages/                       # 11 pages
│   │   │   ├── Dashboard.jsx
│   │   │   ├── ExpenseAnalysis.jsx
│   │   │   ├── RiskPrediction.jsx
│   │   │   ├── BudgetGenerator.jsx
│   │   │   ├── GoalPlanning.jsx
│   │   │   ├── HealthScore.jsx
│   │   │   ├── FraudDetection.jsx
│   │   │   ├── InvestmentAnalysis.jsx
│   │   │   ├── FinancialAlerts.jsx
│   │   │   ├── Login.jsx
│   │   │   └── Signup.jsx
│   │   │
│   │   ├── components/
│   │   │   ├── Sidebar.jsx              # Navigation sidebar
│   │   │   ├── RiskCard.jsx             # Risk display component
│   │   │   └── TransactionForm.jsx      # Transaction input
│   │   │
│   │   └── assets/                      # Static assets
│   │
│   ├── public/
│   │   ├── index.html                   # HTML template
│   │   └── data/                        # Public data
│   │
│   └── index.css                        # Global styles
```

## 🚀 Future Enhancements

1. **Database Integration**: PostgreSQL for persistent data storage
2. **Advanced ML**: Time series forecasting, portfolio optimization
3. **Mobile App**: React Native version for iOS/Android
4. **Real Bank Integration**: Open Banking APIs (Plaid, etc.)
5. **Advanced Auth**: OAuth 2.0, 2FA, role-based access
6. **Notifications**: Email/SMS alerts for important events
7. **Export Functionality**: PDF reports, CSV exports
8. **Comparative Analysis**: Compare against user demographics
9. **Recurring Bills**: Automatic bill tracking and prediction
10. **Tax Optimization**: Tax planning and optimization suggestions

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow PEP 8 for Python code
- Use ESLint rules for JavaScript/React
- Add tests for new features
- Update documentation for API changes
- Ensure all tests pass before submitting

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Built with ❤️ using Python, FastAPI, React, and cutting-edge AI/ML technologies.**

For questions or support, please open an issue on GitHub.
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
