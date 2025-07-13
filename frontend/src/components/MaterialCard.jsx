import React from 'react';
import { Leaf, DollarSign, Shield, Zap, ExternalLink, Award } from 'lucide-react';

const MaterialCard = ({ material, rank }) => {
  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-600 bg-green-100';
    if (score >= 60) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getRankColor = (rank) => {
    if (rank === 1) return 'bg-gradient-to-r from-yellow-400 to-yellow-600';
    if (rank === 2) return 'bg-gradient-to-r from-gray-400 to-gray-600';
    if (rank === 3) return 'bg-gradient-to-r from-orange-400 to-orange-600';
    return 'bg-gradient-to-r from-green-500 to-emerald-600';
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-green-200">
      {/* Header with Rank */}
      <div className="relative">
        <div className={`${getRankColor(rank)} p-6 text-white`}>
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <Award className="h-5 w-5" />
                <span className="text-sm font-medium opacity-90">Option #{rank}</span>
              </div>
              <h3 className="text-xl font-bold">{material.material}</h3>
            </div>
            <div className={`${getScoreColor(material.eco_score)} px-3 py-1 rounded-full text-sm font-semibold bg-white/20 text-white`}>
              {material.eco_score}/100
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-6">
        {/* Metrics Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Leaf className="h-5 w-5 text-green-600" />
              <span className="text-sm font-medium text-green-800">Carbon Impact</span>
            </div>
            <p className="text-lg font-bold text-green-900">{material.carbon_footprint}</p>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <DollarSign className="h-5 w-5 text-blue-600" />
              <span className="text-sm font-medium text-blue-800">Cost Estimate</span>
            </div>
            <p className="text-lg font-bold text-blue-900">{material.cost_estimate_per_unit}</p>
          </div>

          <div className="bg-purple-50 p-4 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Shield className="h-5 w-5 text-purple-600" />
              <span className="text-sm font-medium text-purple-800">Durability</span>
            </div>
            <p className="text-lg font-bold text-purple-900">{material.durability}</p>
          </div>

          <div className="bg-orange-50 p-4 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Zap className="h-5 w-5 text-orange-600" />
              <span className="text-sm font-medium text-orange-800">Eco Score</span>
            </div>
            <p className="text-lg font-bold text-orange-900">{material.eco_score}/100</p>
          </div>
        </div>

        {/* Suitability Reason */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-semibold text-gray-900 mb-2">Why This Material?</h4>
          <p className="text-gray-700 leading-relaxed">{material.suitability_reason}</p>
        </div>

        {/* Citations */}
        {material.citations && material.citations.length > 0 && (
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Research Sources</h4>
            <div className="space-y-2">
              {material.citations.map((citation, index) => (
                <a
                  key={index}
                  href={citation.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition-colors group"
                >
                  <ExternalLink className="h-4 w-4 group-hover:scale-110 transition-transform" />
                  <span className="text-sm underline">{citation.source}</span>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MaterialCard;