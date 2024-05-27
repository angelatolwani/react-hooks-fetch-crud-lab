import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/questions")
    .then(resp => resp.json())
    .then(q => setQuestions(q))
  }, [])

  function handleNewQuestion(newQuestion) {
    setQuestions([...questions, newQuestion])
  }

  function handleDeletedQuestion(id) {
    const filteredQuestions = questions.filter(question => question.id !== id)
    setQuestions(filteredQuestions)
  }

  function handleChangedAnswer(id, updatedQuestion) {
    const updatedQuestionArray = questions.map(question => {
      if (id === question.id) {
        return updatedQuestion
      } else {
        return question
      }
    })
    setQuestions(updatedQuestionArray)
  }

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? <QuestionForm onFormSubmit={handleNewQuestion} /> : <QuestionList questions={questions} onQuestionDelete={handleDeletedQuestion} handleChangedAnswer={handleChangedAnswer} />}
    </main>
  );
}

export default App;
