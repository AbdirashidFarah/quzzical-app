
import React from 'react';
import './App.css';
import Button from './components/Button.jsx';
import Question from './components/Question.jsx';
import he from 'he'; 

function App() {
  const [questions, setQuestions] = React.useState([]);
  const [gameStarted, setGameStarted] = React.useState(false);
  const [showAnswer, setShowAnswer] = React.useState(false);
  const [fullAnswer, setFullAnswer] = React.useState(0);

  function getApiTriva() {
    fetch("https://opentdb.com/api.php?amount=10")
      .then(res => res.json())
      .then(data => {
        setQuestions(() => 
          data.results.map((question, id) => ({
            id: id, 
            question: he.decode(question.question),
            answers: [
              {
                answer: he.decode(question.correct_answer),
                isCorrect: true,
                show: false,
                selected: false 
              },
              ...question.incorrect_answers.map(incorrect => ({
                answer: he.decode(incorrect),
                isCorrect: false,
                show: false,
                selected: false
              }))
            ].sort(() => Math.random() - 0.5)
          }))
        );
      });
  }

  const questionElements = questions.map((question, i) => (
    <div key={i}>
      <Question
        questionId={i}
        fullAnswer={fullAnswer}
        handleClick={(event, id) => {
          setQuestions(prevValue => prevValue.map((q, index) => {
            if (index === id) {
              return {
                ...q,
                answers: q.answers.map((answer, i) => ({
                  ...answer,
                  selected: parseInt(event.target.id) === i && id === index ? !answer.selected : false
                }))
              };
            } else {
              return q;
            }
          }));
        }}
        show={fullAnswer}
        answers={question.answers}
        question={question.question}
      />
      {questions.length !== i + 1 && <hr />}
    </div>
  ));

  const startGamePage = (
    <div className='homepage'>
      <h1> Quiz </h1>
      <p>Test your knowledge</p>
      <Button 
        handleClick={() => setGameStarted(true)} 
        text="Start Game" 
      />
    </div>
  );

  const questionPage = (
    <div>
      <div className='question'>{questionElements}</div>
      <div className='button__section'>
        {showAnswer && <h2>You scored {fullAnswer}/5 correct answers </h2>}
        <Button 
          handleClick={() => {
            if (showAnswer) {
              getApiTriva();
              setShowAnswer(false);
            } else {
              let total = 0;
              questions.forEach(q => {
                q.answers.forEach(answer => {
                  if (answer.selected && answer.isCorrect) {
                    total += 1;
                  }
                });
              });
              setShowAnswer(true);
              setFullAnswer(total);
            }
          }}
          text={showAnswer ? "Play Again" : "Check Answer"}
        />
      </div>
    </div>
  );

  React.useEffect(() => {
    getApiTriva();
  }, []);

  React.useEffect(() => {
    setQuestions(prevValue => prevValue.map(q => ({
      ...q,
      answers: q.answers.map(a => ({
        ...a,
        show: showAnswer
      }))
    })));
  }, [showAnswer]);

  return (
    <div className='main'>
      <img className='blob--1' src="img/blob-1.png" alt="Light blob floating"/>
      <img className='blob--2' src="img/blob-2.png" alt="Light blob floating"/>
      {gameStarted ? questionPage : startGamePage}
    </div>
  );
}

export default App;