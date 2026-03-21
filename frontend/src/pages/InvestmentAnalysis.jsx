import { useState } from 'react';
import { financialApi } from '../services/api';

const InvestmentAnalysis = () => {
  const [stockName, setStockName] = useState('');
  const [symbol, setSymbol] = useState('');
  const [period, setPeriod] = useState('1y');
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [useName, setUseName] = useState(true);

  // Sample Indian stocks for reference
  const sampleStocks = [
    { name: 'Reliance Industries', symbol: 'RELIANCE.NS' },
    { name: 'Tata Consultancy Services', symbol: 'TCS.NS' },
    { name: 'HDFC Bank', symbol: 'HDFCBANK.NS' },
    { name: 'Infosys', symbol: 'INFY.NS' },
    { name: 'ICICI Bank', symbol: 'ICICIBANK.NS' },
    { name: 'Hindustan Unilever', symbol: 'HINDUNILVR.NS' },
    { name: 'ITC Limited', symbol: 'ITC.NS' },
    { name: 'Kotak Mahindra Bank', symbol: 'KOTAKBANK.NS' },
    { name: 'Bajaj Finance', symbol: 'BAJFINANCE.NS' },
    { name: 'Maruti Suzuki', symbol: 'MARUTI.NS' }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let stockSymbol = symbol;
      
      // If using stock name, try to find the symbol
      if (useName && stockName) {
        const found = sampleStocks.find(stock => 
          stock.name.toLowerCase().includes(stockName.toLowerCase())
        );
        if (found) {
          stockSymbol = found.symbol;
        } else {
          // Try to search for the stock using AI/API
          stockSymbol = stockName.toUpperCase().replace(/\s+/g, '');
        }
      }

      const response = await financialApi.analyzeStock(stockSymbol, period);
      setAnalysis(response.data);
    } catch (error) {
      console.error('Error analyzing stock:', error);
      setAnalysis({ 
        error: 'Failed to analyze stock. Please check the name/symbol or try again later.',
        knowledge: getStockKnowledge(stockName || symbol)
      });
    }
    setLoading(false);
  };

  const getStockKnowledge = (stock) => {
    const knowledge = {
      'NSE': 'National Stock Exchange of India (NSE) is the leading stock exchange in India, located in Mumbai.',
      'NIFTY': 'NIFTY 50 is the benchmark stock market index of NSE, consisting of 50 large companies.',
      'SENSEX': 'SENSEX is the benchmark index of BSE, consisting of 30 large companies.',
      'RELIANCE': 'Reliance Industries is India\'s largest private sector company, operating in energy, petrochemicals, retail, and telecom.',
      'TCS': 'Tata Consultancy Services is India\'s largest IT services company, part of Tata Group.',
      'HDFC': 'HDFC Bank is one of India\'s largest private sector banks, known for retail banking.',
      'INFOSYS': 'Infosys is a global leader in next-generation digital services and consulting.',
      'ICICI': 'ICICI Bank is India\'s largest private sector bank by market capitalization.',
      'BAJAJ': 'Bajaj Finance is a leading NBFC in India, offering consumer finance and SME loans.',
      'MARUTI': 'Maruti Suzuki is India\'s largest passenger car manufacturer.'
    };

    const key = Object.keys(knowledge).find(k => stock.toUpperCase().includes(k));
    return key ? knowledge[key] : 'Stock market knowledge: Always diversify your portfolio, consider long-term investing, and consult financial advisors for personalized advice.';
  };

  const selectSampleStock = (stock) => {
    setStockName(stock.name);
    setSymbol(stock.symbol);
    setUseName(true);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Investment Analysis</h1>

      {/* Stock Market Knowledge */}
      <div className="bg-blue-50 rounded-lg p-4">
        <h3 className="text-lg font-semibold text-blue-800 mb-2">📚 Indian Stock Market Knowledge</h3>
        <div className="text-sm text-blue-700 space-y-1">
          <p><strong>NSE (National Stock Exchange):</strong> India's largest stock exchange by market capitalization</p>
          <p><strong>NIFTY 50:</strong> Benchmark index of 50 large companies, represents ~65% of NSE market cap</p>
          <p><strong>BSE SENSEX:</strong> Benchmark index of 30 companies on Bombay Stock Exchange</p>
          <p><strong>Market Hours:</strong> 9:15 AM to 3:30 PM IST, Monday to Friday</p>
          <p><strong>Key Sectors:</strong> IT, Banking, Energy, Pharma, Auto, FMCG</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Stock Analysis</h3>
        
        {/* Sample Stocks */}
        <div className="mb-4">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Popular Indian Stocks:</h4>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
            {sampleStocks.map((stock, index) => (
              <button
                key={index}
                onClick={() => selectSampleStock(stock)}
                className="text-xs bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded text-left"
              >
                <div className="font-medium">{stock.name}</div>
                <div className="text-gray-600">{stock.symbol}</div>
              </button>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Input Type Toggle */}
          <div className="flex items-center space-x-4">
            <label className="flex items-center">
              <input
                type="radio"
                checked={useName}
                onChange={() => setUseName(true)}
                className="mr-2"
              />
              Search by Stock Name
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                checked={!useName}
                onChange={() => setUseName(false)}
                className="mr-2"
              />
              Use Stock Symbol
            </label>
          </div>

          {useName ? (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Stock Name</label>
              <input
                type="text"
                value={stockName}
                onChange={(e) => setStockName(e.target.value)}
                className="w-full p-2 border rounded-lg"
                placeholder="e.g., Reliance Industries, Tata Consultancy Services"
                required
              />
            </div>
          ) : (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Stock Symbol</label>
              <input
                type="text"
                value={symbol}
                onChange={(e) => setSymbol(e.target.value.toUpperCase())}
                className="w-full p-2 border rounded-lg"
                placeholder="e.g., RELIANCE.NS, TCS.NS, HDFCBANK.NS"
                required
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Analysis Period</label>
            <select
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              className="w-full p-2 border rounded-lg"
            >
              <option value="1mo">1 Month</option>
              <option value="3mo">3 Months</option>
              <option value="6mo">6 Months</option>
              <option value="1y">1 Year</option>
              <option value="2y">2 Years</option>
              <option value="5y">5 Years</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            disabled={loading}
          >
            {loading ? 'Analyzing...' : 'Analyze Stock'}
          </button>
        </form>
      </div>

      {analysis && !analysis.error && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Stock Overview</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Symbol:</span>
                <span className="font-semibold">{analysis.symbol}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Current Price:</span>
                <span className="font-semibold">₹{analysis.current_price?.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Average Price:</span>
                <span className="font-semibold">₹{analysis.average_price?.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Volatility:</span>
                <span className="font-semibold">{analysis.volatility?.toFixed(2)}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Trend:</span>
                <span className={`font-semibold ${
                  analysis.trend === 'Upward' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {analysis.trend}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Risk Assessment</h3>
            <div className="text-center mb-4">
              <div className={`text-2xl font-bold ${
                analysis.risk_level === 'Low' ? 'text-green-600' :
                analysis.risk_level === 'Medium' ? 'text-yellow-600' : 'text-red-600'
              }`}>
                {analysis.risk_level} Risk
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Growth Potential:</span>
                <span className="font-semibold text-green-600">
                  {analysis.growth_potential?.toFixed(2)}%
                </span>
              </div>
              <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-2">Recommendation</h4>
                <p className="text-blue-700">{analysis.recommendation}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {analysis?.error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800">{analysis.error}</p>
        </div>
      )}
    </div>
  );
};

export default InvestmentAnalysis;