import { reporters } from "mocha";
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

  const handleDeleteQuestion = (id) => {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(() => setQuestions(questions.filter(question => question.id !== id )))
  }

  const handleUpdateQuestions = (id, correctIndex) => {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({correctIndex})
  })
      .then(resp => resp.json())
      .then((updatedQuestions) => {
        const newQuestion = questions.map(question => {
          if (question.id === updatedQuestions) {
            return newQuestion
          } else {
            return question
          }
        })
        setQuestions(newQuestion)
      })
    }
  const listOfQuestions = questions.map(question => {
    return(
      <QuestionItem 
        key={question.id}
        question={question}
        onDeleteQuestion={handleDeleteQuestion}
        onUpdateQuestion={handleUpdateQuestions}
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
