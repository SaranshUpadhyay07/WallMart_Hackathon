import React from 'react';

const RecommendationCard = ({ group, isSubBox }) => {
  return (
    <div className={`bg-white shadow ${isSubBox ? 'border border-green-200 rounded-xl p-4' : 'shadow-md rounded-lg p-4 mb-4 border border-gray-200'}`}>
      <h3 className="text-lg font-semibold mb-2">{group.packaging_type}</h3>
      <p className="text-sm text-gray-600 mb-1">
        <span className="font-medium">Eco Score:</span> {group.eco_score}
      </p>
      <p className="text-sm text-gray-600 mb-1">
        <span className="font-medium">Estimated Total Footprint (kg):</span> {group.estimated_total_footprint_kg}
      </p>
      <p className="text-sm text-gray-600 mb-1">
        <span className="font-medium">Cost:</span> ₹{group.cost}
      </p>
      <p className="text-sm text-green-700 mt-2">
        <span className="font-medium">Why this is good:</span> {group.why_this_is_good}
      </p>
    </div>
  );
};

export default RecommendationCard;
