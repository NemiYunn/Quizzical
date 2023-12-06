import logo from './logo.svg';
import './App.css';
import React from 'react';
import Start from './components/Start';
import Quiz from './components/Quiz';

function App() {
  const [showQuiz , setShowQuiz] = React.useState(false)
  
    function handleStart(){
        // setShowQuiz(showQuiz => !showQuiz)
        setShowQuiz(true)
    }
    
    

  return (
    <>
    {showQuiz ? (
     <Quiz />
    ) : (
      <Start
        handleButton={handleStart}
      />
    )}
  </>
    
  );
}

export default App;
