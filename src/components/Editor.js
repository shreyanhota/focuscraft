import React, { useState, useEffect } from 'react';
// import './styles/editor.css';
import { saveAs } from 'file-saver';
import { jsPDF } from 'jspdf';

const Editor = ({goal}) => {
  const [text, setText] = useState('');
  const [wordCount, setWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [readingTime, setReadingTime] = useState('0 min');

  useEffect(() => {
    // Autosave to localStorage
    const timer = setTimeout(() => {
      localStorage.setItem('autosave', text);
    }, 1000);
    
    const wordCount = (text.split(/\s+/).filter(Boolean).length);
    const charCount = text.length;
    const readingTime = `${Math.ceil(wordCount / 200)} min`;

    setWordCount(wordCount);
    setCharCount(charCount);
    setReadingTime(readingTime);
    return () => clearTimeout(timer);
  }, [text]);

  const handleTextChange = (e) => {
    setText(e.target.value);
    // setWordCount(e.target.value.split(/\s+/).filter(Boolean).length);
    // setCharCount(text.length);
    // setReadingTime(`${Math.ceil(wordCount / 200)} min`);
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
    const pdf = new jsPDF();
    pdf.text(`Document\n\n${text}`, 10, 10); // Add your content to the PDF
    const blob = pdf.output('blob');
    saveAs(blob, 'document.pdf');
  };


  return (
    <>
      <div className="editor-container">
        <textarea
          className="editor-textarea"
          value={text}
          onChange={handleTextChange}
          placeholder="Start writing..." />
        <div className="metrics-container">
          <div className="metric">
            <span className="metric-value">{charCount}</span>
            <span className="metric-label"> characters</span>
          </div>
          <div className="metric">
            <span className="metric-value">{wordCount}</span>
            <span className="metric-label"> words</span>
          </div>
          <div className="metric">
            <span className="metric-value">{readingTime}</span>
            <span className="metric-label"> read</span>
          </div>
        </div>
      </div>

      <div className="progress-container">
          <div className="progress-bar">
            <div className="progress" style={{ width: `${percentage}%` }}></div>
          </div>

          {/* <div className="word-count">Word Count: {wordCount}</div> */}
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
    </>
    
  );
};

export default Editor;
