import React, { useState, useEffect } from "react";
import QuestionItem from "./QuestionItem";

function QuestionList() {
  const [questions, setQuestions] = useState([])

  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then(resp => resp.json())
      .then(questions => {
        setQuestions(questions)
      })
  }, [])

  const listOfQuestions = questions.map(question => {
    return(
      <QuestionItem 
        key={question.id}
        question={question}
      />
    )
  })

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
        {listOfQuestions}
      </ul>
    </section>
  );
}

export default QuestionList;
