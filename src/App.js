import React, { useState } from 'react';
import Toolbar from './components/Toolbar';
import Editor from './components/Editor';
import Analysis from './components/Analysis';
import Exporter from './components/Export';
import ProgressBar from './components/ProgressBar';
import './styles/editor.css';
import './styles/themes.css';
// import './styles/analysis.css';
// import './styles/progress.css';
// import './styles/export.css';


function App() {
  const [theme, setTheme] = useState(() => {document.body.className = 'dark';
    return 'dark';});
  const [text, setText] = useState('');
  const [goal, setGoal] = useState(500); // Default goal
  // const [wordCount, setWordCount] = useState(0);

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    document.body.className = newTheme;
  };

  // const handleTextChange = (newText) => {
  //   setText(newText);
  //   setWordCount(newText.split(/\s+/).filter(Boolean).length); 
  // };

  // const wordCount = text.trim().split(/\s+/).filter(word => word).length; // Calculate word count

  return (
    <div className="App">
      <Toolbar
        onThemeChange={handleThemeChange}
        goal={goal}
        onGoalChange={setGoal}
      />
      <div className="workarea-container"></div>
      <div className="slate-container">
        <Editor text={text} setText={setText} />
        <Analysis text={text} />
      </div>
      <div className="tool-container">
        <ProgressBar text={text} goal={goal} />
        <Exporter text={text} />
      </div>
    </div>
  );
  
}

export default App;
