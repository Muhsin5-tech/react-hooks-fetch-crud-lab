import React, { useState } from 'react';

const QuestionForm = ({ onAdd }) => {
  const [prompt, setPrompt] = useState('');
  const [answers, setAnswers] = useState(['', '', '', '']);
  const [correctIndex, setCorrectIndex] = useState(0);

  const handleChange = (e, index) => {
    const newAnswers = [...answers];
    newAnswers[index] = e.target.value;
    setAnswers(newAnswers);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newQuestion = { prompt, answers, correctIndex };
    onAdd(newQuestion);
    setPrompt('');
    setAnswers(['', '', '', '']);
    setCorrectIndex(0);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Prompt:
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
      </label>
      {answers.map((answer, index) => (
        <label key={index}>
          Answer {index + 1}:
          <input
            type="text"
            value={answer}
            onChange={(e) => handleChange(e, index)}
          />
        </label>
      ))}
      <label>
        Correct Answer:
        <select
          value={correctIndex}
          onChange={(e) => setCorrectIndex(parseInt(e.target.value, 10))}
        >
          {answers.map((_, index) => (
            <option key={index} value={index}>
              Option {index + 1}
            </option>
          ))}
        </select>
      </label>
      <button type="submit">Add Question</button>
    </form>
  );
};

export default QuestionForm;
