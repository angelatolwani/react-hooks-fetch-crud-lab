import React from "react";
import QuestionItem from "./QuestionItem";

function QuestionList( {questions, onQuestionDelete, handleChangedAnswer} ) {
  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{questions.map(question => <QuestionItem key={question.id} question={question} onQuestionDelete={onQuestionDelete} handleChangedAnswer={handleChangedAnswer} />)}</ul>
    </section>
  );
}

export default QuestionList;
