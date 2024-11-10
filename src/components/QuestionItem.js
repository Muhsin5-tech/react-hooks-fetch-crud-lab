import React from "react";

const QuestionItem = ({ question, onDelete, onUpdate }) => {
  const { id, prompt, answers, correctIndex } = question;

  const handleDelete = () => {
    onDelete(id);
  };

  const handleCorrectAnswerChange = (e) => {
    const newCorrectIndex = parseInt(e.target.value, 10);
    onUpdate(id, newCorrectIndex);
  };

  return (
    <li>
      <h3>{prompt}</h3>
      <ul>
        {answers.map((answer, index) => (
          <li key={index}>
            {answer}
            {index === correctIndex && " (Correct)"}
          </li>
        ))}
      </ul>
      <select
        value={correctIndex}
        onChange={handleCorrectAnswerChange}
        aria-label="Correct Answer"
      >
        {answers.map((_, index) => (
          <option key={index} value={index}>
            Option {index + 1}
          </option>
        ))}
      </select>
      <button onClick={handleDelete}>Delete Question</button>
    </li>
  );
};

export default QuestionItem;
