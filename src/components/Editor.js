import React, { useState, useEffect } from 'react';
// import './styles/editor.css';
import { saveAs } from 'file-saver';

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

  const exportAsPlainText = () => {
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    saveAs(blob, 'document.txt');
  };

  const exportAsMarkdown = () => {
    const markdownContent = `# Document\n\n${text}`;
    const blob = new Blob([markdownContent], { type: 'text/markdown;charset=utf-8' });
    saveAs(blob, 'document.md');
  };

  const exportAsPdf = () => {
    const pdfContent = `Document\n\n${text}`;
    const blob = new Blob([pdfContent], { type: 'application/pdf;charset=utf-8' });
    saveAs(blob, 'document.pdf');
  };


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
      <div className="export-container">
        <button onClick={exportAsPlainText} className="export-button light">
          Export as Text
        </button>
        <button onClick={exportAsMarkdown} className="export-button light">
          Export as Markdown
        </button>
        <button onClick={exportAsPdf} className="export-button dark">
          Export as PDF
        </button>
      </div>
    </div>
  );
};

export default Editor;
