import React from 'react';

const ProgressBar = ({ text, goal }) => {
  const wordCount = text.split(/\s+/).filter(Boolean).length;
  const percentage = Math.min((wordCount / goal) * 100, 100);

  return (
    <div className="progress-container">
      <div className="progress-bar">
        <div className="progress" style={{ width: `${percentage}%` }}></div>
      </div>
      <p className="progress-info">
        {wordCount} / {goal} words ({Math.round(percentage)}%)
      </p>
    </div>
  );
};

export default ProgressBar;
