import React from "react";

function QuestionItem({ question, onQuestionDelete, handleChangedAnswer }) {
  const { id, prompt, answers, correctIndex } = question;

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  function handleDelete() {
    fetch(`http://localhost:4000/questions/${question.id}`, {method: "DELETE"})
    .then(resp => resp.json())
    .then(() => onQuestionDelete(question.id))
  }

  function handleChangeAnswer(event) {
    // console.log(event.target.value)
    const updatedCorrectIndex = event.target.value;
    console.log(updatedCorrectIndex)
    fetch(`http://localhost:4000/questions/${question.id}`, {
      method: "PATCH", 
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({...question, correctIndex: updatedCorrectIndex})
    })
    .then(resp => resp.json())
    .then(updatedQuestion => handleChangedAnswer(id, updatedQuestion))
  }

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select defaultValue={correctIndex} onChange={handleChangeAnswer}>{options}</select>
      </label>
      <button onClick={handleDelete}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
