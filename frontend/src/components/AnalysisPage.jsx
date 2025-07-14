import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, Loader2, Package, AlertCircle } from 'lucide-react';
import GroupedRecommendationBox from './GroupedRecommendationBox';

const AnalysisPage = () => {
  const [items, setItems] = useState([]);
  const [newItemCode, setNewItemCode] = useState('');
  const [newQuantity, setNewQuantity] = useState(1);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate(); // React Router navigation

  const fetchRecommendation = async () => {
    setLoading(true);
    setError('');
    setData(null);
    try {
      const response = await fetch('http://localhost:3000/package', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: items.filter(item => item.item_code.trim() !== '' && item.quantity > 0),
        }),
      });
      if (!response.ok) {
        throw new Error('Failed to fetch recommendations');
      }
      const data = await response.json();
      setData(data);
    } catch (error) {
      setError('Error fetching recommendation.');
      console.error('Error fetching recommendation:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchRecommendation();
  };

  const handleAddItem = () => {
    const code = newItemCode.trim();
    const quantity = Number(newQuantity);
    if (code && quantity > 0 && !items.some(item => item.item_code === code)) {
      setItems(prev => [...prev, { item_code: code, quantity }]);
      setNewItemCode('');
      setNewQuantity(1);
    }
  };

  const handleRemoveItem = (idx) => {
    setItems(prev => prev.filter((_, i) => i !== idx));
  };

  const handleQuantityChange = (idx, value) => {
    setItems(prev =>
      prev.map((item, i) =>
        i === idx ? { ...item, quantity: Number(value) } : item
      )
    );
  };

  const groupByDescription = (dataArr) => {
    const groups = {};
    dataArr.forEach(item => {
      if (!groups[item.group_description]) {
        groups[item.group_description] = [];
      }
      groups[item.group_description].push(item);
    });
    return groups;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-green-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <button
              onClick={() => navigate('/')}
              className="flex items-center space-x-2 text-green-600 hover:text-green-700 transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              <span className="font-medium">Back to Home</span>
            </button>
            <div className="flex items-center space-x-2">
              <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-2 rounded-lg">
                <Package className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-800">EcoPackage AI</span>
            </div>
          </div>
        </div>
      </header>

      {/* Search Section */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Product Analysis Dashboard
            </h1>
            <p className="text-lg text-gray-600">
              Enter your product item code and quantity to get AI-powered sustainable packaging recommendations
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Product Item Codes & Quantities
                </label>
                <div className="flex items-center space-x-2 mb-3">
                  <div className="relative w-full">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      value={newItemCode}
                      onChange={(e) => setNewItemCode(e.target.value)}
                      placeholder="Enter item code"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                      disabled={loading}
                    />
                  </div>
                  <input
                    type="number"
                    min={1}
                    value={newQuantity}
                    onChange={e => setNewQuantity(e.target.value)}
                    placeholder="Qty"
                    className="w-20 pl-3 pr-2 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                    disabled={loading}
                  />
                  <button
                    type="button"
                    onClick={handleAddItem}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl font-semibold disabled:opacity-50"
                    disabled={loading || !newItemCode.trim() || !newQuantity}
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {items.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center bg-green-100 border border-green-300 rounded-full px-3 py-1 text-green-800 text-sm font-medium relative shadow-sm gap-2"
                    >
                      <span>{item.item_code}</span>
                      <input
                        type="number"
                        min={1}
                        value={item.quantity}
                        onChange={e => handleQuantityChange(idx, e.target.value)}
                        className="w-14 px-1 py-0.5 border border-green-300 rounded ml-2 text-green-900 bg-white"
                        style={{ fontSize: '0.95em' }}
                        disabled={loading}
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveItem(idx)}
                        className="ml-2 text-green-600 hover:text-red-600 font-bold rounded-full focus:outline-none focus:ring-2 focus:ring-red-400"
                        style={{ lineHeight: 1, fontSize: '1.1em', position: 'relative', top: '-2px' }}
                        aria-label="Remove item code"
                        disabled={loading}
                      >
                        &times;
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {error && (
                <div className="flex items-center space-x-2 text-red-600 bg-red-50 p-3 rounded-lg">
                  <AlertCircle className="h-5 w-5" />
                  <span>{error}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={loading || items.length === 0}
                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 px-6 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <span>Packing...</span>
                  </>
                ) : (
                  <>
                    <Package className="h-5 w-5" />
                    <span>Pack Them</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Loading UI */}
          {loading && (
            <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
              <div className="flex flex-col items-center space-y-4">
                <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-4 rounded-full animate-pulse">
                  <Package className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Analyzing Your Product</h3>
                <p className="text-gray-600">Our AI is evaluating sustainable packaging options...</p>
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          )}

          {/* Grouped Results */}
          {data && !loading && (
            <div className="space-y-8">
              {(() => {
                const grouped = groupByDescription(Array.isArray(data) ? data : []);
                const groupKeys = Object.keys(grouped);
                if (groupKeys.length === 0) {
                  return (
                    <div className="bg-yellow-50 text-yellow-800 p-4 rounded-lg text-center">
                      No recommendations found.
                    </div>
                  );
                }
                return groupKeys.map((desc, idx) => (
                  <GroupedRecommendationBox
                    key={idx}
                    groupDescription={desc}
                    groupItems={grouped[desc][0]?.group_items}
                    options={grouped[desc]}
                  />
                ));
              })()}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default AnalysisPage;
