
import React from 'react';

const SkeletonLoader: React.FC = () => {
  return (
    <div className="fixed inset-0 z-50 bg-white flex flex-col items-center justify-center transition-opacity duration-500">
      <div className="w-full max-w-4xl p-8 space-y-8 animate-pulse">
        <div className="h-8 bg-gray-200 rounded-full w-1/4 mb-12"></div>
        <div className="h-64 bg-gray-200 rounded-3xl w-full"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="h-40 bg-gray-200 rounded-3xl"></div>
          <div className="h-40 bg-gray-200 rounded-3xl"></div>
          <div className="h-40 bg-gray-200 rounded-3xl"></div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonLoader;
