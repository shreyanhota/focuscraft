import React from 'react';

const Editor = ({ text, setText }) => {
  // const [text, setText] = useState('');

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  return (
    <div className="editor-container">
      <textarea
        className="editor-textarea"
        value={text}
        onChange={handleTextChange}
        placeholder="Start writing..."
      />
    </div>
  );
};

export default Editor;
