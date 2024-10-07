import React from "react";

export default function Question(props) {
  const toggleButtonElements = props.answers.map((answer, i) => (
    <button
      key={i}
      id={i}
      disabled={props.showAnswer}
      data-question={props.id}
      className={`toggle-btn 
        ${answer.selected ? "toggle-btn--selected" : ""}
        ${props.showAnswer && (answer.isCorrect ? "toggle-btn--correct" : "toggle-btn--incorrect")}
      `}
      onClick={(event) => {
        props.handleClick(event, props.questionId);
      }}
    >
      {answer.answer}
    </button>
  ));

  return (
    <div>
      <h2>{props.question}</h2>
      <div className="answers">
        {toggleButtonElements}
      </div>
    </div>
  );
}

Question.defaultProps = {
    question: "What is the question?",
    answers: [
        {
            answer: "question 1",
            result: false
        },
        {
            answer: "question 2",
            result: false
        },
        {
            answer: "question 3",
            result: true
        },
        {
            answer: "question 4",
            result: false
        },
    ]
}
