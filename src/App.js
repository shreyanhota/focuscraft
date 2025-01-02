import React, { useState } from 'react';
import Toolbar from './components/Toolbar';
import Editor from './components/Editor';
// import ProgressBar from './components/ProgressBar';
import './styles/editor.css';
import './styles/themes.css';
// import './styles/progress.css';
// import './styles/export.css';


function App() {
  const [theme, setTheme] = useState(() => {document.body.className = 'dark';
    return 'dark';});
  const [text, setText] = useState('');
  const [goal, setGoal] = useState(500); // Default goal
  const [wordCount, setWordCount] = useState(0);

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    document.body.className = newTheme;
  };

  const handleTextChange = (newText) => {
    setText(newText);
    setWordCount(newText.split(/\s+/).filter(Boolean).length); 
  };

  // const wordCount = text.trim().split(/\s+/).filter(word => word).length; // Calculate word count

  return (
    <div className="App">
      <Toolbar
        onThemeChange={handleThemeChange}
        goal={goal}
        onGoalChange={setGoal}
      />
      <Editor goal={goal} text={text} wordCount={wordCount} onTextChange={handleTextChange}/>
      {/* <ProgressBar goal={goal}/> */}
    </div>
  );
}

export default App;
