import React, { useState, useEffect } from 'react';

function QuestionForm({ onAddQuestion, onUpdateQuestion, question }) {
    const [prompt, setPrompt] = useState('');
    const [answers, setAnswers] = useState(['', '', '', '']);
    const [correctIndex, setCorrectIndex] = useState(0);

    useEffect(() => {
        if (question) {
            setPrompt(question.prompt);
            setAnswers(question.answers);
            setCorrectIndex(question.correctIndex);
        }
    }, [question]);

    const handleSubmit = (event) => {
        event.preventDefault();
        const newQuestion = { prompt, answers, correctIndex: parseInt(correctIndex) };
        
        if (question) {
            onUpdateQuestion({ ...newQuestion, id: question.id });
        } else {
            onAddQuestion(newQuestion);
        }

        setPrompt('');
        setAnswers(['', '', '', '']);
        setCorrectIndex(0);
    };

    const handleAnswerChange = (index, value) => {
        const newAnswers = [...answers];
        newAnswers[index] = value;
        setAnswers(newAnswers);
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>{question ? "Edit Question" : "Add New Question"}</h2>
            <label>
                Question Prompt:
                <input 
                    type="text" 
                    value={prompt} 
                    onChange={(e) => setPrompt(e.target.value)} 
                />
            </label>
            <br />
            <label>
                Answers:
                {answers.map((answer, index) => (
                    <input 
                        key={index} 
                        type="text" 
                        value={answer} 
                        onChange={(e) => handleAnswerChange(index, e.target.value)} 
                    />
                ))}
            </label>
            <br />
            <label>
                Correct Answer:
                <select 
                    value={correctIndex} 
                    onChange={(e) => setCorrectIndex(e.target.value)}
                >
                    {answers.map((answer, index) => (
                        <option key={index} value={index}>{answer || `Answer ${index + 1}`}</option>
                    ))}
                </select>
            </label>
            <br />
            <button type="submit">{question ? "Update Question" : "Add Question"}</button>
        </form>
    );
}

export default QuestionForm;
