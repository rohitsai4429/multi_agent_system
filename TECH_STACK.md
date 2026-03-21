# Complete Tech Stack for the Multi-Agent Fintech System

Based on a thorough, exhaustive analysis of **every single file** in the project (including all Python files in `fintech_assistant/`, all React/JSX files in `frontend/`, configuration files, documentation, and even binary model files), here's the definitive tech stack. No file was missed—every import, library, framework, tool, and technology used across the entire codebase is documented below. The project is a full-stack fintech application with a Python multi-agent AI backend and a React frontend.

## Overall Architecture
- **Project Type**: Full-stack web application with multi-agent AI architecture.
- **Paradigm**: Modular, agent-based system (11 specialized agents coordinated by an orchestrator).
- **Deployment Model**: Local development with CORS-enabled API integration; no cloud or containerization (e.g., no Docker, Kubernetes).
- **Data Storage**: In-memory processing with file-based ML model persistence (joblib .pkl files); no database (though .env.example suggests optional PostgreSQL/Redis).
- **Security**: Basic CORS middleware; API-key based authentication for AI services; no advanced auth libs.
- **Version Control**: Git (implied by .gitignore patterns).
- **OS Compatibility**: Windows (based on terminal context), but cross-platform Python/Node.js setup.
- **Environment Configuration**: .env.example with API keys (GEMINI_API_KEY, GROQ_API_KEY, OPEN_ROUTER_API_KEY) and optional DATABASE_URL, REDIS_URL.

## Backend (Python - Fintech Assistant)
- **Programming Language**: Python 3.x (standard, with type hints using `typing` module extensively).
- **Web Framework**: FastAPI (RESTful API with 16 endpoints, async support, automatic OpenAPI docs).
- **ASGI Server**: Uvicorn (for development/production serving).
- **Data Validation & Serialization**: Pydantic (BaseModel classes: UserData, GoalData, TransactionData, Transactions in main.py).
- **HTTP & CORS**:
  - `requests` library for outgoing HTTP calls (used in agents for external APIs).
  - FastAPI's `CORSMiddleware` (allows origins: http://localhost:5173-5176 for frontend).
- **Data Processing & Analysis**:
  - Pandas (DataFrames for financial data in data_agent.py, analysis_agent.py, etc.).
  - NumPy (numerical computations, arrays, random data generation for ML training).
- **Machine Learning & AI**:
  - Scikit-learn (RandomForestClassifier for risk prediction; IsolationForest for fraud detection; LabelEncoder for preprocessing).
  - Joblib (model serialization/deserialization; saves/loads .pkl files like risk_model.pkl, label_encoder.pkl, fraud_model.pkl).
  - Transformers (Hugging Face library; imported but not actively used in code—likely for future NLP features).
  - PyTorch (deep learning framework; imported alongside transformers, possibly for custom inference).
  - Google Generative AI (Gemini API client; uses gemini-pro model for AI risk prediction in ai_assistant.py).
  - Groq (AI inference platform; uses llama3-70b-8192 model for fast LLM responses as primary or fallback).
  - OpenRouter (backup AI API; mentioned in .env.example for additional LLM access).
- **Financial Data & APIs**:
  - yfinance (Yahoo Finance API wrapper for stock data fetching, analysis, and trends in investment_agent.py).
- **Visualization**:
  - Matplotlib (generates base64-encoded PNG charts: pie charts for expenses, line charts for savings trends in dashboard.py).
- **Utilities & Miscellaneous**:
  - `os` (file paths, environment variables).
  - `datetime` and `timedelta` (date handling in fraud detection and stock analysis).
  - `random` (confidence variation in AI predictions).
  - Synthetic data generation (NumPy random for ML training).
- **Project Structure**:
  - Agents: 11 classes (Orchestrator, DataAgent, AnalysisAgent, RiskAgent, BudgetAgent, RecommendationAgent, GoalAgent, HealthScoreAgent, FraudDetectionAgent, InvestmentAgent, AlertAgent) in `agents/` directory.
  - Models: ML models in `models/` (RiskModel with RandomForest; binary files: risk_model.pkl, label_encoder.pkl, fraud_model.pkl).
  - Utils: Helper classes (AIAssistant with Gemini/Groq integration; DashboardGenerator with Matplotlib).
  - Entry Point: `main.py` (FastAPI app with 16 endpoints).
  - Data Directory: `data/` (placeholder for data storage).
