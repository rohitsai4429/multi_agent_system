import { useState, useContext } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import ExpenseAnalysis from './pages/ExpenseAnalysis';
import RiskPrediction from './pages/RiskPrediction';
import BudgetGenerator from './pages/BudgetGenerator';
import GoalPlanning from './pages/GoalPlanning';
import HealthScore from './pages/HealthScore';
import FraudDetection from './pages/FraudDetection';
import InvestmentAnalysis from './pages/InvestmentAnalysis';
import FinancialAlerts from './pages/FinancialAlerts';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { AuthContext } from './contexts/AuthContext';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
  const [userData, setUserData] = useState({
    income: 50000,
    expenses: {
      rent: 15000,
      groceries: 8000,
      transportation: 5000,
      entertainment: 3000,
      utilities: 4000
    },
    credit_score: 750,
    loan_amount: 0,
    savings: 20000,
    debts: 0,
    investments: 50000
  });

  const { isAuthenticated, logout } = useContext(AuthContext);

  const updateUserData = (newData) => {
    setUserData({ ...userData, ...newData });
  };

  const handleLogout = () => {
    logout();
    setCurrentPage('login');
  };

  if (!isAuthenticated) {
    return currentPage === 'signup' ? <Signup setCurrentPage={setCurrentPage} /> : <Login setCurrentPage={setCurrentPage} />;
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard userData={userData} updateUserData={updateUserData} setCurrentPage={setCurrentPage} />;
      case 'expense-analysis':
        return <ExpenseAnalysis userData={userData} />;
      case 'risk-prediction':
        return <RiskPrediction userData={userData} />;
      case 'budget-generator':
        return <BudgetGenerator userData={userData} />;
      case 'goal-planning':
        return <GoalPlanning userData={userData} updateUserData={updateUserData} setCurrentPage={setCurrentPage} />;
      case 'health-score':
        return <HealthScore userData={userData} />;
      case 'fraud-detection':
        return <FraudDetection />;
      case 'investment-analysis':
        return <InvestmentAnalysis />;
      case 'financial-alerts':
        return <FinancialAlerts userData={userData} />;
      default:
        return <Dashboard userData={userData} updateUserData={updateUserData} />;
    }
  };

  const toggleSidebar = () => setIsSidebarExpanded(prev => !prev);

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        isExpanded={isSidebarExpanded}
        toggleExpand={toggleSidebar}
      />
      <div className={`flex-1 flex flex-col transition-all duration-300 ${isSidebarExpanded ? 'ml-64' : 'ml-20'}`}>
        <header className="bg-white shadow-sm border-b px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">FinTech AI Assistant</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Logout
          </button>
        </header>
        <main className="flex-1 overflow-auto p-6">
          {renderPage()}
        </main>
      </div>
    </div>
  );
}

export default App;
