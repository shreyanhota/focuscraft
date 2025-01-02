import React, { useState, useEffect } from 'react';
// import './styles/editor.css';

const Editor = ({goal}) => {
  const [text, setText] = useState('');
  const [wordCount, setWordCount] = useState(0);

  useEffect(() => {
    // Autosave to localStorage
    const timer = setTimeout(() => {
      localStorage.setItem('autosave', text);
    }, 1000);
    return () => clearTimeout(timer);
  }, [text]);

  const handleTextChange = (e) => {
    setText(e.target.value);
    setWordCount(e.target.value.split(/\s+/).filter(Boolean).length);
  };

  const percentage = Math.min((wordCount / goal) * 100, 100);

  return (
    <div className="editor-container">
      <textarea
        className="editor-textarea"
        value={text}
        onChange={handleTextChange}
        placeholder="Start writing..."
      />
      <div className="progress-container">
        <div className="progress-bar">
          <div className="progress" style={{ width: `${percentage}%` }}></div>
        </div>
      </div>
      <div className="word-count">Word Count: {wordCount}</div>
    </div>
  );
};

export default Editor;
