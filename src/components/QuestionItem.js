import React from 'react';

function QuestionItem({ question, onDeleteQuestion, onUpdateQuestion }) {
    const { id, prompt, answers, correctIndex } = question;

    const handleDeleteClick = () => {
        onDeleteQuestion(id);
    };

    const handleCorrectAnswerChange = (event) => {
        onUpdateQuestion(id, parseInt(event.target.value));
    };

    return (
        <li>
            <h3>{prompt}</h3>
            <label>
                Correct Answer:
                <select value={correctIndex} onChange={handleCorrectAnswerChange}>
                    {answers.map((answer, index) => (
                        <option key={index} value={index}>{answer}</option>
                    ))}
                </select>
            </label>
            <button onClick={handleDeleteClick}>Delete</button>
        </li>
    );
}

export default QuestionItem;
