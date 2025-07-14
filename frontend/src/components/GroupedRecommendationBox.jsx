import React from 'react';
import RecommendationCard from './RecommendationCard';

const GroupedRecommendationBox = ({ groupDescription, groupItems, options }) => {
  return (
    <div className="bg-green-50 border-2 border-green-300 rounded-2xl p-6 mb-8 shadow-lg">
      <h2 className="text-2xl font-bold text-green-900 mb-2">{groupDescription}</h2>
      <p className="text-md text-green-800 mb-4 font-medium">Group Items: {groupItems}</p>
      <div className="grid md:grid-cols-2 gap-4">
        {options.map((option, idx) => (
          <RecommendationCard key={idx} group={option} isSubBox />
        ))}
      </div>
    </div>
  );
};

export default GroupedRecommendationBox;

