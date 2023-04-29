import { useState, useEffect } from "react";

function QuestionItem({ question }) {
  const { id, prompt, answers, correctIndex } = question;

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));
  function handleDeleteQuestion(id) {
    const [questions, setQuestions] = useState([]);
  
    useEffect(() => {
       // Delete question from API endpoint
       fetch(`http://localhost:4000/questions/${id}`, {
        method: 'DELETE',
      })
        .then(response => {
          if (response.ok) {
            // Remove question from local state
            setQuestions(questions.filter(question => question.id !== id));
          } else {
            throw new Error('Failed to delete question');
          }
        })
        .catch(error => console.error(error));
    });
  }
     
  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select defaultValue={correctIndex}>{options}</select>
      </label>
      <button onClick={() => handleDeleteQuestion(question.id)}>Delete</button>
    </li>
  );
}

export default QuestionItem;