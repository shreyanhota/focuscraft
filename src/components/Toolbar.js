import React from 'react';
// import Export from './Export';

function Toolbar({ onThemeChange, goal, onGoalChange }) {
  const handleGoalInput = (event) => {
    const newGoal = Number(event.target.value) || goal; // Default to 0 if input is invalid
    onGoalChange(newGoal);
  };

  return (
    <div className="toolbar">
      {/* Theme controls */}
      <button className="theme-button light-theme" onClick={() => onThemeChange('light')}>Light Theme</button>
      <button className="theme-button dark-theme" onClick={() => onThemeChange('dark')}>Dark Theme</button>
      
      {/* Word goal input */}
      <input
        type="number"
        placeholder="Set Word Goal"
        onChange={handleGoalInput}
        style={{ marginLeft: '10px' }}
        defaultValue={goal}
      />
    </div>
  );
}

export default Toolbar;
