import React from 'react';

function ProgressTracker({ score, total }) {
  return (
    <div className="p-4 bg-gray-200 rounded">
      <h2 className="text-lg">Score: {score} / {total}</h2>
    </div>
  );
}

export default ProgressTracker;
