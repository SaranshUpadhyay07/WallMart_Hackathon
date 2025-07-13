import React from 'react';
import MaterialCard from './MaterialCard';
import { Package, Lightbulb, TrendingUp } from 'lucide-react';

const Dashboard = ({ data }) => {
  return (
    <div className="space-y-8">
      {/* Product Overview */}
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <div className="flex items-center space-x-3 mb-6">
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-3 rounded-lg">
            <Package className="h-6 w-6 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">
            Analysis for: {data.product}
          </h2>
        </div>

        {/* AI Summary */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl border border-green-200">
          <div className="flex items-start space-x-3">
            <div className="bg-green-500 p-2 rounded-lg flex-shrink-0">
              <Lightbulb className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-green-900 mb-2">AI Recommendation Summary</h3>
              <p className="text-green-800 leading-relaxed">{data.ai_summary}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recommendations Grid */}
      <div>
        <div className="flex items-center space-x-3 mb-6">
          <div className="bg-gradient-to-r from-emerald-500 to-green-600 p-3 rounded-lg">
            <TrendingUp className="h-6 w-6 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">
            Sustainable Packaging Options
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {data.recommendations?.map((material, index) => (
            <MaterialCard key={index} material={material} rank={index + 1} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;