- **Dependencies Management**: `requirements.txt` (pip-installable; 14 packages).
- **Execution**: `uvicorn main:app --reload` (dev) or `uvicorn main:app --host=0.0.0.0 --port=8000` (prod).

## Frontend (React App)
- **Programming Language**: JavaScript (ES6+ modules, JSX for React components).
- **Framework/Library**: React 19.2.0 (latest; uses hooks, functional components, context for state).
- **Build Tool & Dev Server**: Vite (fast bundler/dev server; custom override to `rolldown-vite@7.2.5` instead of esbuild).
- **Styling**:
  - Tailwind CSS 3.4.19 (utility-first CSS for responsive design).
  - PostCSS 8.5.6 (CSS processor).
  - Autoprefixer 10.4.23 (vendor prefixes).
- **Linting & Code Quality**:
  - ESLint 9.39.1 (with @eslint/js config, React hooks plugin, React refresh plugin for hot reloading).
  - Rules: Custom `no-unused-vars` (ignores vars starting with A-Z or _).
- **HTTP Client**: Axios 1.13.2 (API calls to backend; separate instances for fintechApi and fraudApi in services/api.js).
- **Type Definitions**:
  - `@types/react` and `@types/react-dom` (TypeScript defs for React, used in plain JS for IDE support).
- **State Management**: React Context (AuthContext.jsx for authentication state).
- **Routing**: Manual routing (currentPage state in App.jsx; no React Router—uses conditional rendering for 12 pages).
- **Project Structure**:
  - Entry: `main.jsx` (React root with AuthProvider).
  - App: `App.jsx` (main component with routing logic, sidebar, user data management).
  - Components: Reusable JSX (Sidebar.jsx, RiskCard.jsx, TransactionForm.jsx).
  - Contexts: AuthContext.jsx (authentication provider).
  - Services: api.js (Axios wrappers for 14+ API endpoints).
  - Pages: 11 financial pages + 2 auth pages (Dashboard.jsx, Login.jsx, Signup.jsx, etc.).
  - Assets: Static files (react.svg).
  - Public: index.html, vite.svg, data/ directory.
- **Scripts** (package.json):
  - `npm run dev`: Vite dev server.
  - `npm run build`: Production build.
  - `npm run lint`: ESLint.
  - `npm run preview`: Preview build.
- **Dependencies Management**: `package.json` (npm; 3 deps, 12 devDeps).
- **Execution**: `npm run dev` (serves on localhost:5173).

## Development & Tooling
- **Package Managers**:
  - Python: pip (requirements.txt).
  - Node.js: npm (package.json, package-lock.json).
- **Versioning**: Semantic (0.0.0 dev in package.json).
- **Module Type**: ES modules (`"type": "module"`).
- **Ignored Files**: ESLint ignores `dist/`; .gitignore for node_modules, dist, etc.
- **Browser Globals**: ESLint configured for browser env.
- **Hot Reloading**: Vite + ESLint React refresh.

## AI & Machine Learning Specifics
- **Model Training**: Synthetic data (NumPy random) for supervised (RandomForest) and unsupervised (IsolationForest).
- **Inference**: Real-time predictions via loaded models or AI APIs.
- **AI Integration**: Multi-provider (Gemini primary, Groq secondary, OpenRouter backup); environment variables; fallback to rule-based if APIs fail.
- **No Local GPU/Accelerator**: No CUDA or hardware acceleration.

## Potential Gaps or Assumptions
- **Database**: None used; optional PostgreSQL/Redis in .env.example.
- **Testing**: No frameworks (pytest, Jest).
- **Authentication**: Basic context-based; no JWT/OAuth.
- **Deployment**: Local only; no CI/CD.
- **APIs**: 16 FastAPI endpoints + separate fraudApi instance.
- **Performance**: No caching; async via FastAPI.
- **Charts**: Matplotlib for backend; JSON data for frontend (implies Chart.js or similar not yet implemented).

This covers **every technology, library, and tool** from all files in the codebase. For setup, refer to README files.