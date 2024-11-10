import React, { useState } from 'react';

function QuestionList({ questions, onDeleteQuestion, onEditQuestion, onUpdateAnswer }) {
    const [selectedAnswers, setSelectedAnswers] = useState({});

    const handleAnswerChange = (questionId, selectedIndex) => {
        setSelectedAnswers((prevAnswers) => ({
            ...prevAnswers,
            [questionId]: selectedIndex,
        }));

        onUpdateAnswer(questionId, selectedIndex);
    };

    return (
        <div>
            <h2>Question List</h2>
            <ul>
                {questions.map((question) => (
                    <li key={question.id}>
                        <p><strong>{question.prompt}</strong></p>
                        <ul>
                            
                            <li>
                                <select
                                    value={selectedAnswers[question.id] || question.correctIndex}
                                    onChange={(e) => handleAnswerChange(question.id, parseInt(e.target.value))}
                                >
                                    {question.answers.map((answer, index) => (
                                        <option 
                                        key={index} 
                                        value={index}
                                        className={index === question.correctIndex ? 'correct' : ''}
                                        >
                                            {answer}
                                        </option>
                                    ))}
                                </select>
                                {selectedAnswers[question.id] === question.correctIndex && (
                                    <span> (Correct)</span>
                                )}
                            </li>
                        </ul>
                        <button className="btn-delete" onClick={() => onDeleteQuestion(question.id)}>Delete</button>
                        <button onClick={() => onEditQuestion(question)}>Edit</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default QuestionList;
