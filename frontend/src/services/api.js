import axios from 'axios';

const FINTECH_API_BASE_URL = 'http://localhost:8000';
const FRAUD_API_BASE_URL = 'http://localhost:8001';

const fintechApi = axios.create({
  baseURL: FINTECH_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const fraudApi = axios.create({
  baseURL: FRAUD_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const financialApi = {
  // Financial Data Analysis
  analyzeExpenses: (data) => fintechApi.post('/analyze-expenses', data),

  // Risk Prediction
  predictRisk: (data) => fintechApi.post('/predict-risk', data),

  // Financial Recommendations
  getRecommendations: (data) => fintechApi.post('/get-recommendations', data),

  // Full Analysis
  fullAnalysis: (data) => fintechApi.post('/full-analysis', data),

  // Financial Goal Planning
  setGoal: (goalData) => fintechApi.post('/set-goal', goalData),

  // Smart Budget Generation
  generateBudget: (data) => fintechApi.post('/generate-budget', data),

  // Financial Health Score
  getHealthScore: (data) => fintechApi.post('/health-score', data),

  // Fraud Detection (using fintech backend)
  detectFraud: (transactions) => fintechApi.post('/detect-fraud', transactions),
  processTransaction: (transaction) => fintechApi.post('/process-transaction', transaction),
  getTransactionHistory: () => fintechApi.get('/transaction-history'),

  // Investment Assistance
  analyzeStock: (symbol, period = '1y') => fintechApi.get(`/analyze-stock/${symbol}?period=${period}`),

  // Data Visualization Dashboard
  getDashboardCharts: (data, savingsHistory) => fintechApi.post('/dashboard-charts', { ...data, savings_history: savingsHistory }),

  // Financial Alerts
  generateAlerts: (data) => fintechApi.post('/generate-alerts', data),

  // Financial Alerts
  generateAlerts: (data) => fintechApi.post('/generate-alerts', data),

  // Transaction Management
  processTransaction: (transactionData) => fintechApi.post('/process-transaction', transactionData),

  // Get Transaction History
  getTransactionHistory: () => fintechApi.get('/transaction-history'),
};

export const fraudDetectionApi = {
  // Process single transaction for fraud detection
  processTransaction: (data) => fraudApi.post('/transaction/process', data),

  // Process batch transactions
  processBatchTransactions: (data) => fraudApi.post('/transaction/batch', data),

  // Health check
  healthCheck: () => fraudApi.get('/health'),
};

export default fintechApi;
