import React from 'react';

const RecommendationCard = ({ group }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4 border border-gray-200">
      <h2 className="text-lg font-semibold mb-2">{group.group_description}</h2>
      <p className="text-sm text-gray-600 mb-1">
        <span className="font-medium">Group Items:</span> {group.group_items}
      </p>
      <p className="text-sm text-gray-600 mb-1">
        <span className="font-medium">Packaging Type:</span> {group.packaging_type}
      </p>
      <p className="text-sm text-gray-600 mb-1">
        <span className="font-medium">Estimated Total Footprint (kg):</span> {group.estimated_total_footprint_kg}
      </p>
      <p className="text-sm text-gray-600 mb-1">
        <span className="font-medium">Eco Score:</span> {group.eco_score}
      </p>
      <p className="text-sm text-green-700 mt-2">
        <span className="font-medium">Why this is good:</span> {group.why_this_is_good}
      </p>
    </div>
  );
};

export default RecommendationCard;

