import React from 'react';
import { saveAs } from 'file-saver';
import { jsPDF } from 'jspdf';

const Exporter = ({ text }) => {
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
    pdf.text(`Document\n\n${text}`, 10, 10);
    const blob = pdf.output('blob');
    saveAs(blob, 'document.pdf');
  };

  return (
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
  );
};

export default Exporter;
